import { Code2, Server, Database, Terminal, Wrench, Shield, Sparkles, Layers, Network } from "lucide-react";
import { coreStrengths, skillGroups } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

const ICONS: Record<string, typeof Code2> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Languages: Terminal,
  Tools: Wrench,
};

const STRENGTH_ICONS = [Layers, Network, Shield, Sparkles];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="03" title="Skills & Technical Proficiency" />

        <div className="mb-14">
          <p className="max-w-2xl text-[15px] text-mute">
            Technologies grouped by practical development experience across deployed applications. Every tool listed is
            actively used in production and ready to be discussed in technical interviews.
          </p>
        </div>

        {/* Core Strengths Highlight Section */}
        <div className="mb-20">
          <Reveal className="mb-6 flex items-center justify-between">
            <span className="label text-signal flex items-center gap-2">
              <Sparkles size={13} />
              Core Areas of Focus
            </span>
            <span className="label text-[10px] text-dim">Specialized Competencies</span>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {coreStrengths.map((s, idx) => {
              const Icon = STRENGTH_ICONS[idx % STRENGTH_ICONS.length];
              return (
                <Reveal key={s.title} delay={idx * 0.06}>
                  <div className="h-full border border-line bg-panel p-5 transition-all duration-300 hover:border-signal/50 hover:bg-raise/60">
                    <div className="mb-4 flex size-9 items-center justify-center rounded border border-line bg-raise text-signal">
                      <Icon size={16} />
                    </div>
                    <h4 className="text-[14px] font-medium text-bone mb-2">{s.title}</h4>
                    <p className="text-[12px] text-mute leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Grouped Skills by Experience */}
        <div>
          <Reveal className="mb-4">
            <span className="label text-bone">Technologies by Development Layer</span>
          </Reveal>

          <div className="divide-y divide-line border-t border-b border-line">
            {skillGroups.map((s, i) => {
              const GroupIcon = ICONS[s.group] || Code2;
              return (
                <Reveal key={s.group} delay={Math.min(i, 4) * 0.05}>
                  <div className="group grid gap-4 py-6 transition-colors duration-200 hover:bg-panel/60 md:grid-cols-12 md:gap-8 md:px-4 md:py-7">
                    <div className="md:col-span-4 space-y-1">
                      <div className="flex items-center gap-2.5">
                        <GroupIcon size={15} className="text-signal" />
                        <h4 className="display text-2xl transition-colors group-hover:text-signal md:text-3xl text-bone">
                          {s.group}
                        </h4>
                      </div>
                      <p className="text-[12px] text-mute">{s.experience}</p>
                    </div>

                    <div className="md:col-span-8 md:self-center">
                      <ul className="flex flex-wrap gap-2">
                        {s.items.map((it) => (
                          <li
                            key={it}
                            className="label border border-line/80 bg-panel px-3 py-1.5 text-[12px] text-bone transition-colors group-hover:border-signal/40"
                          >
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
