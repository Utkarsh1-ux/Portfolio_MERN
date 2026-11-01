import { about } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="01" title="About" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <p className="display text-[clamp(2rem,4.6vw,3.9rem)] text-bone">{about.lead}</p>
          </Reveal>

          <div className="space-y-6 text-[14px] text-mute lg:col-span-4 lg:col-start-9 lg:pt-3">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-20 md:mt-28">
          <dl className="grid border-t border-line md:grid-cols-5">
            {about.facts.map(([k, v]) => (
              <div key={k} className="border-b border-line py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0">
                <dt className="label mb-2">{k}</dt>
                <dd className="text-[13px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
