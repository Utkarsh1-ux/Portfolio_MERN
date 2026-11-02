import { useState } from "react";
import {
  Brain,
  Cpu,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Award,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { exploring, recognition } from "../data/content";
import { Reveal, SectionHead } from "./Reveal";

export function Exploring() {
  const [activeRoom, setActiveRoom] = useState<"roomA" | "roomB" | "roomC">("roomA");

  const roomsData = {
    roomA: {
      name: "Conference Room 201",
      dailyTotal: "10.0 kWh",
      unoccupiedWaste: "3.2 kWh",
      wastePct: "32%",
      costWaste: "$1.45 / day",
      status: "Anomalous Draw",
      anomalyBadge: "Waste Alert (Scikit-learn)",
      recommendation:
        "High electricity consumption detected during 4.5 hours of zero occupancy. Automated HVAC and smart lighting setback recommended. Projected monthly savings: $43.50 (96 kWh).",
      equipment: ["Dual Split HVAC (2.2 kW)", "Ceiling LED Array (320W)", "Smart Projector (250W)"],
    },
    roomB: {
      name: "Engineering Lab 204",
      dailyTotal: "18.4 kWh",
      unoccupiedWaste: "0.8 kWh",
      wastePct: "4.3%",
      costWaste: "$0.36 / day",
      status: "Optimized Profile",
      anomalyBadge: "Normal Baseline",
      recommendation:
        "Consumption correlates closely with scheduled lab sessions. Peak draw aligns with 2:00 PM equipment utilization cycles.",
      equipment: ["Variable AC Unit", "Bench Power Supplies", "Workstation Grid"],
    },
    roomC: {
      name: "Executive Suite 305",
      dailyTotal: "8.6 kWh",
      unoccupiedWaste: "1.9 kWh",
      wastePct: "22%",
      costWaste: "$0.86 / day",
      status: "Moderate Inefficiency",
      anomalyBadge: "Off-Hour Leakage",
      recommendation:
        "Phantom standby draw identified between 8:00 PM and 6:00 AM. Recommend scheduling smart outlet cutoff for display hardware.",
      equipment: ["Mini-Split AC", "Ambient Lighting", "Executive AV Station"],
    },
  };

  const current = roomsData[activeRoom];

  return (
    <section id="exploring" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHead no="04" title="Currently Exploring" />

        <div className="mb-12">
          <p className="max-w-3xl text-[15px] sm:text-[16px] text-mute leading-relaxed">
            Expanding beyond full-stack web applications into <span className="text-bone font-medium">Python, Machine Learning, and Data Analysis</span>.
            I am actively researching and prototyping an intelligent energy management platform for commercial and campus buildings.
          </p>
        </div>

        {/* Main Project Container */}
        <div className="border border-line bg-panel p-6 sm:p-8 md:p-10 mb-16 shadow-2xl">
          {/* Header & Badges */}
          <div className="mb-8 border-b border-line pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label bg-signal/15 text-signal px-2.5 py-1 border border-signal/30 text-[10px] flex items-center gap-1.5 font-medium">
                  <span className="size-1.5 rounded-full bg-signal animate-pulse" />
                  {exploring.status}
                </span>
                <span className="label text-[10px] text-dim border border-line bg-raise px-2 py-0.5">
                  Python · Django REST · Scikit-learn
                </span>
              </div>
              <span className="label text-[10px] text-mute font-mono">No Hardware Needed · Simulated Data & Datasets</span>
            </div>

            <h3 className="display text-[clamp(2.4rem,5.5vw,4.4rem)] text-bone leading-none">
              {exploring.title}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-signal font-mono font-medium mt-2">
              {exploring.subtitle}
            </p>
            <p className="mt-4 max-w-3xl text-[14px] text-mute leading-relaxed">
              {exploring.hook}
            </p>
          </div>

          {/* Workflow Pipeline */}
          <div className="mb-10 border border-line/70 bg-raise/40 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 border-b border-line/60 pb-3">
              <span className="label text-[11px] text-signal flex items-center gap-1.5 font-medium">
                <Brain size={13} />
                End-to-End System Workflow
              </span>
              <span className="label text-[10px] text-dim">Data to ML to Actionable Savings</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              {exploring.workflow.map((w, idx) => (
                <div key={w.step} className="border border-line/60 bg-panel p-3 space-y-1 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-signal font-mono text-[11px] font-bold">[{w.step}]</span>
                    {idx < exploring.workflow.length - 1 && (
                      <ArrowRight size={11} className="hidden text-dim lg:block" aria-hidden />
                    )}
                  </div>
                  <div className="text-[12px] font-medium text-bone leading-snug">{w.name}</div>
                  <p className="text-[10px] text-mute leading-tight">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column: Interactive Telemetry Preview & Narrative */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left: Simulation & Telemetry Preview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="border border-line bg-ink/70 p-4 sm:p-5 shadow-inner">
                {/* Simulated Room Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-signal" />
                    <span className="label text-[11px] text-bone font-medium">Room-Wise Energy Telemetry</span>
                  </div>
                  <div className="flex gap-1.5 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => setActiveRoom("roomA")}
                      className={`px-2 py-0.5 border cursor-pointer ${
                        activeRoom === "roomA" ? "bg-signal text-ink border-signal font-bold" : "bg-panel text-mute border-line"
                      }`}
                    >
                      Room 201
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRoom("roomB")}
                      className={`px-2 py-0.5 border cursor-pointer ${
                        activeRoom === "roomB" ? "bg-signal text-ink border-signal font-bold" : "bg-panel text-mute border-line"
                      }`}
                    >
                      Lab 204
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveRoom("roomC")}
                      className={`px-2 py-0.5 border cursor-pointer ${
                        activeRoom === "roomC" ? "bg-signal text-ink border-signal font-bold" : "bg-panel text-mute border-line"
                      }`}
                    >
                      Suite 305
                    </button>
                  </div>
                </div>

                {/* Selected Room Metrics */}
                <div className="space-y-3 font-mono">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-[13px] font-semibold text-bone">{current.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 border ${
                        current.status.includes("Anomalous")
                          ? "bg-signal/15 text-signal border-signal/40"
                          : "bg-panel text-bone border-line"
                      }`}
                    >
                      {current.anomalyBadge}
                    </span>
                  </div>

                  {/* Stat Counters */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="border border-line bg-panel p-2.5">
                      <div className="text-[14px] text-bone font-bold">{current.dailyTotal}</div>
                      <div className="text-[9px] text-mute uppercase">Daily Total</div>
                    </div>
                    <div className="border border-line bg-panel p-2.5">
                      <div className="text-[14px] text-signal font-bold">{current.unoccupiedWaste}</div>
                      <div className="text-[9px] text-mute uppercase">Unoccupied Draw</div>
                    </div>
                    <div className="border border-line bg-panel p-2.5">
                      <div className="text-[14px] text-signal font-bold">{current.costWaste}</div>
                      <div className="text-[9px] text-mute uppercase">Est. Waste Cost</div>
                    </div>
                  </div>

                  {/* Progress bar visualizing wasted energy proportion */}
                  <div className="border border-line/60 bg-panel p-2.5 space-y-1">
                    <div className="flex justify-between text-[11px] text-mute">
                      <span>Occupied vs Unoccupied Ratio:</span>
                      <span className="text-signal">{current.wastePct} Unoccupied Loss</span>
                    </div>
                    <div className="h-2 w-full bg-raise rounded overflow-hidden flex">
                      <div className="h-full bg-bone/70" style={{ width: `calc(100% - ${current.wastePct})` }} />
                      <div className="h-full bg-signal" style={{ width: current.wastePct }} />
                    </div>
                    <div className="flex justify-between text-[9px] text-dim pt-0.5">
                      <span>■ Productive Consumption</span>
                      <span className="text-signal">■ Wasted Draw (ML Identified)</span>
                    </div>
                  </div>

                  {/* Scikit-learn Actionable Recommendation Box */}
                  <div className="border-l-2 border-signal bg-raise/80 p-3 text-[11px] text-bone/90 space-y-1">
                    <div className="flex items-center gap-1.5 text-signal font-semibold">
                      <AlertTriangle size={12} />
                      <span>Scikit-learn Anomaly & Optimization Insight:</span>
                    </div>
                    <p className="text-[11px] text-mute leading-relaxed font-sans">{current.recommendation}</p>
                  </div>

                  {/* Monitored Equipment */}
                  <div className="text-[10px] text-dim flex flex-wrap items-center gap-1 pt-1 font-sans">
                    <span className="text-mute">Tracked Electrical Devices:</span>
                    {current.equipment.map((eq) => (
                      <span key={eq} className="bg-raise px-1.5 py-0.5 border border-line text-bone font-mono text-[10px]">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Demand Forecasting Model Snippet */}
              <div className="border border-line bg-raise/50 p-3.5 space-y-1 text-[11px]">
                <div className="flex items-center justify-between text-bone font-medium">
                  <span className="flex items-center gap-1.5 text-signal">
                    <BarChart3 size={13} />
                    Predictive Demand Forecasting
                  </span>
                  <span className="label text-[9px] text-dim font-mono">Next Week Model</span>
                </div>
                <p className="text-[11px] text-mute leading-snug">
                  Historical building timeseries are modeled with Scikit-learn regression algorithms to forecast peak building load
                  (e.g. predicting +8% cooling demand during Wednesday afternoon heat spikes).
                </p>
              </div>
            </div>

            {/* Right: Architectural Purpose & Features */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <div className="space-y-2">
                  <h4 className="label text-signal">The Core Problem</h4>
                  <p className="text-[13px] text-mute leading-relaxed">{exploring.problem}</p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="space-y-2">
                  <h4 className="label text-bone">The Solution & Architecture</h4>
                  <p className="text-[13px] text-mute leading-relaxed">{exploring.solution}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h4 className="label mb-3 text-bone">Key Capabilities Under Development</h4>
                <div className="space-y-3">
                  {exploring.features.map((feat) => (
                    <div key={feat.title} className="border border-line/60 bg-raise/40 p-3 space-y-1">
                      <div className="text-[13px] font-medium text-bone flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-signal shrink-0" />
                        {feat.title}
                      </div>
                      <p className="text-[11px] text-mute leading-relaxed pl-5">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Full Technology Stack Table */}
          <div className="mt-12 border-t border-line pt-8">
            <Reveal>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="label text-bone flex items-center gap-2">
                  <Layers size={13} className="text-signal" />
                  Planned Technology Stack & Component Purpose
                </span>
                <span className="label text-[10px] text-dim">Python Backend + React UI Integration</span>
              </div>

              <div className="overflow-x-auto border border-line bg-panel">
                <table className="w-full text-left text-[12px] font-mono">
                  <thead className="border-b border-line bg-raise text-[10px] uppercase tracking-wider text-mute">
                    <tr>
                      <th className="px-4 py-3">Component</th>
                      <th className="px-4 py-3">Technology</th>
                      <th className="px-4 py-3">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {exploring.techStack.map((item) => (
                      <tr key={item.component} className="hover:bg-raise/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-bone whitespace-nowrap">{item.component}</td>
                        <td className="px-4 py-2.5 text-signal font-semibold whitespace-nowrap">{item.tech}</td>
                        <td className="px-4 py-2.5 text-mute font-sans text-[12px]">{item.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Recognition & Ideathons */}
        <div>
          <Reveal className="mb-6 flex items-baseline gap-3">
            <span className="label text-signal">04.1</span>
            <h4 className="label !text-bone">Ideathons & Academic Recognition</h4>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {recognition.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="h-full border border-line bg-panel p-6 sm:p-8 transition-colors duration-200 hover:border-signal/40">
                  <div className="flex items-center justify-between mb-4">
                    <span className="label text-signal flex items-center gap-1.5">
                      <Award size={13} />
                      {r.where}
                    </span>
                    <ArrowUpRight size={13} className="text-dim" />
                  </div>
                  <h5 className="display text-3xl sm:text-4xl text-bone mb-3">{r.title}</h5>
                  <p className="text-[13px] text-mute leading-relaxed">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
