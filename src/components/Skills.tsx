import { recognition, skills } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="03" title="Skills" />

        <div>
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={Math.min(i, 3) * 0.04}>
              <div className="group grid gap-3 border-t border-line py-6 transition-colors duration-300 hover:bg-panel md:grid-cols-12 md:gap-8 md:px-3 md:py-7">
                <h3 className="display text-3xl transition-colors group-hover:text-signal md:col-span-4 md:text-4xl">
                  {s.group}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5 md:col-span-8 md:self-center">
                  {s.items.map((it) => (
                    <li key={it} className="text-[14px] text-bone/90">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal className="mb-10 flex items-baseline gap-4">
            <span className="label text-signal">04</span>
            <h2 className="label !text-bone">Recognition</h2>
          </Reveal>
          <div className="grid gap-px bg-line md:grid-cols-2">
            {recognition.map((r) => (
              <Reveal key={r.title} className="bg-ink">
                <div className="h-full p-6 md:p-10">
                  <p className="label mb-6">{r.where}</p>
                  <h3 className="display text-4xl md:text-5xl">{r.title}</h3>
                  <p className="mt-5 max-w-sm text-[13px] text-mute">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
