import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * No screenshots were supplied, so each project gets a diagram built strictly from
 * what the resume says about it. Swap in a real screenshot via `screenshot` in content.ts.
 */

const caption = "Diagram from the project's stack · not a screenshot";

/** 01 — layered stack map */
export function StackMap() {
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const layers = [
    { tag: "Client", title: "React frontend", note: "Role + resume input, interview questions, AI coach UI" },
    { tag: "Transport", title: "RESTful API", note: "Connects the React frontend to the backend" },
    { tag: "Server", title: "Node.js + Express", note: "JWT-based authentication" },
    { tag: "AI", title: "Google Gemini API", note: "Job-specific questions · on-demand coach guidance" },
    { tag: "Data", title: "MongoDB", note: "Part of the MERN stack" },
  ];
  return (
    <figure className="border border-line bg-panel p-5 md:p-8">
      <ol className="relative">
        {layers.map((l, i) => {
          const on = hover === i;
          return (
            <li key={l.title} className="relative">
              <motion.div
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                animate={{ x: on && !reduce ? 8 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border px-4 py-4 transition-colors duration-200 md:grid-cols-[6rem_1fr] ${
                  on ? "border-signal bg-raise" : "border-line"
                }`}
              >
                <span className={`label ${on ? "!text-signal" : ""}`}>{l.tag}</span>
                <span>
                  <span className="display block text-2xl md:text-3xl">{l.title}</span>
                  <span className="mt-1 block text-[12px] text-mute">{l.note}</span>
                </span>
              </motion.div>
              {i < layers.length - 1 && <span aria-hidden className="mx-auto block h-3 w-px bg-line" />}
            </li>
          );
        })}
      </ol>
      <figcaption className="label mt-5 !text-dim">{caption}</figcaption>
    </figure>
  );
}

/** 02 — storefront / admin split over a shared API */
export function SplitSurface() {
  const store = ["User authentication", "Product browsing", "Product filtering", "Shopping cart", "Checkout flow"];
  const admin = ["Manage products", "Manage orders", "Manage inventory"];
  return (
    <figure className="border border-line bg-panel p-5 md:p-8">
      <div className="grid gap-px bg-line md:grid-cols-[1.4fr_1fr]">
        <Panel title="Storefront" items={store} accent />
        <Panel title="Admin dashboard" items={admin} />
      </div>
      <div className="mt-px flex items-center justify-between border border-t-0 border-line px-4 py-3">
        <span className="label !text-bone">REST APIs</span>
        <span className="label hidden sm:block">Products · Cart · Orders</span>
        <span className="label !text-signal">React ⇄ Express</span>
      </div>
      <figcaption className="label mt-5 !text-dim">{caption}</figcaption>
    </figure>
  );
}

function Panel({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="bg-panel p-5">
      <p className={`label mb-5 ${accent ? "!text-signal" : ""}`}>{title}</p>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li
            key={it}
            className="group flex items-center gap-3 border-b border-line pb-2.5 text-[13px] transition-colors hover:text-signal"
          >
            <span className="size-1 bg-dim transition-colors group-hover:bg-signal" aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
