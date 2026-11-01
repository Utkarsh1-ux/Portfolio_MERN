import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const {
  PORT = 5000,
  CLIENT_ORIGIN = "http://localhost:5173",
  CONTACT_TO = "utkarsh18mish@gmail.com",
  SMTP_HOST,
  SMTP_PORT = "465",
  SMTP_USER,
  SMTP_PASS,
  WEB3FORMS_ACCESS_KEY,
} = process.env;

const isDev = process.env.NODE_ENV !== "production";
const mailConfigured = Boolean(CONTACT_TO && SMTP_HOST && SMTP_USER && SMTP_PASS);

const transporter = mailConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN.split(",").map((s) => s.trim()), methods: ["POST", "GET"] }));
app.use(express.json({ limit: "10kb" }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim() : "");

function validate(body) {
  const name = clean(body?.name);
  const email = clean(body?.email);
  const message = clean(body?.message);
  const errors = {};
  if (name.length < 2 || name.length > 100) errors.name = "Tell me your name.";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "That email doesn't look right.";
  if (message.length < 10 || message.length > 3000) errors.message = "Message must be 10–3000 characters.";
  return { name, email, message, errors };
}

const isLocalhost = (ip) =>
  ip === "127.0.0.1" || ip === "::1" || ip === "::ffff:127.0.0.1";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isDev ? 100 : 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: (req) => isDev || isLocalhost(req.ip),
  message: { error: "Too many messages. Please try again later." },
});

app.get("/api/health", (_req, res) =>
  res.json({
    ok: true,
    mail: mailConfigured,
    web3forms: Boolean(WEB3FORMS_ACCESS_KEY),
    devMode: isDev,
  })
);

app.post("/api/contact", limiter, async (req, res) => {
  // Honeypot: bots fill it, people can't see it. Pretend success, send nothing.
  if (clean(req.body?.website)) return res.json({ ok: true });

  const { name, email, message, errors } = validate(req.body);
  if (Object.keys(errors).length) return res.status(422).json({ errors });

  // 1. SMTP delivery via Nodemailer
  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Portfolio contact" <${SMTP_USER}>`,
        to: CONTACT_TO,
        replyTo: { name, address: email },
        subject: `Portfolio message from ${name}`.slice(0, 120),
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      console.log(`✉️ Mail delivered to ${CONTACT_TO} from ${name} <${email}>`);
      return res.json({ ok: true });
    } catch (err) {
      console.error("sendMail failed:", err.message);
      return res.status(502).json({ error: "Could not deliver the message." });
    }
  }

  // 2. Web3Forms delivery fallback if access key provided
  if (WEB3FORMS_ACCESS_KEY) {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          from_name: "Portfolio Contact Form",
          subject: `Portfolio message from ${name}`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(`✉️ Web3Forms message delivered from ${name} <${email}>`);
        return res.json({ ok: true });
      }
    } catch (err) {
      console.error("Web3Forms delivery failed:", err.message);
    }
  }

  // 3. Local dev fallback (when SMTP/external delivery is not yet configured)
  if (isDev || !mailConfigured) {
    console.log("\n" + "=".repeat(52));
    console.log("📬 [DEV MODE] New Contact Message Received!");
    console.log(`From:    ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log(`Time:    ${new Date().toLocaleTimeString()}`);
    console.log("Tip:     To deliver real emails, set SMTP_PASS in server/.env");
    console.log("=".repeat(52) + "\n");
    return res.json({ ok: true, devMode: true });
  }

  return res.status(503).json({ error: "Mail delivery is not configured on this server." });
});

app.use((_req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  const mode = mailConfigured
    ? "SMTP live"
    : WEB3FORMS_ACCESS_KEY
    ? "Web3Forms live"
    : "Local dev mode (messages logged to console)";
  console.log(`API on :${PORT} · ${mode}`);
});

