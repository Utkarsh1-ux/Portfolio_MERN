import { MapPin, GraduationCap, Briefcase, Award } from "lucide-react";
import { about, profile } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="01" title="About Me" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 items-start">
          {/* Main Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <Reveal>
              <h3 className="display text-[clamp(1.9rem,4vw,3.2rem)] text-bone leading-tight">
                Building practical software, from system architecture to deployed products.
              </h3>
            </Reveal>

            <div className="space-y-4 text-[15px] leading-relaxed text-mute">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="text-bone/90">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="label inline-flex items-center gap-1.5 border border-line bg-panel px-3 py-1.5 text-bone">
                  <GraduationCap size={13} className="text-signal" />
                  CSBS @ Narula Institute of Technology
                </span>
                <span className="label inline-flex items-center gap-1.5 border border-line bg-panel px-3 py-1.5 text-bone">
                  <MapPin size={13} className="text-signal" />
                  Kolkata, India
                </span>
                <span className="label inline-flex items-center gap-1.5 border border-signal/40 bg-signal/10 px-3 py-1.5 text-signal">
                  <Briefcase size={13} />
                  Open to Roles & Internships
                </span>
              </div>
            </Reveal>
          </div>

          {/* Profile Card / Identity Badge */}
          <Reveal className="lg:col-span-4" delay={0.15}>
            <div className="border border-line bg-panel p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center border-2 border-signal bg-raise text-signal font-serif text-2xl font-bold">
                  UR
                </div>
                <div>
                  <h4 className="text-bone font-medium text-[16px]">{profile.name}</h4>
                  <p className="label text-[11px] text-mute">{profile.role}</p>
                  <p className="text-[11px] text-dim">{profile.location}</p>
                </div>
              </div>

              <div className="border-t border-line/60 pt-4 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-mute">Degree:</span>
                  <span className="text-bone font-mono text-right text-[11px]">B.E. CSBS (2024-2028)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mute">Current Semester:</span>
                  <span className="text-signal font-mono font-medium">{profile.semester}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mute">Verified CGPA:</span>
                  <span className="text-signal font-mono font-bold">{profile.cgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mute">Class Rank:</span>
                  <span className="text-bone font-mono text-[11px]">Top 5 in Batch</span>
                </div>
              </div>

              <div className="border-t border-line/60 pt-4 flex items-center gap-2 text-[11px] text-mute">
                <Award size={13} className="text-signal shrink-0" />
                <span>4th place out of 178 teams in Made in JIS Ideathon</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Education & Academic Facts Row */}
        <Reveal className="mt-16 md:mt-20">
          <div className="border-t border-line">
            <dl className="grid sm:grid-cols-2 md:grid-cols-5">
              {about.facts.map(([k, v]) => (
                <div
                  key={k}
                  className="border-b border-line py-5 sm:px-4 first:sm:pl-0 last:sm:border-r-0 md:border-b-0 md:border-r"
                >
                  <dt className="label mb-2 text-dim">{k}</dt>
                  <dd className="text-[13px] font-medium text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
