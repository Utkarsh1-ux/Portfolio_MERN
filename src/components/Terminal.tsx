import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { about, coreStrengths, exploring, profile, projects, skillGroups } from "../data/content";

interface Line {
  id: number;
  node: ReactNode;
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-signal underline underline-offset-4 hover:text-bone transition-colors">
    {children}
  </a>
);
const Dim = ({ children }: { children: ReactNode }) => <span className="text-mute">{children}</span>;

const COMMANDS = [
  "help",
  "demo",
  "demo 1",
  "demo 2",
  "workflow",
  "projects",
  "skills",
  "strengths",
  "about",
  "exploring",
  "open 1",
  "open 2",
  "resume",
  "contact",
  "goto",
  "clear",
];

const SUGGESTIONS = ["demo 1", "projects", "workflow", "skills", "exploring", "help"];

function go(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }
}

function run(raw: string): ReactNode | "clear" {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const arg = args.join(" ").toLowerCase();
  const lowerCmd = cmd.toLowerCase();

  switch (lowerCmd) {
    case "help":
      return (
        <div className="space-y-1">
          <div className="text-signal font-medium mb-1">Available Commands:</div>
          {[
            ["demo 1", "run live AI Interview Analyser demo in terminal"],
            ["demo 2", "simulate E-Commerce storefront & admin checkout"],
            ["workflow", "inspect the 4-step AI interview pipeline"],
            ["projects", "view both production full-stack applications"],
            ["open 1|2", "launch live deployed website in browser"],
            ["skills", "technical stack grouped by experience"],
            ["strengths", "core focus: Full-Stack, APIs, Auth & AI"],
            ["exploring", "Python + AI/ML Smart Building Energy Optimizer"],
            ["about", "academic standing, NIT Kolkata & degree details"],
            ["resume", "download Utkarsh_Raj_Resume.pdf"],
            ["goto <sec>", "jump to: home, about, projects, skills, exploring, contact"],
            ["contact", "direct contact options & social links"],
            ["clear", "clear terminal history"],
          ].map(([c, d]) => (
            <div key={c} className="grid grid-cols-[8.5rem_1fr] text-[12px]">
              <span className="text-bone font-mono font-medium">{c}</span>
              <Dim>{d}</Dim>
            </div>
          ))}
        </div>
      );

    case "demo":
    case "demo1":
    case "demo 1": {
      if (arg === "2") {
        return run("demo 2");
      }
      return (
        <div className="space-y-2 border-l-2 border-signal pl-3 my-1">
          <div className="flex items-center justify-between">
            <span className="text-signal font-medium">⚡ Flagship: AI Interview Analyser Demo</span>
            <span className="text-[11px] text-bone bg-raise px-2 py-0.5 border border-line">Gemini 1.5</span>
          </div>
          <div className="text-[12px]">
            <span className="text-mute">[1/4] Resume Upload:</span> <span className="text-bone">Utkarsh_Resume.pdf</span>
            <div className="text-dim text-[11px] pl-4">→ Extracted skills: React, Node.js, Express, MongoDB, JWT, REST APIs</div>
          </div>
          <div className="text-[12px]">
            <span className="text-mute">[2/4] Target Job Role:</span> <span className="text-bone">Full-Stack MERN Developer</span>
          </div>
          <div className="text-[12px] bg-raise/80 p-2.5 border border-line">
            <span className="text-signal font-medium">[3/4] AI Generated Question:</span>
            <div className="text-bone mt-1 italic">
              "How do you secure JWT refresh tokens against XSS attacks in React, and implement server-side invalidation upon logout in Express?"
            </div>
          </div>
          <div className="text-[12px] bg-panel p-2.5 border border-line">
            <div className="flex items-center justify-between text-signal font-medium">
              <span>[4/4] Real-time AI Coach Feedback</span>
              <span className="text-bone font-mono">Score: 94/100</span>
            </div>
            <div className="text-mute mt-1">
              "Strong answer emphasizing httpOnly cookies and in-memory access tokens. Next step: mention Redis/MongoDB TTL index for blacklisting tokens upon logout."
            </div>
          </div>
          <div className="text-[11px] text-mute pt-1">
            Try live app: <A href={projects[0].live}>{projects[0].live.replace("https://", "")}</A>
          </div>
        </div>
      );
    }

    case "demo2":
    case "demo 2":
      return (
        <div className="space-y-2 border-l-2 border-signal pl-3 my-1">
          <div className="flex items-center justify-between">
            <span className="text-signal font-medium">🛍️ E-Commerce Clothing Store + Admin Demo</span>
            <span className="text-[11px] text-bone bg-raise px-2 py-0.5 border border-line">MERN Stack</span>
          </div>
          <div className="text-[12px]">
            <span className="text-mute">Storefront:</span> <span className="text-bone">Browsing Men's Oversized Streetwear</span>
            <div className="text-dim text-[11px] pl-4">→ Added: Heavyweight Boxy Tee ($48) + Structured Hoodie ($92) to cart</div>
          </div>
          <div className="text-[12px] bg-raise/80 p-2 border border-line">
            <span className="text-mute">Cart State:</span> <span className="text-bone">2 Items · Subtotal: $140.00 · Checkout Status: Ready</span>
          </div>
          <div className="text-[12px] bg-panel p-2 border border-line">
            <span className="text-signal font-medium">Admin Dashboard Overview:</span>
            <div className="text-bone text-[11px] mt-1 space-y-0.5">
              <div>• Active Orders: 38 Pending | Total Revenue: $14,820</div>
              <div>• Inventory Alert: Heavyweight Tee running low (4 units remaining)</div>
              <div>• Live Sync: MongoDB collection updated upon instant checkout</div>
            </div>
          </div>
          <div className="text-[11px] text-mute pt-1">
            Try live app: <A href={projects[1].live}>{projects[1].live.replace("https://", "")}</A>
          </div>
        </div>
      );

    case "workflow":
      return (
        <div className="space-y-1.5 my-1">
          <div className="text-signal font-medium">AI Interview Analyser 4-Step Pipeline:</div>
          {[
            ["01", "Upload Resume", "Extracts candidate tech stack, projects, and domain depth"],
            ["02", "Select Job Role", "Defines interview expectations, target seniority & topic weights"],
            ["03", "Generate Interview", "Google Gemini API generates role-specific interview queries"],
            ["04", "Receive Feedback", "Real-time AI coaching, scoring metrics & actionable tips"],
          ].map(([step, title, desc]) => (
            <div key={step} className="grid grid-cols-[2.5rem_9.5rem_1fr] text-[12px] items-baseline">
              <span className="text-signal font-mono">{step}</span>
              <span className="text-bone font-medium">{title}</span>
              <Dim>{desc}</Dim>
            </div>
          ))}
        </div>
      );

    case "projects":
    case "ls":
      return (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.slug} className="border-b border-line/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-signal font-mono font-medium">[{p.index}]</span>
                <span className="text-bone font-medium">{p.name}</span>
                {p.isFlagship && <span className="text-[10px] bg-signal/15 text-signal px-1.5 py-0.2">Flagship</span>}
              </div>
              <div className="text-[12px] text-mute pl-6 mt-0.5">{p.oneLiner}</div>
              <div className="text-[11px] text-dim pl-6 mt-1 font-mono">{p.stack.slice(0, 5).join(" · ")}</div>
              <div className="text-[11px] pl-6 mt-1">
                Live: <A href={p.live}>{p.live.replace("https://", "")}</A>
              </div>
            </div>
          ))}
          <Dim>
            Tip: Type <span className="text-bone font-mono">open 1</span> or <span className="text-bone font-mono">demo 1</span>.
          </Dim>
        </div>
      );

    case "open": {
      const target = arg || "1";
      const p = projects.find(
        (x) => x.index === target.padStart(2, "0") || x.slug.includes(target) || x.name.toLowerCase().includes(target),
      );
      if (!p) return <Dim>usage: open 1 | open 2</Dim>;
      window.open(p.live, "_blank", "noopener,noreferrer");
      return (
        <div>
          Opening {p.name}… <A href={p.live}>{p.live.replace("https://", "")}</A>
        </div>
      );
    }

    case "skills":
      return (
        <div className="space-y-1.5">
          <div className="text-signal font-medium mb-1">Development Skills (By Experience):</div>
          {skillGroups.map((s) => (
            <div key={s.group} className="grid grid-cols-[6rem_1fr] text-[12px] items-baseline">
              <span className="text-bone font-medium">{s.group}:</span>
              <div>
                <span className="text-mute">{s.items.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      );

    case "strengths":
      return (
        <div className="space-y-1.5">
          <div className="text-signal font-medium mb-1">Core Engineering Strengths:</div>
          {coreStrengths.map((c) => (
            <div key={c.title} className="text-[12px]">
              <span className="text-bone font-medium">• {c.title}:</span>{" "}
              <span className="text-mute">{c.desc}</span>
            </div>
          ))}
        </div>
      );

    case "about":
    case "whoami":
      return (
        <div className="space-y-1 text-[12px]">
          <div>
            <span className="text-bone font-medium">{profile.name}</span> · <span className="text-signal">{profile.role}</span>
          </div>
          <Dim>
            {profile.degree} at {profile.college} ({profile.graduation}).
          </Dim>
          <div className="text-bone">
            Current Standing: <span className="text-signal">{profile.semester}</span> · <span className="text-signal">CGPA {profile.cgpa}</span>
          </div>
          <div className="mt-1 text-mute leading-relaxed">{about.paragraphs[0]}</div>
        </div>
      );

    case "exploring":
    case "next":
      return (
        <div className="space-y-1.5 text-[12px] border-l-2 border-signal pl-3 my-1">
          <div className="flex items-center justify-between">
            <span className="text-signal font-medium">⚡ Exploring: {exploring.title}</span>
            <span className="text-[10px] text-bone bg-raise px-2 py-0.5 border border-line">Python + ML</span>
          </div>
          <div className="text-bone font-medium">{exploring.subtitle}</div>
          <div className="text-mute">{exploring.hook}</div>
          <div className="text-bone text-[11px] bg-panel p-2 border border-line space-y-0.5">
            <div>• Room-wise energy monitoring & cost calculation</div>
            <div>• Scikit-learn anomaly detection for unoccupied energy waste</div>
            <div>• Machine learning historical demand forecasting</div>
          </div>
          <div className="text-dim text-[11px] font-mono">
            Stack: {exploring.tags.join(" · ")}
          </div>
        </div>
      );

    case "contact":
      return (
        <div className="space-y-1 text-[12px]">
          <div>
            Email: <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </div>
          <div>
            GitHub: <A href={profile.github}>github.com/Utkarsh1-ux</A>
          </div>
          <div>
            LinkedIn: <A href={profile.linkedin}>linkedin.com/in/utkarsh-raj-1809utkarsh</A>
          </div>
          <div>
            Location: <span className="text-bone">{profile.location}</span>
          </div>
        </div>
      );

    case "resume": {
      const a = document.createElement("a");
      a.href = profile.resume;
      a.download = "Utkarsh_Raj_Resume.pdf";
      a.click();
      return (
        <div className="text-[12px]">
          Downloading <span className="text-bone font-mono">Utkarsh_Raj_Resume.pdf</span>…{" "}
          <A href={profile.resume}>Direct PDF Link</A>
        </div>
      );
    }

    case "goto": {
      const valid = ["home", "about", "projects", "skills", "exploring", "contact"];
      if (!valid.includes(arg)) return <Dim>usage: goto {valid.join(" | ")}</Dim>;
      go(arg);
      return <Dim>Navigating to #{arg}…</Dim>;
    }

    case "clear":
      return "clear";

    case "sudo":
      return <Dim>Permission granted: welcome, recruiter.</Dim>;

    default:
      if (lowerCmd === "1") return run("demo 1");
      if (lowerCmd === "2") return run("demo 2");
      return (
        <Dim>
          command not found: {cmd}. Type <span className="text-bone font-mono">help</span> or tap suggestions below.
        </Dim>
      );
  }
}

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = useCallback((node: ReactNode) => {
    setLines((l) => [...l, { id: idRef.current++, node }]);
  }, []);

  const exec = useCallback(
    (cmd: string) => {
      if (!cmd.trim()) return;
      const out = run(cmd);
      setHistory((h) => [...h, cmd]);
      setCursor(-1);
      if (out === "clear") return setLines([]);
      push(
        <div>
          <div className="flex items-center gap-1.5 text-bone">
            <span className="text-signal font-mono">$</span>
            <span className="font-mono">{cmd}</span>
          </div>
          <div className="mt-1 pl-1">{out}</div>
        </div>,
      );
    },
    [push],
  );

  // Greeting on mount
  useEffect(() => {
    setLines([
      {
        id: idRef.current++,
        node: (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-bone font-semibold">utkarsh@portfolio-shell</span>{" "}
                <Dim>~ v2.0 (interactive)</Dim>
              </div>
              <span className="text-signal text-[11px] font-mono">MERN + AI + Python</span>
            </div>
            <div className="text-mute text-[12px]">
              Type <span className="text-bone font-mono">help</span>, <span className="text-signal font-mono">demo 1</span> for AI Interview preview, or click below.
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  // Scroll the terminal's own pane only
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    exec(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = cursor < 0 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown" && cursor >= 0) {
      e.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab" && value) {
      e.preventDefault();
      const m = COMMANDS.filter((c) => c.startsWith(value.toLowerCase()));
      if (m.length >= 1) setValue(m[0]);
    }
  };

  return (
    <div
      className="border border-line bg-panel text-[13px] leading-relaxed shadow-2xl"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center justify-between border-b border-line bg-raise/50 px-4 py-2.5">
        <span className="label flex items-center gap-2">
          <span className="size-2 rounded-full bg-signal/80" />
          terminal — zsh · Utkarsh Raj
        </span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full border border-line bg-line/20" />
          <i className="size-2 rounded-full border border-line bg-line/20" />
          <i className="size-2 rounded-full bg-signal" />
        </span>
      </div>

      <div
        ref={scrollRef}
        className="term-scroll h-72 space-y-3.5 overflow-y-auto px-4 py-3.5 md:h-80"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line bg-raise/20 px-4 py-2.5">
        <label htmlFor="term-input" className="text-signal font-mono font-bold select-none">
          $
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="type a command (e.g. demo 1, skills, goto projects)..."
          aria-label="Terminal command"
          className="min-w-0 flex-1 bg-transparent text-bone caret-signal outline-none placeholder:text-dim text-[13px]"
        />
        <button
          type="submit"
          className="label text-[10px] px-2 py-0.5 border border-line hover:border-signal text-mute hover:text-bone"
        >
          Run
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-line bg-panel px-4 py-2.5">
        <span className="label text-[10px] text-dim mr-1">Quick:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              exec(s);
            }}
            className="label text-[11px] border border-line px-2 py-1 transition-colors hover:border-signal hover:!text-signal bg-raise/40 cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
