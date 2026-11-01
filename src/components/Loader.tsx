import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Brief intro: monogram + counter, then the curtain lifts. Shown once per session. */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 0 : 1250);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[70] flex items-end justify-between bg-ink p-6 md:p-10"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.span
        className="display text-[28vw] text-bone md:text-[16vw]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        U<span className="text-signal">.</span>R
      </motion.span>
      <motion.span
        className="label mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        Portfolio · 2026
      </motion.span>
    </motion.div>
  );
}
