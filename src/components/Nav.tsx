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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#home" className="display text-xl" aria-label="Utkarsh Raj — home">
            U<span className="text-signal">.</span>R
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {sections.map((s) => {
                const on = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    <a
                      href={`#${s.id}`}
                      aria-current={on ? "true" : undefined}
                      className={`label py-4 transition-colors duration-200 hover:!text-bone ${on ? "!text-bone" : ""}`}
                    >
                      {s.label}
                    </a>
                    {on && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-px left-0 h-px w-full bg-signal"
                        transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            className="-mr-2 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-5 pb-8 pt-20 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.01 : 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: reduce ? 0 : 0.15 + i * 0.05 } }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                  >
                    <span className={`display text-5xl ${active === s.id ? "text-signal" : ""}`}>{s.label}</span>
                    <span className="label">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${profile.email}`} className="label">
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
