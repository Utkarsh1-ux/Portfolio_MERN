import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "h2" | "h3";
}

/** One consistent entrance: short fade + 14px rise, once. Opacity-only when motion is reduced. */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.01 : 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ no, title }: { no: string; title: string }) {
  return (
    <Reveal className="mb-10 flex items-baseline gap-4 border-b border-line pb-4 md:mb-14">
      <span className="label text-signal">{no}</span>
      <h2 className="label !text-bone">{title}</h2>
    </Reveal>
  );
}
