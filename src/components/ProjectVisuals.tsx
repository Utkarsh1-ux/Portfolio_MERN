import { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Layers,
  ShoppingBag,
  SlidersHorizontal,
  FileText,
  MessageSquare,
  BarChart3,
  Package,
} from "lucide-react";
import { type Project } from "../data/content";

/**
 * High-fidelity, interactive application preview components.
 * Gives recruiters an immediate visual understanding of the user interfaces,
 * live workflows, and administrative dashboards without relying only on text.
 */

export function ProjectVisualMockup({ p }: { p: Project }) {
  if (p.screenshot) {
    return (
      <div className="overflow-hidden border border-line bg-panel shadow-2xl">
        <div className="flex items-center justify-between border-b border-line bg-raise/60 px-4 py-2">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-line/50" />
            <span className="size-2.5 rounded-full bg-line/50" />
            <span className="size-2.5 rounded-full bg-line/50" />
          </div>
          <span className="label text-[10px] text-mute">{p.name} preview</span>
        </div>
        <img
          src={p.screenshot}
          alt={`${p.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="w-full object-cover"
        />
      </div>
    );
  }

  return p.slug === "ai-interview-analyser" ? <AIInterviewVisual p={p} /> : <ECommerceVisual p={p} />;
}

export function AIInterviewVisual({ p }: { p: Project }) {
  const [activeTab, setActiveTab] = useState<"interview" | "pipeline" | "skills">("interview");
  const [answered, setAnswered] = useState(true);

  return (
    <div className="overflow-hidden border border-line bg-panel shadow-2xl">
      {/* Browser Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-raise/70 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f56]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded border border-line/60 bg-ink/70 px-2.5 py-0.5 text-[11px] text-mute font-mono">
            <span>https://</span>
            <span className="text-bone">ai-interview-analyser.vercel.app</span>
            <span className="text-dim">/session/mern-dev</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="label flex items-center gap-1.5 text-[10px] text-signal bg-signal/10 px-2 py-0.5 border border-signal/20">
            <span className="size-1.5 rounded-full bg-signal animate-pulse" />
            Gemini 1.5 Live
          </span>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="label text-[10px] text-mute hover:text-bone flex items-center gap-1"
          >
            Launch <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex border-b border-line bg-ink/40 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("interview")}
          className={`flex items-center gap-1.5 border-r border-line px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "interview" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <MessageSquare size={12} />
          Interview Room & AI Coach
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-1.5 border-r border-line px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "pipeline" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <Layers size={12} />
          Workflow Pipeline
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-1.5 px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "skills" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <FileText size={12} />
          Resume Match
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 min-h-[380px] flex flex-col justify-between">
        {activeTab === "interview" && (
          <div className="space-y-4">
            {/* Session Metadata Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
              <div>
                <span className="label text-[10px] text-mute">Target Position:</span>
                <div className="text-bone font-medium text-[13px] flex items-center gap-2">
                  Full-Stack MERN Developer
                  <span className="text-[10px] text-signal font-mono bg-raise px-1.5 py-0.5 border border-line">
                    Mid-Level
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="label text-[10px] text-mute">Candidate:</span>
                <div className="text-bone text-[12px] font-mono">Utkarsh_Raj_Resume.pdf</div>
              </div>
            </div>

            {/* Question Card */}
            <div className="border border-line bg-raise/50 p-3.5 sm:p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="label text-[10px] text-signal font-mono font-medium">Question 02 / 05</span>
                <span className="label text-[10px] text-dim">Topic: Auth & REST Security</span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-bone font-medium leading-snug">
                "How do you design a secure JWT authentication flow between React and Express, ensuring refresh tokens remain protected against XSS while keeping access tokens short-lived?"
              </p>
            </div>

            {/* Candidate Response Snippet */}
            <div className="border border-line/60 bg-ink/70 p-3 text-[12px] text-mute font-mono">
              <div className="flex items-center justify-between text-dim text-[10px] mb-1">
                <span>Candidate Answer Recorded:</span>
                <span>01:42 duration</span>
              </div>
              <p className="text-bone/90 line-clamp-2">
                "Store access tokens in client memory and set the refresh token in an httpOnly, Secure, SameSite cookie. When the access token expires, the client calls /api/auth/refresh to rotate tokens..."
              </p>
            </div>

            {/* Prominent AI-Generated Feedback Overlay Card */}
            <div className="border-2 border-signal/60 bg-gradient-to-br from-raise to-panel p-3.5 sm:p-4 shadow-lg relative">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Sparkles size={13} />
                  </span>
                  <div>
                    <h5 className="text-[12px] font-semibold text-bone flex items-center gap-1.5">
                      AI Coach Evaluation
                      <span className="text-[10px] text-signal font-normal font-mono bg-signal/10 px-1 rounded">
                        Gemini 1.5 Pro
                      </span>
                    </h5>
                    <p className="text-[10px] text-mute">Instant conceptual depth analysis</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-signal text-[15px] font-mono font-bold leading-none">94 / 100</div>
                  <div className="text-[10px] text-mute">Depth Score</div>
                </div>
              </div>

              <div className="text-[12px] text-bone/95 leading-relaxed bg-ink/50 p-2.5 border border-line/60 my-2">
                <span className="text-signal font-medium">Coaching Feedback:</span> Excellent explanation of httpOnly cookie protection against XSS and short-lived in-memory access tokens. For maximum production resilience, consider mentioning token blacklisting on logout using Redis or MongoDB TTL indexes.
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="label text-[10px] text-bone bg-raise px-2 py-0.5 border border-line flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-signal" /> httpOnly Cookies
                </span>
                <span className="label text-[10px] text-bone bg-raise px-2 py-0.5 border border-line flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-signal" /> Refresh Rotation
                </span>
                <span className="label text-[10px] text-mute bg-raise px-2 py-0.5 border border-line flex items-center gap-1">
                  + Suggest Redis Invalidation
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "pipeline" && (
          <div className="space-y-4 py-2">
            <div className="text-center sm:text-left mb-2">
              <h5 className="text-[13px] font-medium text-bone">Core Application Workflow</h5>
              <p className="text-[11px] text-mute">How candidates transition from raw resume to actionable interview mastery</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  step: "01",
                  title: "Resume Ingestion",
                  desc: "Extracts technical proficiencies, project highlights, and framework familiarity.",
                  tag: "PDF Parsing",
                },
                {
                  step: "02",
                  title: "Target Role Calibration",
                  desc: "Matches candidate skills against target job description and expected seniority.",
                  tag: "Role Context",
                },
                {
                  step: "03",
                  title: "Adaptive Question Generation",
                  desc: "Gemini API crafts role-tailored technical and behavioral interview queries.",
                  tag: "Gemini 1.5",
                },
                {
                  step: "04",
                  title: "Actionable Coaching & Metrics",
                  desc: "Scores answers on accuracy, clarity, and architectural depth with remediation tips.",
                  tag: "Feedback Loop",
                },
              ].map((s) => (
                <div key={s.step} className="border border-line bg-raise/40 p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-signal font-mono text-[12px] font-semibold">{s.step}</span>
                    <span className="label text-[9px] text-dim border border-line px-1.5">{s.tag}</span>
                  </div>
                  <div className="text-[12px] font-medium text-bone">{s.title}</div>
                  <p className="text-[11px] text-mute">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4 py-1">
            <div className="border border-line bg-raise/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="label text-[10px] text-signal">Resume Profile Analyzed</span>
                <span className="text-[11px] font-mono text-bone">Match Score: 92%</span>
              </div>
              <div className="space-y-2">
                {[
                  { skill: "React.js & Client State", level: "Advanced", pct: "95%" },
                  { skill: "Node.js & Express REST APIs", level: "Advanced", pct: "92%" },
                  { skill: "MongoDB & Document Schemas", level: "Proficient", pct: "88%" },
                  { skill: "JWT Authentication & Security", level: "Proficient", pct: "90%" },
                ].map((item) => (
                  <div key={item.skill} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-bone">{item.skill}</span>
                      <span className="text-mute font-mono">{item.pct}</span>
                    </div>
                    <div className="h-1.5 w-full bg-ink rounded-full overflow-hidden border border-line/40">
                      <div className="h-full bg-signal" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-mute italic">
              * Questions are dynamically weighted to test both declared strengths and edge-case architectural boundaries.
            </p>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-mute">
            <span className="size-2 rounded-full bg-signal" />
            <span>Google Gemini API Integration</span>
            <span className="text-dim">·</span>
            <span>JWT Protected Routes</span>
          </div>
          <button
            type="button"
            onClick={() => setAnswered(!answered)}
            className="label text-[10px] text-bone hover:text-signal cursor-pointer"
          >
            {answered ? "Show blank response" : "Show evaluated response"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ECommerceVisual({ p }: { p: Project }) {
  const [activeTab, setActiveTab] = useState<"split" | "storefront" | "admin">("split");
  const [cartCount, setCartCount] = useState(2);

  return (
    <div className="overflow-hidden border border-line bg-panel shadow-2xl">
      {/* Browser Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-raise/70 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f56]" />
            <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded border border-line/60 bg-ink/70 px-2.5 py-0.5 text-[11px] text-mute font-mono">
            <span>https://</span>
            <span className="text-bone">the-clothing-brand.vercel.app</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="label flex items-center gap-1.5 text-[10px] text-bone bg-raise px-2 py-0.5 border border-line">
            <span className="size-1.5 rounded-full bg-signal" />
            Storefront + Admin
          </span>
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="label text-[10px] text-mute hover:text-bone flex items-center gap-1"
          >
            Launch <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex border-b border-line bg-ink/40 text-[11px] font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("split")}
          className={`flex items-center gap-1.5 border-r border-line px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "split" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <SlidersHorizontal size={12} />
          Storefront & Admin Side-by-Side
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("storefront")}
          className={`flex items-center gap-1.5 border-r border-line px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "storefront" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <ShoppingBag size={12} />
          Storefront
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("admin")}
          className={`flex items-center gap-1.5 px-4 py-2 transition-colors cursor-pointer ${
            activeTab === "admin" ? "bg-panel text-signal font-medium border-b-2 border-b-signal" : "text-mute hover:text-bone"
          }`}
        >
          <BarChart3 size={12} />
          Admin Dashboard
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 min-h-[380px] flex flex-col justify-between">
        {activeTab === "split" && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Left: Customer Storefront */}
            <div className="border border-line bg-raise/30 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-signal font-mono font-bold text-[11px]">01</span>
                  <span className="label text-[11px] text-bone font-medium">Customer Storefront</span>
                </div>
                <div className="label text-[10px] text-signal bg-signal/10 px-2 py-0.5 border border-signal/20 flex items-center gap-1">
                  <ShoppingBag size={10} />
                  <span>Cart ({cartCount})</span>
                </div>
              </div>

              {/* Product preview card */}
              <div className="border border-line bg-panel p-3 space-y-2">
                <div className="h-28 bg-ink/70 border border-line/40 flex flex-col items-center justify-center text-center p-2">
                  <span className="label text-[9px] text-dim mb-1">Product Catalog item</span>
                  <div className="text-[13px] font-medium text-bone">Heavyweight Boxy Tee</div>
                  <span className="text-signal text-[12px] font-mono mt-0.5">$48.00 USD</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-mute">100% French Terry Cotton</span>
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    className="label text-[10px] bg-signal text-ink px-2.5 py-1 hover:bg-bone transition-colors cursor-pointer font-bold"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>

              {/* Cart Drawer simulation */}
              <div className="border border-line/60 bg-ink/60 p-2.5 text-[11px] space-y-1.5 font-mono">
                <div className="flex justify-between text-mute">
                  <span>Subtotal ({cartCount} items):</span>
                  <span className="text-bone font-bold">${cartCount * 48}.00</span>
                </div>
                <div className="text-[10px] text-signal flex items-center gap-1">
                  <CheckCircle2 size={10} /> Free domestic shipping applied
                </div>
              </div>
            </div>

            {/* Right: Admin Back-Office */}
            <div className="border border-line bg-raise/30 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-signal font-mono font-bold text-[11px]">02</span>
                  <span className="label text-[11px] text-bone font-medium">Admin Dashboard</span>
                </div>
                <span className="label text-[10px] text-dim border border-line px-1.5">Live Sync</span>
              </div>

              {/* Admin metrics row */}
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-line bg-panel p-2 text-center">
                  <div className="text-signal text-[13px] font-mono font-bold">$14,820</div>
                  <div className="text-[9px] text-mute uppercase">Revenue</div>
                </div>
                <div className="border border-line bg-panel p-2 text-center">
                  <div className="text-bone text-[13px] font-mono font-bold">38</div>
                  <div className="text-[9px] text-mute uppercase">Orders</div>
                </div>
                <div className="border border-line bg-panel p-2 text-center">
                  <div className="text-bone text-[13px] font-mono font-bold">24</div>
                  <div className="text-[9px] text-mute uppercase">Products</div>
                </div>
              </div>

              {/* Order table snippet */}
              <div className="border border-line bg-panel p-2.5 space-y-1.5 text-[11px]">
                <div className="label text-[9px] text-mute">Recent Orders (MongoDB):</div>
                <div className="space-y-1 font-mono text-[10px]">
                  <div className="flex justify-between border-b border-line/40 pb-1">
                    <span className="text-bone">#1048 · Boxy Tee x2</span>
                    <span className="text-signal">$96 · Paid</span>
                  </div>
                  <div className="flex justify-between border-b border-line/40 pb-1">
                    <span className="text-bone">#1049 · Hoodie</span>
                    <span className="text-mute">$92 · Processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bone">#1050 · Work Jacket</span>
                    <span className="text-mute">$145 · Dispatched</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-mute font-mono flex items-center justify-between bg-raise px-2 py-1 border border-line/40">
                <span>Inventory alert:</span>
                <span className="text-signal">Boxy Tee: 4 left in stock</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "storefront" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-[13px] font-medium text-bone">Customer Shopping Experience</h5>
                <p className="text-[11px] text-mute">Frictionless product browsing, responsive filtering, and checkout flow</p>
              </div>
              <div className="label text-[10px] text-signal font-mono">Cart Total: ${cartCount * 48}.00</div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { name: "Heavyweight Boxy Tee", price: "$48.00", tag: "Best Seller" },
                { name: "Structured Oversized Hoodie", price: "$92.00", tag: "New Drop" },
                { name: "Raw Denim Carpenter Pant", price: "$120.00", tag: "Limited" },
              ].map((item) => (
                <div key={item.name} className="border border-line bg-raise/50 p-3 space-y-2">
                  <div className="h-20 bg-ink/80 flex items-center justify-center text-center p-1 border border-line/40">
                    <span className="label text-[9px] text-mute">{item.tag}</span>
                  </div>
                  <div className="text-[11px] font-medium text-bone truncate">{item.name}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-signal text-[11px] font-mono">{item.price}</span>
                    <button
                      type="button"
                      onClick={() => setCartCount((c) => c + 1)}
                      className="label text-[9px] bg-panel border border-line px-2 py-0.5 hover:border-signal cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "admin" && (
          <div className="space-y-3">
            <div>
              <h5 className="text-[13px] font-medium text-bone">Admin Operations & Control Panel</h5>
              <p className="text-[11px] text-mute">Manage products, inventory thresholds, and customer orders</p>
            </div>

            <div className="border border-line bg-raise/40 p-3 space-y-2 text-[12px]">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <span className="label text-[10px] text-bone">Product Catalog Management</span>
                <span className="label text-[10px] text-signal">+ Create New Product</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {[
                  { sku: "SKU-801", name: "Heavyweight Boxy Tee", stock: "4 units", status: "Low Stock" },
                  { sku: "SKU-802", name: "Structured Oversized Hoodie", stock: "28 units", status: "Healthy" },
                  { sku: "SKU-803", name: "Raw Denim Carpenter Pant", stock: "15 units", status: "Healthy" },
                ].map((row) => (
                  <div key={row.sku} className="flex items-center justify-between bg-panel p-2 border border-line/40">
                    <div>
                      <span className="text-dim text-[10px] mr-2">{row.sku}</span>
                      <span className="text-bone">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-mute">{row.stock}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 border ${
                          row.status === "Low Stock" ? "text-signal border-signal/30" : "text-bone border-line"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-mute">
            <Package size={12} className="text-signal" />
            <span>MERN Architecture: React ⇄ Express ⇄ MongoDB</span>
          </div>
          <span className="label text-[10px] text-dim">Storefront + Admin Dashboard in unified codebase</span>
        </div>
      </div>
    </div>
  );
}
