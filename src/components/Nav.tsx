import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { sections, profile, type SectionId } from "../data/content";

export function Nav({ active }: { active: SectionId }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#home" className="display text-2xl tracking-wide" aria-label="Utkarsh Raj — Home">
            U<span className="text-signal font-serif">.</span>R
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-8">
              {sections.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`label py-4 text-[11px] transition-colors duration-200 hover:!text-bone ${
                        on ? "!text-bone font-medium" : "!text-mute"
                      }`}
                    >
                      {s.label}
                    </a>
                    {on && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-px left-0 h-[2px] w-full bg-signal"
                        transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={profile.resume}
              download="Utkarsh_Raj_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="label text-[10px] border border-line px-3 py-1.5 transition-colors hover:border-signal hover:!text-signal bg-panel"
            >
              Resume PDF
            </a>
          </div>

          <button
            className="-mr-2 p-2 text-bone md:hidden cursor-pointer"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-6 pb-8 pt-20 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.01 : 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="my-auto space-y-1">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  className="border-b border-line/60"
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.12 + i * 0.04 } }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-3.5"
                  >
                    <span className={`display text-3xl sm:text-4xl ${active === s.id ? "text-signal" : "text-bone"}`}>
                      {s.label}
                    </span>
                    <span className="label text-[10px] font-mono">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-line/60 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <a href={`mailto:${profile.email}`} className="label text-[11px] text-signal lowercase">
                  {profile.email}
                </a>
                <a
                  href={profile.resume}
                  download="Utkarsh_Raj_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="label text-[10px] border border-line px-2.5 py-1 text-bone"
                >
                  Resume PDF
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
