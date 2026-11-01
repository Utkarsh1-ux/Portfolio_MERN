import type { AnchorHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  variant?: "solid" | "ghost";
  icon?: ReactNode;
  children: ReactNode;
}

/** Anchor styled as a button. Fill slides in from the left on hover. */
export function Button({ variant = "solid", icon, children, className = "", ...rest }: Props) {
  const solid = variant === "solid";
  return (
    <motion.a
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12 }}
      {...(rest as object)}
      className={`group relative inline-flex items-center gap-3 overflow-hidden border px-5 py-3 text-[12px] uppercase tracking-[0.14em] ${
        solid ? "border-signal bg-signal text-ink" : "border-line text-bone hover:border-bone/40"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -translate-x-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 ${
          solid ? "bg-bone" : "bg-raise"
        }`}
      />
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </motion.a>
  );
}
