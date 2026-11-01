import { ArrowUpRight, GitBranch } from "lucide-react";
import { profile, projects, type Project } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";
import { StackMap, SplitSurface } from "./ProjectVisuals";
import { Button } from "./Button";

function Visual({ p }: { p: Project }) {
  if (p.screenshot)
    return (
      <img
        src={p.screenshot}
        alt={`${p.name} screenshot`}
        loading="lazy"
        decoding="async"
        className="w-full border border-line"
      />
    );
  return p.slug === "ai-interview-analyser" ? <StackMap /> : <SplitSurface />;
}

function Case({ p, flip, first }: { p: Project; flip: boolean; first: boolean }) {
  return (
    <article aria-labelledby={`${p.slug}-title`} className={`${first ? "pb-16 md:pb-24" : "border-t border-line py-16 md:py-24"}`}>
      <div className="mb-12 grid items-end gap-6 md:mb-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-2">
          <span className="display block text-7xl text-signal md:text-8xl">{p.index}</span>
        </Reveal>
        <Reveal className="lg:col-span-10">
          <h3 id={`${p.slug}-title`} className="display text-[clamp(2.6rem,6.4vw,5.6rem)]">
            {p.name}
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] text-mute">{p.tagline}</p>
        </Reveal>
      </div>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <Visual p={p} />
        </Reveal>

        <div className={`space-y-10 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <Reveal>
            <p className="text-[14px] text-bone">{p.summary}</p>
          </Reveal>

          <Reveal>
            <h4 className="label mb-3">The problem</h4>
            <p className="text-[13px] text-mute">{p.problem}</p>
          </Reveal>

          <Reveal>
            <h4 className="label mb-3">Key features</h4>
            <ul className="space-y-2 text-[13px]">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-signal" aria-hidden>
                    →
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h4 className="label mb-3">What I built</h4>
            <ul className="space-y-2 text-[13px] text-mute">
              {p.contribution.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-dim" aria-hidden>
                    —
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-12 flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Technologies used">
          {p.stack.map((s) => (
            <li key={s} className="label !text-bone">
              {s}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button href={p.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={15} />}>
            Live demo
          </Button>
          <Button
            href={p.repo ?? profile.github}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<GitBranch size={15} />}
          >
            {p.repo ? "Source" : "GitHub profile"}
          </Button>
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="02" title="Selected work" />
        {projects.map((p, i) => (
          <Case key={p.slug} p={p} flip={i % 2 === 1} first={i === 0} />
        ))}
      </div>
    </section>
  );
}
