import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "../data/content";
import { Button } from "./Button";
import { Terminal } from "./Terminal";

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" className="relative flex min-h-svh items-center pb-16 pt-28 md:pb-20">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.p {...rise(0.05)} className="label mb-8 flex items-center gap-3">
            <span className="inline-block size-1.5 rounded-full bg-signal" aria-hidden />
            {profile.name} · {profile.role}
          </motion.p>

          <h1 className="display text-[clamp(3.2rem,12vw,5.6rem)] lg:text-[clamp(4rem,6.1vw,6.4rem)]">
            <motion.span {...rise(0.12)} className="block">
              Two MERN apps,
            </motion.span>
            <motion.span {...rise(0.2)} className="block italic text-signal">
              both live.
            </motion.span>
            <motion.span {...rise(0.28)} className="block text-bone/90">
              The rest on request.
            </motion.span>
          </h1>

          <motion.p {...rise(0.4)} className="mt-9 max-w-xl text-[15px] text-mute">
            I'm {profile.name.split(" ")[0]}, a CSBS student at {profile.college} (class of {profile.graduation}). I build
            full-stack web apps with React, Node, Express and MongoDB — an AI mock-interview platform on the Gemini API
            and an e-commerce store with an admin dashboard are the two I've shipped.
          </motion.p>

          <motion.div {...rise(0.5)} className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects" icon={<ArrowDownRight size={15} />}>
              Explore My Work
            </Button>
            <Button
              href={profile.resume}
              download="Utkarsh_Raj_Resume.pdf"
              variant="ghost"
              icon={<Download size={15} />}
            >
              Download Resume
            </Button>
          </motion.div>
        </div>

        <motion.div {...rise(0.55)} className="lg:col-span-5 lg:self-end">
          <p className="label mb-3">Try it — it's a working shell</p>
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
