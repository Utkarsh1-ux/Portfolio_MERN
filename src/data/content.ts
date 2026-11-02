/**
 * Single source of truth for portfolio data.
 * All project URLs, skills, about content, and exploration items are defined here.
 */

export const profile = {
  name: "Utkarsh Raj",
  role: "Full-Stack Developer",
  headline: "Full-stack developer building software that solves real problems.",
  email: "utkarsh18mish@gmail.com",
  github: "https://github.com/Utkarsh1-ux",
  linkedin: "https://www.linkedin.com/in/utkarsh-raj-1809utkarsh",
  resume: "/Utkarsh_Raj_Resume.pdf",
  college: "Narula Institute of Technology, Kolkata",
  degree: "B.E. Computer Science and Business Systems",
  graduation: "2028",
  semester: "5th Semester",
  cgpa: "8.00 / 10 (up to 4th semester)",
  location: "Kolkata, India",
  seeking: "Full-Stack Developer Roles / Internships",
} as const;

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "exploring", label: "Exploring" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const about = {
  headline: "Full-stack developer focused on building software that solves real problems.",
  paragraphs: [
    "I'm a fifth-semester CSBS student at Narula Institute of Technology, Kolkata, focused on building full-stack applications that solve real-world problems.",
    "I enjoy working across the entire development process, from designing user interfaces to building APIs, managing databases, and integrating AI into applications.",
    "I'm currently looking for opportunities to contribute to real-world products, collaborate with experienced developers, and continue growing as a full-stack developer.",
  ],
  facts: [
    ["Studying", "B.E. Computer Science and Business Systems"],
    ["Institution", "Narula Institute of Technology, Kolkata"],
    ["Timeline", "Graduating 2028 · currently 5th semester"],
    ["Academic Standing", "CGPA: 8.00 / 10 (up to 4th semester)"],
    ["Looking for", "Full-Stack Developer roles / internships"],
  ] as const,
};

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface Project {
  index: string;
  slug: string;
  name: string;
  tagline: string;
  oneLiner: string;
  problem: string;
  workflow?: WorkflowStep[];
  features: string[];
  stack: string[];
  contribution: string[];
  live: string;
  repo: string | null;
  screenshot: string | null;
  isFlagship?: boolean;
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "ai-interview-analyser",
    name: "AI Interview Analyser",
    tagline:
      "An AI-powered mock interview platform that generates role-specific questions from a candidate's resume and provides personalized interview coaching.",
    oneLiner: "Role-specific mock interviews powered by Google Gemini with real-time coaching feedback.",
    problem:
      "Standard interview preparation platforms rely on static question banks that fail to match candidates' actual resumes or specific job requirements. This platform parses resumes, tailors questions to the exact target role, and delivers immediate AI coaching to identify gaps before real interviews.",
    workflow: [
      {
        step: "01",
        title: "Upload Resume",
        description: "Parses technical proficiencies, project experience, and skill depth.",
      },
      {
        step: "02",
        title: "Select Job Role",
        description: "Defines target position, seniority level, and core expectations.",
      },
      {
        step: "03",
        title: "Generate Interview",
        description: "Google Gemini API synthesizes adaptive, role-specific questions.",
      },
      {
        step: "04",
        title: "Receive Feedback",
        description: "Instant coaching evaluation with scoring and actionable recommendations.",
      },
    ],
    features: [
      "Resume parsing to extract candidates' key proficiencies and domain context",
      "Dynamic, role-targeted question generation via Google Gemini API",
      "Real-time AI coach providing instant answer analysis and conceptual depth scoring",
      "Secure JWT-based authentication for candidate sessions and interview history",
    ],
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Google Gemini API",
      "JWT Authentication",
      "REST API",
      "Tailwind CSS",
    ],
    contribution: [
      "Architected and built the full-stack MERN application end to end",
      "Engineered prompt pipelines with the Google Gemini API for intelligent question generation and structured feedback",
      "Implemented secure JWT authentication and RESTful endpoints connecting the React interface with Express/MongoDB",
    ],
    live: "https://utkarsh1-ux-gen-ai-fullstack-fronte.vercel.app/",
    repo: "https://github.com/Utkarsh1-ux",
    screenshot: null,
    isFlagship: true,
  },
  {
    index: "02",
    slug: "ecommerce-clothing",
    name: "E-Commerce Clothing Website",
    tagline: "A production-ready storefront paired with an end-to-end admin inventory and order management dashboard.",
    oneLiner: "Full-stack apparel shopping platform with cart, checkout, and unified back-office administration.",
    problem:
      "Modern e-commerce requires two seamless systems in one: a fast, conversion-optimized storefront for customers and a reliable management dashboard for business operations to handle inventory, catalog changes, and customer orders.",
    features: [
      "Interactive product catalog with category filtering and instant search",
      "Persistent cart state, price computation, and multi-step checkout workflow",
      "Unified Admin Dashboard for real-time inventory adjustments and catalog updates",
      "Customer order lifecycle management with secure status updates in MongoDB",
    ],
    stack: ["React", "Node.js", "Express.js", "MongoDB", "REST API", "Tailwind CSS", "JWT"],
    contribution: [
      "Built the full-stack e-commerce system from scratch across both customer and merchant views",
      "Designed RESTful APIs for product catalogs, cart persistence, and order processing",
      "Created the comprehensive administrative back-office to oversee products, stock thresholds, and incoming orders",
    ],
    live: "https://the-clothing-brand-frontend-react.vercel.app/",
    repo: "https://github.com/Utkarsh1-ux",
    screenshot: null,
    isFlagship: false,
  },
];

export interface SkillGroup {
  group: string;
  items: string[];
  experience: string;
}

export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    experience: "Component-driven UIs, responsive styling, state management, and performant web interfaces.",
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    experience: "Stateless API architecture, auth middleware, request sanitization, and structured routing.",
  },
  {
    group: "Database",
    items: ["MongoDB", "MongoDB Atlas"],
    experience: "Document schema design, indexing, CRUD operations, and cloud database administration.",
  },
  {
    group: "Languages",
    items: ["JavaScript", "Python", "C", "C++"],
    experience: "Object-oriented programming, data structures, algorithms, and modular scripting.",
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel"],
    experience: "Version control workflows, endpoint testing, debugging, and continuous frontend deployment.",
  },
];

export const coreStrengths = [
  {
    title: "Full-Stack Development",
    desc: "Bridging reactive React client interfaces with robust Node/Express backends and structured MongoDB databases.",
  },
  {
    title: "REST API Architecture",
    desc: "Designing clean, predictable endpoints with strict HTTP semantics, input validation, and consistent JSON contracts.",
  },
  {
    title: "Authentication & Security",
    desc: "Implementing secure JWT workflows, token expiration handling, and protected server-side route guards.",
  },
  {
    title: "AI Integration",
    desc: "Connecting LLM APIs (Google Gemini) into full-stack apps for dynamic context synthesis and real-time guidance.",
  },
];

export const exploring = {
  badge: "Currently Exploring · Research & AI/ML Prototyping",
  title: "Smart Building Energy Optimizer",
  subtitle: "Python, Machine Learning & Full-Stack Energy Management",
  status: "Active Research & ML Prototyping",
  hook: "Expanding beyond MERN: pairing React dashboard expertise with Python, Django REST Framework, Pandas, and Scikit-learn for intelligent building energy optimization.",
  problem:
    "Commercial, college, and office buildings with dozens of rooms generate massive electricity wastage—especially during unoccupied periods. Without room-level telemetry, anomaly detection, and cost forecasting, facility managers miss substantial energy and cost savings.",
  solution:
    "An AI and data-driven platform that ingests room-level electricity readings, cross-references consumption with room occupancy, detects wastage patterns with Scikit-learn, forecasts future electricity demand, and produces actionable energy-saving recommendations.",
  workflow: [
    { step: "01", name: "Data Ingestion", desc: "Room-level electricity readings, occupancy states & equipment lists" },
    { step: "02", name: "Python Processing", desc: "Pandas & NumPy data cleansing, hourly aggregations & baseline metrics" },
    { step: "03", name: "Energy Analysis", desc: "Cross-referencing kWh consumption with unoccupied room schedules" },
    { step: "04", name: "Machine Learning", desc: "Scikit-learn anomaly detection & historical demand forecasting" },
    { step: "05", name: "Interactive Dashboard", desc: "React + Recharts visualization with daily/weekly/monthly trends" },
    { step: "06", name: "Actionable Recommendations", desc: "Quantified savings advice distinguishing measured vs estimated costs" },
  ],
  features: [
    {
      title: "Room-Wise Energy Monitoring",
      desc: "Interactive dashboard displaying electricity consumption per room across daily, weekly, and monthly periods with comparative cost benchmarking.",
    },
    {
      title: "Energy Waste Detection",
      desc: "Python & Scikit-learn algorithms comparing electricity consumption with occupancy to flag abnormal power draw during unoccupied hours.",
    },
    {
      title: "Demand Forecasting (ML)",
      desc: "Predictive machine learning models trained on historical consumption data to forecast upcoming weekly electricity loads and peak demand.",
    },
    {
      title: "Energy-Saving Recommendations",
      desc: "Automated, data-backed optimization insights (e.g. flagging 15% excess unoccupied draw in meeting rooms and advising HVAC/lighting schedule reviews).",
    },
  ],
  techStack: [
    { component: "Frontend", tech: "React + Vite", purpose: "Interactive telemetry dashboard" },
    { component: "Styling", tech: "Tailwind CSS", purpose: "Clean, responsive engineering UI" },
    { component: "Charts", tech: "Recharts", purpose: "Electricity consumption & trend visualization" },
    { component: "Backend APIs", tech: "Python + Django REST Framework", purpose: "Application logic, auth, and data endpoints" },
    { component: "Database", tech: "PostgreSQL", purpose: "Rooms, energy time-series, and recommendation logs" },
    { component: "Data Processing", tech: "Pandas + NumPy", purpose: "High-performance electricity usage analysis" },
    { component: "Machine Learning", tech: "Scikit-learn", purpose: "Anomaly detection & predictive energy demand models" },
    { component: "Deployment", tech: "Vercel + Render", purpose: "Continuous deployment for client and Python service" },
  ],
  tags: ["Python", "Django REST", "Scikit-learn", "Pandas", "PostgreSQL", "React", "Recharts", "Machine Learning"],
};

export const recognition = [
  {
    title: "4th Place of 178 Teams",
    where: "Made in JIS Ideathon",
    detail: "Finished 4th out of 178 competing teams, prototyping and pitching an impactful technology solution under strict hackathon constraints.",
  },
  {
    title: "Top 5 of the Batch",
    where: "Narula Institute of Technology",
    detail: "Ranked among the top 5 students in Computer Science & Business Systems with an 8.00 / 10 CGPA through the 4th semester.",
  },
] as const;
