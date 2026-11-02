import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, Download, Mail, Sparkles } from "lucide-react";
import { profile } from "../data/content";
import { Button } from "./Button";
import { Terminal } from "./Terminal";

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: reduce ? 0.01 : 0.75, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="home" className="relative flex min-h-svh items-center pb-16 pt-24 md:pb-20 md:pt-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div {...rise(0.05)} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="label flex items-center gap-2 border border-line bg-panel px-3 py-1.5">
              <span className="inline-block size-2 rounded-full bg-signal" aria-hidden />
              {profile.name} · {profile.role}
            </span>
            <span className="label hidden sm:inline-flex items-center gap-1.5 text-mute">
              <Sparkles size={12} className="text-signal" />
              MERN + AI Solutions
            </span>
          </motion.div>

          <h1 className="display text-[clamp(2.9rem,8.2vw,5.6rem)] lg:text-[clamp(3.8rem,5.6vw,6.2rem)] leading-[0.96]">
            <motion.span {...rise(0.12)} className="block text-bone">
              From an idea to a
            </motion.span>
            <motion.span {...rise(0.2)} className="block italic text-signal">
              working product.
            </motion.span>
          </h1>

          <motion.p {...rise(0.32)} className="mt-8 max-w-xl text-[15px] leading-relaxed text-mute">
            I'm Utkarsh, a CSBS student at Narula Institute of Technology. I build full-stack applications with React,
            Node.js, and MongoDB, with a focus on practical solutions and AI-powered experiences.
          </motion.p>

          <motion.div {...rise(0.42)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={<ArrowDownRight size={15} />}>
              View Projects
            </Button>
            <Button
              href={profile.resume}
              download="Utkarsh_Raj_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              icon={<Download size={15} />}
            >
              Download Resume
            </Button>
            <Button href="#contact" variant="ghost" icon={<Mail size={15} />}>
              Contact Me
            </Button>
          </motion.div>

          <motion.div {...rise(0.5)} className="mt-10 border-t border-line/80 pt-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-mute">
              <span>
                <span className="text-bone font-medium">Flagship:</span> AI Interview Analyser (Gemini API)
              </span>
              <span className="hidden sm:inline text-dim">•</span>
              <span>
                <span className="text-bone font-medium">Status:</span> 5th Sem CSBS · CGPA 8.00 / 10
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div {...rise(0.48)} className="lg:col-span-5 lg:self-center">
          <div className="mb-3 flex items-center justify-between">
            <p className="label flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-signal" />
              Interactive Project Terminal
            </p>
            <span className="label text-[10px] text-dim">Type or click commands</span>
          </div>
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
