import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { about, profile, projects, skills, recognition } from "../data/content";

interface Line {
  id: number;
  node: ReactNode;
}

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-signal underline underline-offset-4">
    {children}
  </a>
);
const Dim = ({ children }: { children: ReactNode }) => <span className="text-mute">{children}</span>;

const COMMANDS = ["help", "about", "projects", "open", "skills", "recognition", "contact", "resume", "goto", "clear"];

const SUGGESTIONS = ["help", "projects", "skills", "contact"];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

function run(raw: string): ReactNode | "clear" {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(" ").toLowerCase();

  switch (cmd.toLowerCase()) {
    case "help":
      return (
        <div>
          {[
            ["about", "who I am"],
            ["projects", "list the two projects"],
            ["open <1|2>", "open a project's live demo"],
            ["skills", "what I work with"],
            ["recognition", "achievements"],
            ["contact", "ways to reach me"],
            ["resume", "download my resume"],
            ["goto <section>", "home, about, projects, skills, contact"],
            ["clear", "clear the screen"],
          ].map(([c, d]) => (
            <div key={c} className="grid grid-cols-[9.5rem_1fr]">
              <span className="text-bone">{c}</span>
              <Dim>{d}</Dim>
            </div>
          ))}
        </div>
      );
    case "about":
    case "whoami":
      return (
        <div>
          <div>
            {profile.name}, {profile.role.toLowerCase()}.
          </div>
          <Dim>
            {profile.degree}, {profile.college}. Class of {profile.graduation}.
          </Dim>
          <div className="mt-1 text-mute">{about.lead}</div>
        </div>
      );
    case "projects":
    case "ls":
      return (
        <div>
          {projects.map((p) => (
            <div key={p.slug} className="mb-1">
              <span className="text-signal">{p.index}</span> {p.name}
              <div className="pl-6">
                <Dim>{p.stack.slice(0, 4).join(" · ")}</Dim>
              </div>
            </div>
          ))}
          <Dim>
            Type <span className="text-bone">open 1</span> or <span className="text-bone">open 2</span> to launch a live demo.
          </Dim>
        </div>
      );
    case "open": {
      const p = projects.find((x) => x.index === arg.padStart(2, "0") || x.slug === arg || x.name.toLowerCase() === arg);
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
        <div>
          {skills.map((s) => (
            <div key={s.group} className="grid grid-cols-[6.5rem_1fr]">
              <span className="text-bone">{s.group}</span>
              <Dim>{s.items.join(", ")}</Dim>
            </div>
          ))}
        </div>
      );
    case "recognition":
    case "achievements":
      return (
        <div>
          {recognition.map((r) => (
            <div key={r.title}>
              <span className="text-signal">→</span> {r.title} <Dim>· {r.where}</Dim>
            </div>
          ))}
        </div>
      );
    case "contact":
      return (
        <div>
          <div>
            email <A href={`mailto:${profile.email}`}>{profile.email}</A>
          </div>
          <div>
            github <A href={profile.github}>Utkarsh1-ux</A>
          </div>
          <div>
            linkedin <A href={profile.linkedin}>utkarsh-raj-1809utkarsh</A>
          </div>
        </div>
      );
    case "resume": {
      const a = document.createElement("a");
      a.href = profile.resume;
      a.download = "Utkarsh_Raj_Resume.pdf";
      a.click();
      return <Dim>Downloading Utkarsh_Raj_Resume.pdf…</Dim>;
    }
    case "goto": {
      const ids = ["home", "about", "projects", "skills", "contact"];
      if (!ids.includes(arg)) return <Dim>usage: goto {ids.join(" | ")}</Dim>;
      go(arg);
      return <Dim>Scrolling to {arg}…</Dim>;
    }
    case "clear":
      return "clear";
    case "sudo":
      return <Dim>Nice try.</Dim>;
    default:
      return (
        <Dim>
          command not found: {cmd}. Try <span className="text-bone">help</span>.
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
          <div>
            <span className="text-signal">$</span> {cmd}
          </div>
          <div className="mt-1 pl-0">{out}</div>
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
          <div>
            <div>
              <span className="text-bone">utkarsh@portfolio</span> <Dim>~ v1.0</Dim>
            </div>
            <Dim>
              Type <span className="text-bone">help</span>, or tap a command below.
            </Dim>
          </div>
        ),
      },
    ]);
  }, []);

  // Scroll the terminal's own pane only — never the page
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
      if (m.length === 1) setValue(m[0]);
    }
  };

  return (
    <div
      className="border border-line bg-panel text-[13px] leading-relaxed"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="label">~/utkarsh — zsh</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full border border-line" />
          <i className="size-2 rounded-full border border-line" />
          <i className="size-2 rounded-full bg-signal" />
        </span>
      </div>

      <div
        ref={scrollRef}
        className="term-scroll h-64 space-y-3 overflow-y-auto px-4 py-3 md:h-72"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-3">
        <label htmlFor="term-input" className="text-signal">
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
          placeholder="type a command"
          aria-label="Terminal command"
          className="min-w-0 flex-1 bg-transparent text-bone caret-signal outline-none placeholder:text-dim"
        />
      </form>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => exec(s)}
            className="label border border-line px-2.5 py-1 transition-colors hover:border-signal hover:!text-bone"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
