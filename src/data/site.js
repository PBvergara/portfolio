/**
 * Edit this file to personalize the site.
 * Placeholder copy, sample skills, and empty URLs are intentional.
 * A link stays inactive until it is a real http(s) or mailto address.
 * The contact form sends messages through Web3Forms.
 */

export const site = {
  brand: "Paul Bryan B. Vergara",
  role: "Software Developer",
  status: "Available for Opportunities",
  avatar: "/profile.png",
  heroIntro:
    "I'm a developer passionate about building innovative digital experiences — software with a clear purpose, a careful interface, and room to grow.",
  email: "vergarapaul422@gmail.com",
  github: "https://github.com/PBvergara",
  linkedin: "https://www.linkedin.com/in/paul-bryan-vergara-21387a437",
  facebook: "https://www.facebook.com/share/19XpWco93Z/",
  web3formsKey: "8ecea551-3ad5-40e8-b604-d9ede29347ed",
};

// Replace the dashes with real counts. Leave a metric out if you do not want to show it.
// Years of experience and GitHub activity are omitted until you have figures you want to publish.
export const stats = [
  { label: "Projects", value: "6" },
  { label: "Technologies", value: "20" },
  { label: "Specialization", value: "Full-Stack Development" },
  { label: "Status", value: "Open to IT Internship" },
];

export const about = {
  intro:
    "I'm a 4th-year BSIT student at NU Baliwag. I enjoy problem solving and building software, especially games and systems that use AI, and I'm working toward becoming a game developer.",
  cards: [
    {
      title: "Background",
      icon: "book",
      text: "Currently a 4th-year BSIT student at NU Baliwag.",
    },
    {
      title: "Interests",
      icon: "sparkles",
      text: "Problem solving, game development, and systems that use AI.",
    },
    {
      title: "Goals",
      icon: "target",
      text: "To become a game developer.",
    },
  ],
};

export const skillsNote = "Tools used in the projects listed on this site.";

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    items: [
      { name: "HTML", icon: "file-code" },
      { name: "CSS", icon: "palette" },
      { name: "JavaScript", icon: "braces" },
      { name: "React", icon: "atom" },
      { name: "Tailwind CSS", icon: "palette" },
      { name: "Vite", icon: "workflow" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    items: [
      { name: "Python", icon: "terminal" },
      { name: "Django", icon: "server" },
      { name: "Firebase", icon: "workflow" },
      { name: "Supabase", icon: "database" },
      { name: "Google Apps Script", icon: "code" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: "database",
    items: [
      { name: "Cloud Firestore", icon: "database" },
      { name: "SQLite", icon: "database" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    icon: "sparkles",
    items: [
      { name: "Groq", icon: "sparkles" },
      { name: "Google Gemini", icon: "sparkles" },
      { name: "face-api.js", icon: "cpu" },
    ],
  },
  {
    id: "game",
    title: "Game",
    icon: "cpu",
    items: [
      { name: "Godot", icon: "cpu" },
      { name: "GDScript", icon: "code" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "smartphone",
    items: [
      { name: "Capacitor", icon: "smartphone" },
      { name: "Android WebView", icon: "smartphone" },
    ],
  },
];

export const projects = [
  {
    id: "interviewsenseai",
    featured: true,
    title: "InterviewSenseAI",
    category: "Virtual Interview Platform",
    description:
      "An AI-powered virtual interview platform designed to help job seekers prepare for real-world interviews through AI-driven verbal response analysis, facial expression recognition, and camera-based behavioral feedback. It also provides a company-side interface for HR personnel to manage applicants, review candidate information, and support initial interview activities. The platform connects interview preparation with applicant management to support both job seekers and hiring teams.",
    stack: [
      { name: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Google Fonts"] },
      { name: "Backend", items: ["Firebase Hosting", "Firebase Authentication", "Cloud Firestore", "Cloud Functions", "Google Apps Script"] },
      { name: "AI", items: ["Groq", "Google Gemini", "Simli", "Orpheus TTS", "Web Speech API", "face-api.js"] },
      { name: "Documents", items: ["PDF.js", "Tesseract.js"] },
      { name: "Storage", items: ["Supabase Storage", "IndexedDB", "localStorage"] },
      { name: "Media", items: ["WebRTC", "MediaRecorder"] },
      { name: "Mobile", items: ["Android WebView"] },
      { name: "Tools", items: ["Firebase CLI"] },
    ],
    image: "/projects/interviewsense/logo.png",
    liveUrl: "https://interviewsense-f28ee.web.app/",
    repoUrl: "",
    preview: "interview",
  },
  {
    id: "project-two",
    featured: false,
    title: "NutriGoal",
    category: "Smart Meal Planner",
    description:
      "NutriGoal (Smart Meal Planner) is a web app that builds practical meal plans from a person’s goal, activity, health status, allergies, and budget. It suggests Filipino-friendly meals with estimated prices and cooking steps, then lets the user swap a meal, name and save the plan, and download it as a PDF.",
    stack: [
      { name: "Frontend", items: ["React 19", "Vite 8", "React Router", "React Hook Form", "CSS"] },
      { name: "Backend", items: ["Supabase", "Google Apps Script"] },
      { name: "Meal plans", items: ["Groq", "jsPDF"] },
      { name: "Mobile and hosting", items: ["Capacitor 8", "Vercel"] },
    ],
    image: "/projects/nutrigoal/logo.jpg",
    liveUrl: "https://nutri-goal-tawny.vercel.app",
    repoUrl: "",
    preview: "lattice",
  },
  {
    id: "project-three",
    featured: false,
    title: "BatoMatic",
    category: "E-commerce and Dispatch",
    description:
      "BatoMatic is a web-based e-commerce and dispatching system designed to streamline the buying and selling of construction aggregates, such as sand, gravel, and crushed stone. It helps manage orders, monitor deliveries, and organize dispatching operations for a more efficient and convenient transaction process.",
    stack: [
      { name: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Google Fonts", "Font Awesome", "Leaflet"] },
      { name: "Backend", items: ["Firebase Hosting", "Supabase", "PostgreSQL", "Row Level Security", "Supabase Edge Functions", "Deno", "PayMongo"] },
      { name: "Auth", items: ["Supabase Auth", "Google Sign-In", "Email OTP", "PKCE"] },
      { name: "Maps", items: ["Leaflet", "OpenStreetMap", "Nominatim"] },
      { name: "Storage", items: ["Supabase Storage", "sessionStorage"] },
      { name: "Payments", items: ["PayMongo", "GCash"] },
      { name: "Tools", items: ["Firebase CLI", "Supabase CLI"] },
    ],
    image: "/projects/batomatic/logo.png",
    imagePlate: "light",
    liveUrl: "https://batomatic-1599f.web.app/",
    repoUrl: "",
    preview: "signal",
  },
  {
    id: "michaela-private-resort",
    featured: false,
    title: "Michaela Private Resort",
    category: "Reservation System",
    description:
      "The Michaela Private Resort Reservation System is a web-based booking system for Michaela Private Resort. Guests can create an account, view the resort and its packages, and book a day tour, an overnight stay, 18-hour swimming, or an event such as a wedding, birthday, or special occasion.",
    stack: [
      { name: "Frontend", items: ["Django Templates", "HTML", "Tailwind CSS", "Material Symbols", "Google Fonts"] },
      { name: "Backend", items: ["Python 3.13", "Django 5.2"] },
      { name: "Database", items: ["SQLite"] },
      { name: "Auth and images", items: ["Django Authentication", "Pillow"] },
    ],
    image: "/projects/michaela/emblem.png",
    imagePlate: "light",
    gallery: [
      "/projects/michaela/ss1.png",
      "/projects/michaela/ss2.png",
      "/projects/michaela/ss3.png",
      "/projects/michaela/ss4.png",
      "/projects/michaela/ss5.png",
      "/projects/michaela/ss6.png",
      "/projects/michaela/ss7.png",
    ],
    liveUrl: "",
    repoUrl: "",
    preview: "signal",
  },
  {
    id: "juanventure",
    featured: false,
    title: "JuanVenture",
    category: "2D Adventure Game",
    description:
      "JuanVenture is a 2D adventure game about Philippine history. The symbol of the country has shattered into three artifacts — the Butuan Ivory Seal, the Talibong Sword, and the Manunggul Jar — scattered across Mindanao, Visayas, and Luzon. You travel the islands, collect coins, and escape mythical guardians like the Minokawa, Manananggal, and Tiktik to recover the artifacts and restore the nation’s story.",
    stack: [
      { name: "Engine", items: ["Godot 4.5"] },
      { name: "Language", items: ["GDScript"] },
      { name: "Graphics", items: ["2D", "Mobile Renderer", "AnimatedSprite2D", "CanvasItem Shader", "PNG", "SVG"] },
      { name: "Physics", items: ["CharacterBody2D", "RigidBody2D", "Area2D"] },
      { name: "UI", items: ["Control", "CanvasLayer"] },
      { name: "Audio", items: ["MP3", "AudioStreamPlayer", "AudioStreamPlayer2D"] },
      { name: "Data", items: ["JSON", "FileAccess (local save slots)"] },
      { name: "Scenes", items: ["Godot Scenes (.tscn)", "SpriteFrames (.tres)"] },
    ],
    image: "/projects/juanventure/logo.png",
    gallery: [
      "/projects/juanventure/ss1.png",
      "/projects/juanventure/ss2.png",
      "/projects/juanventure/ss3.png",
      "/projects/juanventure/ss4.png",
      "/projects/juanventure/ss5.png",
      "/projects/juanventure/ss6.png",
      "/projects/juanventure/certi.jpg",
    ],
    liveUrl: "",
    repoUrl: "",
    preview: "signal",
  },
  {
    id: "pesowise",
    featured: false,
    title: "PesoWise",
    category: "Personal Finance Tracker",
    description:
      "PesoWise is a personal finance tracker for students and young professionals. It records income and expenses in Philippine pesos, tracks monthly budgets and savings goals, and builds reports from the user’s own transactions. Savings amounts are entered manually and are not connected to a bank.",
    stack: [
      { name: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Recharts", "Lucide React"] },
      { name: "Backend", items: ["Node.js", "Express", "Prisma", "Zod", "bcrypt", "Session cookies"] },
      { name: "Database", items: ["PostgreSQL"] },
      { name: "Testing", items: ["Vitest", "Supertest"] },
      { name: "Tools", items: ["Docker Compose", "ESLint", "TypeScript"] },
    ],
    image: "/projects/pesowise/logo.png",
    liveUrl: "https://pesowise-six.vercel.app",
    repoUrl: "",
    preview: "signal",
  },
];

export const timeline = [
  {
    id: "education",
    kind: "Education",
    title: "BS Information Technology",
    detail: "4th-year BSIT student at National University Baliwag.",
  },
  {
    id: "experience",
    kind: "Experience",
    title: "Student developer",
    detail: "Built full-stack systems and a 2D game: InterviewSenseAI, NutriGoal, BatoMatic, PesoWise, the Michaela Private Resort reservation system, and JuanVenture.",
  },
  {
    id: "achievement",
    kind: "Achievement",
    title: "Cybersecurity certificate and PSITE Region 3",
    detail: "Passed the Certiport Information Technology Specialist exam in Cybersecurity. JuanVenture: The Lost Artifact of the Archipelago is listed in the PSITE Region 3 proceedings on page 216.",
    certificates: [
      {
        src: "/certificates/certiport.png",
        title: "Information Technology Specialist in Cybersecurity",
        alt: "Certiport transcript showing Information Technology Specialist in Cybersecurity, passed June 4, 2026",
        verifyUrl: "https://www.credly.com/badges/a81cc73e-5e3e-48ca-b2b4-7c4be7232429/public_url",
      },
      {
        src: "/projects/juanventure/certi.jpg",
        title: "PSITE Region 3, page 216",
        alt: "PSITE Region 3 contents page with JuanVenture highlighted on page 216",
        post: {
          embed: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpsiteregion3%2Fposts%2Fpfbid0ZKTyDR4eYMTMHMtnEfrdbcodd6QKVah8HsCKa9KF8dEU2BXkqmoHLWEhJev4QfG6l&show_text=true&width=500",
          href: "https://www.facebook.com/psiteregion3/posts/pfbid0ZKTyDR4eYMTMHMtnEfrdbcodd6QKVah8HsCKa9KF8dEU2BXkqmoHLWEhJev4QfG6l",
          note: "Our paper is photo 18 in this post.",
        },
      },
    ],
  },
];
