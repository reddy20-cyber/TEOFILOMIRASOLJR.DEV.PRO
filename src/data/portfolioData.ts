export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}

export interface EmailContact {
  email: string;
  label: string;
  isPrimary?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'professional' | 'academic' | 'seminar' | 'all';
  image: string;
  pdfUrl?: string;
  certId?: string;
  description: string;
  signatories?: string[];
  skillsLearned?: string[];
}

export interface BadgeItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: 'cisco' | 'academic' | 'community';
  description: string;
  verifyUrl?: string;
  accentColor?: string;
  isPlaceholder?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Microservices & Backend' | 'Civic Tech' | 'Academic Innovation';
  description: string;
  impact: string[];
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  architectureDetails?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  division?: string;
  location: string;
  period: string;
  hoursCompleted?: number;
  type: string;
  summary: string;
  bulletPoints: string[];
  technologies: string[];
  certificateUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  honors?: string[];
  details: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Intermediate' | 'Familiar';
    icon?: string;
    details?: string;
  }[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
  aspect: string;
  tags: string[];
}

export const portfolioData = {
  personal: {
    name: "Teofilo Bullos Mirasol Jr.",
    nickname: "Teo",
    role: "Full-Stack Software Developer & Technical Writer",
    subtitle: "Civic Tech Enthusiast | Microservices & Database Architect | 4th-Year BSIT Student",
    bio: "I am a 4th-year Bachelor of Science in Information Technology student at South East Asian Institute of Technology, Inc. (SEAIT) in Tampakan, South Cotabato, Philippines. Having completed an extensive 486-hour software engineering and technical writing residency at the Department of Science and Technology (DOST XII), I specialize in building secure microservices architectures, relational database pipelines (PostgreSQL, MySQL), and intuitive modern web applications with a passionate focus on civic technology that serves community and public institutions.",
    location: "Tampakan, South Cotabato, Philippines",
    availability: "Available for Freelance & Independent Client Projects",
    statusBadge: "Available for Hire",
    freelanceDisclaimer: "I am currently completing my final 4th-year undergraduate load (with only one weekend class), allowing full weekday availability for independent client systems development. As an undergraduate, all client work is conducted honestly and professionally on a freelance / independent contract basis while my official commercial business registration is in pipeline post-graduation.",
    civicTechFocus: "Driven by the belief that digital systems should empower public governance, community transparency, and educational accessibility.",
    resumePdf: "/assets/docs/CV_RESUME_MIRASOL_TEOFILO_JR.pdf",
    applicationLetterPdf: "/assets/docs/Application_Letter_NLRC_IT_Assistant_Teofilo_Mirasol.pdf",
    phone: "+63 905 643 6724",
    phoneFormatted: "0905 643 6724",
  },

  contacts: [
    {
      email: "teofilomirasoljr.dost@gmail.com",
      label: "DOST & Professional Inquiries",
      isPrimary: true,
    },
    {
      email: "teo.works.dev@gmail.com",
      label: "Development & Freelance Work",
      isPrimary: false,
    },
    {
      email: "reddevcm3era@gmail.com",
      label: "Direct & Collaborative Outreach",
      isPrimary: false,
    },
  ] as EmailContact[],

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/reddy20-cyber",
      icon: "Github",
      label: "reddy20-cyber",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/teofilo-mirasol",
      icon: "Linkedin",
      label: "teofilo-mirasol",
    },
    {
      name: "Portfolio Mirror",
      url: "https://red-portfolio-ten.vercel.app",
      icon: "Globe",
      label: "red-portfolio-ten.vercel.app",
    },
  ] as SocialLink[],

  stats: [
    { label: "OJT Engineering Hours", value: "486+", note: "DOST SOCCSKSARGEN" },
    { label: "Enterprise Microservices", value: "5+", note: "Auth, Geo-Data, Chat, EIS" },
    { label: "Cisco Certifications", value: "3", note: "Verified Credly Badges" },
    { label: "Awards & Recognitions", value: "5+", note: "Hackathons & Academics" },
  ],

  profileImages: {
    heroAvatar: "/assets/profile/formal-headshot.webp",
    heroAvatarFallback: "/assets/profile/formal-headshot.png",
    casualAbout: "/assets/profile/casual-portrait-flowers.webp",
    barongPodium: "/assets/profile/barong-podium-fullbody.webp",
    barongPnhrs: "/assets/profile/barong-pnhrs-stage.webp",
    photographer: "/assets/gallery/photographer-editor.webp",
    hardwareTroubleshooting: "/assets/gallery/dost-hardware-troubleshooting.webp",
    posterCreative: "/assets/gallery/escape-the-ordinary-nature.webp",
  },

  skillsCategories: [
    {
      category: "Languages & Core",
      description: "Robust typed scripting, system languages, and database querying",
      skills: [
        { name: "TypeScript", level: "Advanced", details: "Type safety, generics, modern ESM" },
        { name: "JavaScript (ES6+)", level: "Advanced", details: "Async/await, DOM, event loops" },
        { name: "Python", level: "Intermediate", details: "Automation scripts, data pipelines, AI API integration" },
        { name: "PHP", level: "Intermediate", details: "Server-side rendering, legacy integrations" },
        { name: "SQL", level: "Advanced", details: "Complex joins, indexing, query optimization" },
        { name: "HTML5 / Semantic Web", level: "Advanced", details: "SEO, accessibility, responsive structure" },
        { name: "CSS3 / Modern Styling", level: "Advanced", details: "Flexbox, Grid, custom animations" },
      ],
    },
    {
      category: "Backend & Microservices",
      description: "Scalable distributed service architectures and resilient APIs",
      skills: [
        { name: "Node.js", level: "Advanced", details: "Event-driven runtime, streams, server performance" },
        { name: "Express.js", level: "Advanced", details: "RESTful architecture, custom middleware, rate-limiting" },
        { name: "Microservices Architecture", level: "Advanced", details: "Inter-service RPC, separation of concerns, routing" },
        { name: "RESTful API Engineering", level: "Advanced", details: "Standardized response models, security headers, versioning" },
        { name: "Database Migrations", level: "Advanced", details: "Automated schema sync, seeders, rollback safety" },
        { name: "Audit Logging & Auth", level: "Intermediate", details: "Role-based access control (RBAC), JWT, secure sessions" },
      ],
    },
    {
      category: "Databases & Storage",
      description: "Relational modeling, high-throughput caching, and object storage",
      skills: [
        { name: "PostgreSQL", level: "Advanced", details: "Relational integrity, custom triggers, JSONB, pgAdmin" },
        { name: "MySQL", level: "Advanced", details: "High-performance querying, relational schema design" },
        { name: "MinIO", level: "Intermediate", details: "S3-compatible distributed object storage for private media" },
        { name: "Memcached", level: "Intermediate", details: "In-memory caching for accelerated microservice queries" },
        { name: "Supabase", level: "Intermediate", details: "Postgres BaaS, real-time channels, Row-Level Security" },
      ],
    },
    {
      category: "Containers, Infra & DevOps",
      description: "Production containerization, message queues, and infrastructure tools",
      skills: [
        { name: "Podman", level: "Intermediate", details: "Rootless container orchestration and daemonless pods" },
        { name: "Docker & Docker Compose", level: "Advanced", details: "Multi-container local testing, volumes, bridge networks" },
        { name: "Apache Kafka", level: "Intermediate", details: "Event streaming and distributed pub-sub messaging" },
        { name: "Apache ZooKeeper", level: "Intermediate", details: "Distributed coordination and service leader election" },
        { name: "Postfix", level: "Intermediate", details: "Mail transfer agent (MTA) configuration for system alerts" },
        { name: "Git & GitHub", level: "Advanced", details: "Branching workflows, version control, PR reviews" },
      ],
    },
    {
      category: "Frontend & Frameworks",
      description: "Interactive reactive user interfaces and design systems",
      skills: [
        { name: "React.js", level: "Advanced", details: "Custom hooks, Context API, state management, memoization" },
        { name: "Vue.js", level: "Intermediate", details: "Reactivity system, Single File Components (SFC)" },
        { name: "Tailwind CSS", level: "Advanced", details: "Utility-first design, dark mode, responsive themes" },
        { name: "Bootstrap 5", level: "Advanced", details: "Grid architecture, modal components, utility classes" },
        { name: "Three.js / 3D Canvas", level: "Intermediate", details: "Interactive 3D geometry, particle systems, camera math" },
        { name: "Framer Motion", level: "Advanced", details: "Scroll-triggered reveals, spring physics, layout animations" },
      ],
    },
    {
      category: "Cross-Platform & Mobile",
      description: "Delivering unified multi-platform native experiences from web apps",
      skills: [
        { name: "Electron", level: "Intermediate", details: "Packaging web apps into cross-platform desktop applications" },
        { name: "Web-to-Mobile Frameworks", level: "Intermediate", details: "Packaging responsive web applications for iOS and Android" },
        { name: "Progressive Web Apps (PWA)", level: "Advanced", details: "Service workers, offline caching, app manifest" },
      ],
    },
    {
      category: "AI Integration & Analytics",
      description: "Integrating intelligent reasoning and predictive flows into apps",
      skills: [
        { name: "Chatbot Systems", level: "Intermediate", details: "Conversational user assistants and prompt engineering" },
        { name: "Recommendation Engines", level: "Intermediate", details: "Rule-based and similarity recommendation algorithms" },
        { name: "Feedback & Sentiment Analytics", level: "Intermediate", details: "Text parsing, user sentiment evaluation, feedback metrics" },
        { name: "AI-Assisted Development", level: "Advanced", details: "Rapid prototype modeling, automated unit testing, debugging" },
      ],
    },
    {
      category: "Documentation & Technical Writing",
      description: "Bridging the gap between engineering complexity and clear communication",
      skills: [
        { name: "System Manuals & Architecture Docs", level: "Advanced", details: "Authoring comprehensive SOPs, user manuals, and API specs" },
        { name: "Research & Technical Investigation", level: "Advanced", details: "Root-cause bottleneck analysis and technology trade-off studies" },
        { name: "Digital Records & Audit Logs", level: "Advanced", details: "Log verification, integrity monitoring, administrative filing" },
      ],
    },
  ] as SkillCategory[],

  experience: [
    {
      id: "dost-ojt-2026",
      role: "Software Developer & Technical Writer (On-the-Job Training)",
      organization: "Department of Science and Technology (DOST) - Region XII",
      division: "SOCCSKSARGEN Regional Office / Philippine National Halal Laboratory and Science Center",
      location: "Brgy. Paraiso, Koronadal City, South Cotabato",
      period: "July 6, 2026 – October 7, 2026",
      hoursCompleted: 486,
      type: "Government Tech Residency / OJT",
      summary: "Completed an intensive 486-hour software engineering and technical writing residency within DOST Region XII, maintaining core enterprise microservices, executing database migrations, and authoring institutional standard operating procedures.",
      bulletPoints: [
        "Conducted research and investigative analysis on system performance bottlenecks to recommend and implement innovative architectural solutions.",
        "Authored comprehensive technical documentation, system manuals, API specifications, and standard operating procedures (SOPs) to streamline cross-team communication and ensure accurate record-keeping.",
        "Provided operational and technical support across internal workflows, auditing digital logs, assisting administrative teams in meeting milestones, and documenting project progress.",
        "Developed, maintained, and debugged backend services in a distributed Microservices ecosystem, ensuring reliable inter-service communication and system uptime.",
        "Executed database schema migrations, automated data cleanup scripts, and managed relational schemas, asset data verification, and query performance with PostgreSQL and Node.js.",
        "Containerized backend services and PostgreSQL instances using Docker & Docker Compose for seamless multi-service local testing.",
      ],
      technologies: ["Node.js", "Express.js", "PostgreSQL", "Docker", "Docker Compose", "pgAdmin", "REST APIs", "Git", "Technical Writing"],
      certificateUrl: "/assets/certificates/cert-dost-ojt-completion.webp",
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "dost-govchat",
      title: "DOST GOVCHAT",
      subtitle: "Secure Government Communication & Notification Platform",
      category: "Full-Stack",
      featured: true,
      description: "An enterprise-grade internal agency messaging and real-time collaboration application built for DOST. Connects a modern responsive React frontend with a dedicated microservice backend (DX_GovChat_Backend), enforcing end-to-end data privacy, role-based authorization, and real-time notification dispatch.",
      impact: [
        "Researched and integrated modern encryption and authorization workflows to deliver an innovative, secure agency communication platform.",
        "Engineered secure user authentication, role-based authorization (RBAC), and real-time chat/notification functionality while strictly enforcing data privacy.",
        "Designed automated database migration pipelines, seeding logic, and database cleanup scripts in PostgreSQL.",
        "Containerized with Docker Compose for rapid on-premise government deployment.",
      ],
      tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Docker", "REST APIs", "pgAdmin", "Civic Tech"],
      image: "/assets/gallery/dost-hardware-troubleshooting.webp",
      architectureDetails: "Distributed React frontend communicating with microservice container over authenticated REST & WebSockets, backed by schema-migrated PostgreSQL with data auditing.",
    },
    {
      id: "dost-eis",
      title: "DOST Enterprise Information System (EIS)",
      subtitle: "Multi-Service Backend Suite & Diagnostic Engineering",
      category: "Microservices & Backend",
      featured: true,
      description: "Core backend architecture supporting administrative management and project portfolio tracking across DOST. Managed and stabilized five distributed microservices: User Profile Management, Authorization, Strategic Planning, Geo-Data, and FileService.",
      impact: [
        "Researched cross-service data flow patterns to identify systemic bottlenecks and engineered innovative bug fixes for complex cross-service issues.",
        "Diagnosed and resolved critical system bugs, including cross-origin (CORS) bottlenecks, route conflict bottlenecks, and query sorting/filtering algorithms.",
        "Implemented new backend endpoints for organizational management and project portfolio tracking.",
        "Maintained high reliability across distributed databases with zero data loss during migrations.",
      ],
      tags: ["Node.js", "Express.js", "PostgreSQL", "Microservices", "Docker", "RESTful Architecture", "CORS Debugging"],
      image: "/assets/profile/barong-podium-fullbody.webp",
      architectureDetails: "Independent microservices partitioned by domain boundary (Auth, Geo-Data, User Profile, Strategic Planning, FileService) with centralized API gateway.",
    },
    {
      id: "seait-modyul-qr",
      title: "SEAIT Modyul-QR Code Research Platform",
      subtitle: "Award-Winning Digital Educational Resource Dissemination",
      category: "Academic Innovation",
      featured: true,
      description: "An academic innovation recognized by the Filipino Department of South East Asian Institute of Technology, Inc. Designed an interactive digital module linked via dynamic QR codes, bridging printed academic research materials with digital mobile resources for GEE 2 students.",
      impact: [
        "Awarded 'Sertipiko ng Pagkilala - Modyul-QR Code Base' for outstanding technical implementation.",
        "Awarded 'Pinakamagandang Gawa na QR Code' in GEE 2 (Pagbasa at Pagsulat tungo sa Pananaliksik).",
        "Streamlined mobile access to educational materials for hundreds of students across South Cotabato.",
      ],
      tags: ["QR Integration", "Web Systems", "Mobile Responsive", "Educational Tech", "SEAIT"],
      image: "/assets/certificates/cert-best-qr-code-gee2-2026.webp",
      architectureDetails: "Optimized mobile web landing pages tied to dynamically routable QR codes with usage analytics.",
    },
    {
      id: "civic-infra-podman",
      title: "Resilient Civic Tech Infrastructure Stack",
      subtitle: "Containerized Microservices with Podman, Kafka & MinIO",
      category: "Civic Tech",
      featured: false,
      description: "A reproducible, high-performance infrastructure blueprint designed for civic technology and municipal services. Uses rootless Podman containers, Apache Kafka & ZooKeeper event queues, MinIO private object storage, Memcached query caching, and Postfix system mailers.",
      impact: [
        "Eliminates vendor lock-in for local government units and non-profits through open-source components.",
        "Provides asynchronous event processing with Kafka and sub-millisecond query caches with Memcached.",
        "Self-hosted S3-compatible file storage with MinIO for municipal document archives.",
      ],
      tags: ["Podman", "Kafka", "ZooKeeper", "MinIO", "Memcached", "Postfix", "PostgreSQL"],
      image: "/assets/gallery/photographer-editor.webp",
      architectureDetails: "Daemonless rootless Podman pods orchestrating event-driven microservices with distributed queuing and persistent object storage.",
    },
    {
      id: "cross-platform-apps",
      title: "Cross-Platform Web-to-Mobile & Desktop Systems",
      subtitle: "Electron Desktop Clients & Multi-Platform Web Wrappers",
      category: "Full-Stack",
      featured: false,
      description: "Framework-driven application engineering translating modern responsive web systems into native desktop binaries (Electron) and multi-platform mobile wrappers for iOS and Android.",
      impact: [
        "Enables one codebase to deploy across Web, Windows desktop, Android, and iOS.",
        "Integrates local filesystem caching and offline synchronization.",
      ],
      tags: ["Electron", "React.js", "Node.js", "iOS/Android Web-Wrappers", "Cross-Platform"],
      image: "/assets/profile/casual-portrait-flowers.webp",
    },
  ] as ProjectItem[],

  certificates: [
    {
      id: "hackathon-2026",
      title: "2nd Runner Up - Problem Analysis and Solution Making",
      issuer: "Students of Information Technology Assembly (SITA) & College of ICT, SEAIT",
      date: "February 7, 2026",
      category: "academic",
      image: "/assets/certificates/cert-hackathon-2026.webp",
      description: "Awarded for outstanding analytical thinking, technical competence, and collaborative problem-solving during Hackathon 2026 themed 'Survival of the Unclassified: Building Tech in a Divided Society.'",
      signatories: ["Kathleen Nicole D. Oliva (SITA President)", "Kenmark Deelis (SITA Moderator)"],
      skillsLearned: ["Rapid Solution Prototyping", "Problem Analysis", "Team Architecture", "Civic Problem Solving"],
    },
    {
      id: "dost-ojt-completion",
      title: "Certificate of Completion - 486 Hours OJT Program",
      issuer: "Department of Science and Technology (DOST) - Region XII (SOCCSKSARGEN)",
      date: "October 7, 2026",
      category: "professional",
      image: "/assets/certificates/cert-dost-ojt-completion.webp",
      description: "Official completion of 486 hours on-the-job training program as Software Developer and Technical Writer at DOST Regional Office XII, Koronadal City.",
      signatories: ["Engr. Sammy P. Malawan (Regional Director, DOST XII)"],
      skillsLearned: ["Enterprise Microservices", "PostgreSQL Administration", "Technical Writing & Manuals", "Docker"],
    },
    {
      id: "cisco-it-support",
      title: "IT Customer Support Basics Certificate",
      issuer: "Cisco Networking Academy",
      date: "October 16, 2026",
      category: "professional",
      image: "/assets/certificates/cert-cisco-it-support-basics.webp",
      pdfUrl: "/assets/docs/IT_Customer_Support_Basics_certificate_Teofilo_Mirasol_Jr.pdf",
      certId: "cf47f3a5-d7d0-4b9d-90cd-db815f25df3b",
      description: "Accredited verification of core competencies in IT customer support workflows, troubleshooting methodologies, ticket handling, and diagnostic customer communication.",
      signatories: ["Lynn Bloomer (Director, Cisco Networking Academy)"],
      skillsLearned: ["Technical Support Protocols", "Root-Cause Diagnostics", "Customer Communication", "ITIL Fundamentals"],
    },
    {
      id: "cisco-os-support",
      title: "Operating Systems Support Certificate",
      issuer: "Cisco Networking Academy",
      date: "October 17, 2026",
      category: "professional",
      image: "/assets/certificates/cert-cisco-os-support.webp",
      pdfUrl: "/assets/docs/Operating_Systems_Support_certificate_Teofilo_Mirasol_Jr.pdf",
      certId: "bf2fcdf1-d05c-4fd1-9ad6-82d5d86d5fc7",
      description: "Mastery of enterprise operating systems administration, file system management, process control, system security permissions, and command-line automation.",
      signatories: ["Lynn Bloomer (Director, Cisco Networking Academy)"],
      skillsLearned: ["OS Architecture", "Process Management", "File Permissions", "System Recovery"],
    },
    {
      id: "cisco-security-connectivity",
      title: "Security and Connectivity Support Certificate",
      issuer: "Cisco Networking Academy",
      date: "October 18, 2026",
      category: "professional",
      image: "/assets/certificates/cert-cisco-security-connectivity.webp",
      pdfUrl: "/assets/docs/Security_and_Connectivity_Support_certificate_Teofilo_Mirasol_Jr.pdf",
      certId: "450127f3-2646-4aa0-8b7b-9ea1bdd3fdef",
      description: "Specialized training in network connectivity diagnostics, secure socket protocols, IP routing, packet inspection, firewall configuration, and threat mitigation.",
      signatories: ["Lynn Bloomer (Director, Cisco Networking Academy)"],
      skillsLearned: ["Network Connectivity", "Endpoint Security", "Firewall Rules", "TCP/IP Troubleshooting"],
    },
    {
      id: "best-editor-2026",
      title: "Best Editor of the Year (Certificate of Appreciation)",
      issuer: "South East Asian Institute of Technology, Inc. (SEAIT)",
      date: "April 2026",
      category: "academic",
      image: "/assets/certificates/cert-best-editor-2026.webp",
      description: "Conferred in recognition of outstanding skill, creativity, attention to detail, and dedication to excellence in multimedia editorial and technical writing.",
      signatories: ["Angel May B. Taño, LPT (Course Instructor)", "Rodolfo Juanillo, Ed.D (Program Head - Filipino)"],
      skillsLearned: ["Technical Editing", "Content Curation", "Precision Communication", "Publishing Quality"],
    },
    {
      id: "best-qr-code-gee2-2026",
      title: "Sertipiko ng Tagumpay - Pinakamagandang Gawa na QR Code",
      issuer: "SEAIT Filipino Department (GEE 2)",
      date: "2026",
      category: "academic",
      image: "/assets/certificates/cert-best-qr-code-gee2-2026.webp",
      description: "Selected as the highest-rated QR Code implementation in GEE 2 (Pagbasa at Pagsulat tungo sa Pananaliksik) for technical elegance and research accessibility.",
      signatories: ["Rodolfo D. Juanillo, Ed.D (Pinuno ng Programang Filipino)", "Angel May B. Taño, LPT (Instruktor)"],
      skillsLearned: ["Digital Publishing", "QR Code Architecture", "Research Access Optimization"],
    },
    {
      id: "qr-module-seait-2026",
      title: "Sertipiko ng Pagkilala - Modyul-QR Code Base",
      issuer: "Dalubhasaan ng South East Asian Institute of Technology, Inc.",
      date: "March 2026",
      category: "academic",
      image: "/assets/certificates/cert-qr-code-modyul-seait-2026.webp",
      description: "Recognized for valuable contribution, dedication, and exemplary performance in the creation of the Modyul-QR Code base for academic research dissemination.",
      signatories: ["Angel May B. Taño, LPT (Instruktor)", "Rodolfo D. Juanillo, Ed.D (Pinuno ng Programang Filipino)"],
      skillsLearned: ["Educational System Design", "Interactive Mobile Modules"],
    },
    {
      id: "pnhrs-appearance-days",
      title: "Certificate of Appearance - 19th PNHRS Week (Days 1, 2 & 3)",
      issuer: "DOST-PCHRD & Health Research and Development Consortium XII",
      date: "August 11–13, 2026",
      category: "seminar",
      image: "/assets/certificates/cert-pnhrs-appearance-day1.webp",
      description: "Official delegate appearance during the 19th Philippine National Health Research System (PNHRS) Week Celebration held in City of Koronadal, South Cotabato.",
      signatories: ["Normina P. Pahm (Assistant Regional Director, DOST XII)"],
      skillsLearned: ["Health Research Technologies", "Inter-Agency Networking", "National Innovation Symposia"],
    },
    {
      id: "lampitak-best-booth-2023",
      title: "1st Place - Best Booth (Tastety Cheesedog Roll & Creamelon)",
      issuer: "Lampitak National High School, Tampakan",
      date: "January 20, 2023",
      category: "academic",
      image: "/assets/certificates/cert-best-booth-lampitak-2023.webp",
      description: "Awarded 1st Place for best commercial exhibition booth design, customer engagement, and product presentation during the 1st Senior High School Entrepreneurship Exhibit.",
      signatories: ["Daveson B. Erebaren, T-1 (Subject Teacher)", "Jane M. Bañaga, PI (School Head)"],
      skillsLearned: ["Project Exhibition", "Product Marketing", "Presentation Design"],
    },
    {
      id: "lampitak-entrepreneurship-2023",
      title: "Certificate of Completion - SHS Entrepreneurship Exhibit",
      issuer: "Lampitak National High School, Tampakan",
      date: "January 26, 2023",
      category: "academic",
      image: "/assets/certificates/cert-entrepreneurship-exhibit-completion-2023.webp",
      description: "Completion of the intensive 2-week Senior High School Entrepreneurship Exhibit themed 'Connecting Minds for Innovation Through Entrepreneurship.'",
      signatories: ["Daveson B. Erebaren, T-1 (Subject Teacher)", "Jane M. Bañaga, PI (School Head)"],
      skillsLearned: ["Business Innovation", "Financial Planning", "Operational Execution"],
    },
    {
      id: "idadait-tampakan-2023",
      title: "Certificate of Participation - IDADAIT 2023",
      issuer: "Municipality of Tampakan, Province of South Cotabato",
      date: "June 26, 2023",
      category: "seminar",
      image: "/assets/certificates/cert-idadait-participation-2023.webp",
      description: "Civic participation in the lecture series on youth advocacy, community safety (BIDA Program, BKD, KKDAT), and civic leadership.",
      signatories: ["Leonard T. Escobillo, RN (Municipal Mayor / MADAC Chairperson)"],
      skillsLearned: ["Civic Leadership", "Community Advocacy", "Public Safety Engagement"],
    },
  ] as CertificateItem[],

  badges: [
    {
      id: "badge-cisco-it-support",
      title: "IT Customer Support Basics",
      issuer: "Cisco Networking Academy",
      date: "October 16, 2026",
      image: "/assets/badges/cisco-it-support-basics.webp",
      category: "cisco",
      accentColor: "#0891b2",
      description: "Demonstrates verified competence in identifying client technical issues, remote hardware diagnostics, customer service ethics, and operating system recovery procedures.",
      verifyUrl: "/assets/docs/ITCustomerSupportBasicsv120261018-20-zuefyf.pdf",
    },
    {
      id: "badge-cisco-os-support",
      title: "Operating Systems Support",
      issuer: "Cisco Networking Academy",
      date: "October 17, 2026",
      image: "/assets/badges/cisco-os-support.webp",
      category: "cisco",
      accentColor: "#10b981",
      description: "Recognizes mastery of operating system internals, driver configurations, CLI automation, disk partitioning, security policies, and performance tuning.",
      verifyUrl: "/assets/docs/OperatingSystemsSupportv120261018-20-5n0rbv.pdf",
    },
    {
      id: "badge-cisco-security-connectivity",
      title: "Security and Connectivity Support",
      issuer: "Cisco Networking Academy",
      date: "October 18, 2026",
      image: "/assets/badges/cisco-security-connectivity.webp",
      category: "cisco",
      accentColor: "#6366f1",
      description: "Validates proficiency in securing network connections, assessing protocol vulnerabilities, configuring secure Wi-Fi and VPN endpoints, and preventing packet loss.",
      verifyUrl: "/assets/docs/SecurityandConnectivitySupportv120261018-20-zbgv9u.pdf",
    },
    {
      id: "badge-hackathon-runnerup",
      title: "Hackathon 2026: 2nd Runner Up",
      issuer: "SEAIT College of ICT / SITA",
      date: "February 7, 2026",
      image: "/assets/certificates/cert-hackathon-2026.webp",
      category: "academic",
      accentColor: "#f59e0b",
      description: "Awarded in competitive hackathon for rapid problem analysis, backend system architecture, and solution prototyping under strict time constraints.",
    },
    {
      id: "badge-best-editor",
      title: "Best Editor of the Year",
      issuer: "SEAIT",
      date: "April 2026",
      image: "/assets/certificates/cert-best-editor-2026.webp",
      category: "academic",
      accentColor: "#ec4899",
      description: "Conferred for exemplary technical writing, system manual clarity, and publishing perfection across academic and technical publications.",
    },
    {
      id: "badge-talong-community",
      title: "Talong Community Champion Badge",
      issuer: "Civic / Developer Community",
      date: "2026",
      image: "/assets/badges/cisco-security-connectivity.webp", // placeholder fallback
      category: "community",
      accentColor: "#8b5cf6",
      isPlaceholder: true,
      description: "[PLACEHOLDER]: Dedicated badge slot reserved for Teofilo's 'Talong' series badges or community gamified honors. Drop the graphic into /public/assets/badges/ to replace this placeholder.",
    },
  ] as BadgeItem[],

  education: [
    {
      id: "seait-bsit",
      degree: "Bachelor of Science in Information Technology (BSIT)",
      institution: "South East Asian Institute of Technology, Inc. (SEAIT)",
      location: "Tampakan / Tupi, South Cotabato, Philippines",
      period: "2023 – Present (Expected Graduation: May / June 2027)",
      status: "4th-Year Undergraduate (Only 1 Sunday class remaining)",
      honors: ["Hackathon 2nd Runner Up (2026)", "Best Editor of the Year (2026)", "Best QR Code Innovation (2026)"],
      details: "Comprehensive curriculum focusing on enterprise system analysis, relational database engineering, software development life cycles, and network infrastructure.",
    },
    {
      id: "lampitak-shs",
      degree: "Senior High School (SHS) - Academic Track",
      institution: "Lampitak National High School",
      location: "Brgy. Lampitak, Tampakan, South Cotabato",
      period: "Completed 2023",
      status: "Graduate",
      honors: ["1st Place Best Booth - Entrepreneurship Exhibit 2023"],
      details: "Developed foundational skills in applied research, business ideation, team coordination, and entrepreneurship project presentation.",
    },
  ] as EducationItem[],

  gallery: [
    {
      id: "gal-1",
      title: "Professional Portrait",
      caption: "Formal studio portrait in dark suit and tie, representing software engineering and professional consulting.",
      image: "/assets/profile/formal-headshot.webp",
      aspect: "aspect-square",
      tags: ["Formal", "Profile", "Developer"],
    },
    {
      id: "gal-2",
      title: "DOST Hardware & Lab Engineering",
      caption: "Hands-on workstation assembly, cable management, and hardware troubleshooting with colleagues at DOST.",
      image: "/assets/gallery/dost-hardware-troubleshooting.webp",
      aspect: "aspect-[3/4]",
      tags: ["DOST OJT", "Hardware", "Support"],
    },
    {
      id: "gal-3",
      title: "19th PNHRS National Conference",
      caption: "Teofilo in traditional Filipino modern barong representing research collaboration at the 19th PNHRS Week.",
      image: "/assets/profile/barong-pnhrs-stage.webp",
      aspect: "aspect-[3/4]",
      tags: ["Conference", "DOST XII", "PNHRS"],
    },
    {
      id: "gal-4",
      title: "Creative Direction & Editing",
      caption: "Action shot with professional DSLR camera reflecting work as Best Editor of the Year and multimedia producer.",
      image: "/assets/gallery/photographer-editor.webp",
      aspect: "aspect-[3/4]",
      tags: ["Photography", "Media", "Editor"],
    },
    {
      id: "gal-5",
      title: "Executive Keynote & Presentation",
      caption: "Full-body portrait in barong at the presentation lectern, demonstrating leadership and communication skills.",
      image: "/assets/profile/barong-podium-fullbody.webp",
      aspect: "aspect-[9/16]",
      tags: ["Presentation", "Leadership", "Barong"],
    },
    {
      id: "gal-6",
      title: "Casual & Lifestyle Portrait",
      caption: "Relaxed portrait in cream casual attire against minimalist architecture.",
      image: "/assets/profile/casual-portrait-flowers.webp",
      aspect: "aspect-square",
      tags: ["Casual", "Lifestyle", "Portrait"],
    },
    {
      id: "gal-7",
      title: "Creative Poster Design - Escape The Ordinary",
      caption: "Graphic design composition blending nature exploration photography with modern typographic layout.",
      image: "/assets/gallery/escape-the-ordinary-nature.webp",
      aspect: "aspect-[9/16]",
      tags: ["Graphic Design", "Typography", "Editorial"],
    },
  ] as GalleryPhoto[],

  privacyNotes: {
    notice: "All personal certificates and credentials displayed have been verified. Sensitive personal data (such as internal employee numbers and official state signatures) are presented strictly for portfolio verification purposes.",
  },
};
