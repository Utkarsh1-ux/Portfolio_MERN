/**
 * Single source of truth for every word and link on the site.
 * Everything here comes from the resume. Anything not on the resume is `null`
 * and rendered as an explicit placeholder — nothing is invented.
 */

export const profile = {
  name: "Utkarsh Raj",
  role: "Full-Stack Developer",
  email: "utkarsh18mish@gmail.com",
  github: "https://github.com/Utkarsh1-ux",
  linkedin: "https://www.linkedin.com/in/utkarsh-raj-1809utkarsh",
  resume: "/Utkarsh_Raj_Resume.pdf",
  college: "Narula Institute of Technology, Kolkata",
  degree: "B.E. Computer Science and Business Systems",
  graduation: "2028",
  seeking: "Full-Stack Developer Roles / Internships",
} as const;

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const about = {
  lead: "I'm in my fifth semester of a CSBS degree, and most of what I know about software I learned by shipping it.",
  paragraphs: [
    "I work across the MERN stack: React on the front, Node and Express behind a REST API, MongoDB underneath. I like owning the whole path of a feature, from the screen someone taps to the document that gets written.",
    "Two projects so far, both deployed: an AI mock-interview platform built around the Gemini API, and a clothing store with a cart, checkout and an admin side. Between them I've worked through JWT auth, API design, and keeping frontend and backend cleanly separated.",
    "Underneath the web work I keep the fundamentals warm: data structures and algorithms, OOP, DBMS and operating systems.",
  ],
  facts: [
    ["Studying", "B.E. Computer Science and Business Systems"],
    ["At", "Narula Institute of Technology, Kolkata"],
    ["Graduating", "2028 · currently 5th semester"],
    ["CGPA", "8.00 / 10 (up to 4th semester)"],
    ["Looking for", "Full-Stack Developer roles / internships"],
  ] as const,
};

export interface Project {
  index: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  problem: string;
  features: string[];
  stack: string[];
  contribution: string[];
  live: string;
  /** Repo URL is not on the resume. Falls back to the GitHub profile. */
  repo: string | null;
  /** Set to an imported image path to show a real screenshot as the primary visual. */
  screenshot: string | null;
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "ai-interview-analyser",
    name: "AI Interview Analyser",
    tagline: "Mock interviews, tailored to the job you actually want.",
    summary:
      "A full-stack mock interview platform. You log in, add a target job role and your resume, and get interview questions specific to that role.",
    problem:
      "Generic question banks don't reflect the role you're applying for. This generates questions from the job role and resume you provide, and adds an AI coach for guidance while you prepare.",
    features: [
      "Login, then add a target job role and your resume",
      "Job-specific interview questions generated for that role",
      "AI coach with real-time, on-demand guidance and feedback",
      "Secure JWT-based authentication",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Google Gemini API", "JWT", "REST API"],
    contribution: [
      "Built the full-stack platform end to end",
      "Integrated the AI coach through the Google Gemini API",
      "Implemented JWT authentication and the RESTful API layer connecting the React frontend to the Node/Express backend",
    ],
    live: "https://utkarsh1-ux-gen-ai-fullstack-fronte.vercel.app/",
    repo: null,
    screenshot: null,
  },
  {
    index: "02",
    slug: "ecommerce-clothing",
    name: "E-Commerce Clothing Website",
    tagline: "A storefront and the dashboard that runs it.",
    summary:
      "A full-stack online clothing store covering the whole purchase path, with a separate admin interface for running the shop.",
    problem:
      "A shop needs two products in one: a storefront customers can browse and buy from, and a back office to manage what's on sale. This delivers both on one codebase with a clean frontend/backend split.",
    features: [
      "User authentication",
      "Product browsing and filtering",
      "Shopping cart and checkout flow",
      "Admin dashboard for products, orders and inventory in a single interface",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    contribution: [
      "Built the full-stack application end to end",
      "Designed REST APIs for product listings, cart operations and order processing",
      "Kept frontend and backend cleanly separated",
      "Built the admin dashboard for managing products, orders and inventory",
    ],
    live: "https://the-clothing-brand-frontend-react.vercel.app/",
    repo: null,
    screenshot: null,
  },
];

export const skills: { group: string; items: string[]; note?: string }[] = [
  { group: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "SCSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT authentication"] },
  { group: "Databases", items: ["MongoDB", "MongoDB Atlas"] },
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "C", "C++"] },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Cloudinary", "Vercel"] },
  {
    group: "Foundations",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "System Design basics"],
  },
];

export const recognition = [
  {
    title: "4th place of 178 teams",
    where: "Made in JIS Ideathon",
    detail: "Placed fourth out of 178 competing teams.",
  },
  {
    title: "Top 5 of the batch",
    where: "Narula Institute of Technology",
    detail: "Ranked among the top five students of the batch. CGPA 8.00 / 10 up to the 4th semester.",
  },
] as const;
