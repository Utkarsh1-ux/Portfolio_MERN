import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { profile } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || "4d7efd35-be40-4d0c-a53c-ef03d08d788c";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(f: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Tell me your name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.message.trim().length < 10) e.message = "A few more words, at least 10 characters.";
  return e;
}

const field =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[15px] text-bone placeholder:text-dim transition-colors focus:border-signal focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    if (status !== "idle" && status !== "sending") setStatus("idle");
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      // Honeypot: bots fill it, people can't see it
      if (form.website.trim()) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "", website: "" });
        return;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: `Portfolio message from ${form.name.trim()}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const mailtoBody = [
    `Name: ${form.name.trim() || "[Your name]"}`,
    `Reply email: ${form.email.trim() || "[Your email]"}`,
    "",
    "Message:",
    form.message.trim() || "[Your message]",
  ].join("\n");
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio contact")}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <section id="contact" className="relative pb-16 pt-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="05" title="Contact" />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="display text-[clamp(2.8rem,7vw,6rem)]">
                Hiring for a
                <br />
                <span className="italic text-signal">job / internship?</span>
              </h2>
              <p className="mt-6 max-w-md text-[14px] text-mute">
                I'm open to full-stack developer roles and internships on teams shipping real, scalable products. Email is the
                fastest way to reach me.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline break-all text-[clamp(1.05rem,2.6vw,1.6rem)] tracking-tight"
              >
                {profile.email}
              </a>
              <ul className="mt-8 flex gap-8">
                {[
                  ["GitHub", profile.github],
                  ["LinkedIn", profile.linkedin],
                  ["Resume", profile.resume],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(label === "Resume" ? { download: "Utkarsh_Raj_Resume.pdf" } : { target: "_blank", rel: "noreferrer" })}
                      className="label inline-flex items-center gap-1 transition-colors hover:!text-signal"
                    >
                      {label}
                      <ArrowUpRight size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6">
            <form onSubmit={submit} noValidate className="space-y-7" aria-describedby="form-status">
              <div>
                <label htmlFor="c-name" className="label">
                  Name
                </label>
                <input
                  id="c-name"
                  className={field}
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "e-name" : undefined}
                />
                {errors.name && (
                  <p id="e-name" className="mt-1 text-[12px] text-signal">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="c-email" className="label">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  className={field}
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  maxLength={200}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "e-email" : undefined}
                />
                {errors.email && (
                  <p id="e-email" className="mt-1 text-[12px] text-signal">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="c-message" className="label">
                  Message
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  className={`${field} resize-none`}
                  value={form.message}
                  onChange={set("message")}
                  maxLength={3000}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "e-message" : undefined}
                />
                {errors.message && (
                  <p id="e-message" className="mt-1 text-[12px] text-signal">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* honeypot — hidden from people and assistive tech */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group relative inline-flex min-w-40 items-center justify-center gap-3 overflow-hidden border border-signal bg-signal px-6 py-3 text-[12px] uppercase tracking-[0.14em] text-ink transition-opacity disabled:opacity-60"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0"
                  />
                  <span className="relative flex items-center gap-2">
                    {status === "sending" && <Loader2 size={14} className="animate-spin" />}
                    {status === "sending" ? "Sending" : "Send message"}
                  </span>
                </button>

                <p id="form-status" role="status" aria-live="polite" className="text-[12px]">
                  {status === "sent" && <span className="text-bone">Sent. I'll reply to the address you gave.</span>}
                  {status === "error" && (
                    <span className="text-signal">
                      Something went wrong on my end. Try again, or{" "}
                      <a className="underline underline-offset-4" href={mailto}>
                        email me directly
                      </a>
                      .
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>

        <footer className="mt-28 flex flex-col justify-between gap-3 border-t border-line pt-6 md:mt-40 md:flex-row">
          <span className="label">© 2026 {profile.name}</span>
          <span className="label">React · Vite · TypeScript · Tailwind · Motion</span>
        </footer>
      </div>
    </section>
  );
}
