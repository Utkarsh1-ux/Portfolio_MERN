import { ArrowUpRight, GitBranch, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { profile, projects, type Project, type WorkflowStep } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";
import { ProjectVisualMockup } from "./ProjectVisuals";
import { Button } from "./Button";

function WorkflowBar({ workflow }: { workflow: WorkflowStep[] }) {
  return (
    <div className="mb-10 border border-line bg-panel p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
        <span className="label flex items-center gap-2 text-signal">
          <Sparkles size={13} />
          Workflow Architecture
        </span>
        <span className="label text-[10px] text-mute">From input resume to real-time AI feedback</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {workflow.map((w, idx) => (
          <div key={w.step} className="relative border border-line/70 bg-raise/40 p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-signal font-mono text-[12px] font-bold">[{w.step}]</span>
              {idx < workflow.length - 1 && (
                <ArrowRight size={13} className="hidden text-dim lg:block" aria-hidden />
              )}
            </div>
            <h5 className="text-[13px] font-medium text-bone">{w.title}</h5>
            <p className="text-[11px] text-mute leading-relaxed">{w.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Case({ p, first }: { p: Project; first: boolean }) {
  return (
    <article
      aria-labelledby={`${p.slug}-title`}
      className={`${first ? "pb-20 md:pb-28" : "border-t border-line py-20 md:py-28"}`}
    >
      {/* Project Header */}
      <div className="mb-10 grid items-start gap-4 md:mb-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-2">
          <div className="flex items-baseline gap-3">
            <span className="display block text-6xl text-signal md:text-8xl">{p.index}</span>
            {p.isFlagship && (
              <span className="label inline-block bg-signal/15 text-signal px-2 py-0.5 border border-signal/30 text-[10px]">
                Flagship
              </span>
            )}
          </div>
        </Reveal>

        <Reveal className="lg:col-span-10">
          <h3 id={`${p.slug}-title`} className="display text-[clamp(2.4rem,5.6vw,4.8rem)] leading-none text-bone">
            {p.name}
          </h3>
          <p className="mt-3 max-w-3xl text-[15px] sm:text-[16px] text-mute leading-relaxed">{p.tagline}</p>
        </Reveal>
      </div>

      {/* Flagship Workflow Pipeline Display */}
      {p.workflow && (
        <Reveal>
          <WorkflowBar workflow={p.workflow} />
        </Reveal>
      )}

      {/* Visual Application Preview + Problem/Features Split */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Large Application Preview */}
        <Reveal className="lg:col-span-7">
          <div className="space-y-3">
            <ProjectVisualMockup p={p} />
            <p className="label text-[11px] text-dim flex items-center justify-between">
              <span>Interactive application mockup · switch tabs above</span>
              <span className="text-signal font-mono">Live on Vercel</span>
            </p>
          </div>
        </Reveal>

        {/* Narrative & Details */}
        <div className="space-y-8 lg:col-span-5">
          <Reveal>
            <div className="border-l-2 border-signal pl-4">
              <h4 className="label mb-2 text-signal">One-Line Overview</h4>
              <p className="text-[14px] text-bone font-medium leading-relaxed">{p.oneLiner}</p>
            </div>
          </Reveal>

          <Reveal>
            <h4 className="label mb-2.5">The Problem It Solves</h4>
            <p className="text-[13px] text-mute leading-relaxed">{p.problem}</p>
          </Reveal>

          <Reveal>
            <h4 className="label mb-3">Key Features</h4>
            <ul className="space-y-2.5 text-[13px]">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-bone/90">
                  <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h4 className="label mb-2.5">What I Built & Architected</h4>
            <ul className="space-y-2 text-[13px] text-mute">
              {p.contribution.map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <span className="text-dim shrink-0 mt-0.5" aria-hidden>
                    —
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Technologies & Live Action Bar */}
      <Reveal className="mt-12 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="label text-[10px] text-dim block mb-2">Technologies Used</span>
          <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Technologies used">
            {p.stack.map((s) => (
              <li key={s} className="label border border-line bg-panel px-2.5 py-1 text-[11px] !text-bone">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button href={p.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={15} />}>
            Live Demo
          </Button>
          <Button
            href={p.repo ?? profile.github}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            icon={<GitBranch size={15} />}
          >
            {p.repo ? "View GitHub" : "GitHub Profile"}
          </Button>
        </div>
      </Reveal>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="02" title="Featured Projects" />
        <div className="mb-12">
          <p className="max-w-2xl text-[15px] text-mute">
            Two live full-stack applications solving distinct real-world problems. Both are deployed in production,
            featuring end-to-end architectures from interactive clients to database persistence.
          </p>
        </div>
        {projects.map((p, i) => (
          <Case key={p.slug} p={p} first={i === 0} />
        ))}
      </div>
    </section>
  );
}
