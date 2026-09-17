/* CreatorHub Mock Initial Data */

const INITIAL_CREATOR = {
  name: "Alex Vance",
  title: "Principal Design Systems Architect & Educator",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
  bio: "Helping designers, developers, and tech founders craft enterprise-grade design systems and production-ready Web apps. 10+ years leading UI teams at top tech scaleups.",
  location: "San Francisco, CA",
  verified: true,
  followersCount: 42800,
  isFollowing: false,
  socials: [
    { name: "YouTube", icon: "youtube", url: "https://youtube.com", handle: "@alexvance_ui" },
    { name: "X (Twitter)", icon: "twitter", url: "https://x.com", handle: "@alexvance_design" },
    { name: "GitHub", icon: "github", url: "https://github.com", handle: "alexvance-dev" },
    { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com", handle: "in/alexvancedesign" }
  ],
  stats: {
    totalSales: 12450,
    rating: 4.9,
    productsCount: 6,
    studentsCount: 8900
  }
};

const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    featured: true,
    title: "Apex Design System 3.0 — Figma & React UI Kit",
    type: "Template",
    category: "Design System",
    price: 129,
    originalPrice: 199,
    discountPercent: 35,
    rating: 4.95,
    reviewCount: 328,
    salesCount: 3840,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Enterprise Figma design system synced with Tailwind CSS and React component library.",
    fullDescription: `Apex Design System 3.0 is built for design leaders and modern front-end engineering teams who need to move fast without compromising on polish.

Includes 2,500+ Figma components with variables, auto-layout 5.0, dark mode tokens, and a matching production-ready React / Tailwind CSS UI library.`,
    features: [
      "2,500+ Figma Components with Auto-Layout 5.0",
      "Full Light & Dark Mode Token System",
      "Production-Ready React & Tailwind Component Code",
      "Accessibility Checked (WCAG AAA Compliant)",
      "Lifetime Updates & Discord Community Access"
    ],
    whatsIncluded: [
      "Figma File (.fig) with full design system",
      "Next.js + Tailwind React Starter Kit repository",
      "Design Token JSON Export for Style Dictionary",
      "Video walkthrough & documentation portal"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Sarah Jenkins",
        role: "Lead UI Designer @ Vercel",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "2 days ago",
        comment: "Saved our engineering team at least 3 months of boilerplate UI work. Tokens match Tailwind perfectly!"
      },
      {
        id: "rev-2",
        author: "David Chen",
        role: "CTO @ SaaSify",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "1 week ago",
        comment: "Extremely clean component structure. The React codebase was effortless to integrate into our Next.js App Router project."
      }
    ],
    faq: [
      { q: "Can I use this for client commercial projects?", a: "Yes! The Commercial License allows unlimited personal and client projects." },
      { q: "How do I get updates?", a: "You'll receive email notifications whenever new components or React updates are released." }
    ]
  },
  {
    id: "prod-2",
    featured: false,
    title: "SaaS OS — Fullstack Next.js 14 & Stripe Starter Kit",
    type: "Code Template",
    category: "Boilerplate",
    price: 149,
    originalPrice: 220,
    discountPercent: 32,
    rating: 4.9,
    reviewCount: 215,
    salesCount: 1920,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Launch your SaaS in 24 hours. Includes Stripe subscriptions, Supabase Auth, Resend emails & Tailwind UI.",
    fullDescription: "Stop wasting weeks configuring auth, billing, and databases. SaaS OS gives you an enterprise-level Next.js codebase built for performance and instant monetization.",
    features: [
      "Next.js 14 App Router + TypeScript",
      "Stripe Customer Portal & Subscription Webhooks",
      "Supabase Auth & PostgreSQL Row Level Security",
      "Resend Transactional Email Templates",
      "AI Prompt Engine & OpenAI Integration Setup"
    ],
    whatsIncluded: [
      "GitHub Repository Access",
      "Deploy-ready Vercel configuration",
      "Stripe Webhook Handler Scripts",
      "Step-by-step Setup Guide PDF"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Marcus Vance",
        role: "Indie Hacker",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "3 days ago",
        comment: "Shipped my micro-SaaS product in 18 hours. Stripe billing worked out of the box."
      }
    ],
    faq: [
      { q: "Does this support multi-tenancy?", a: "Yes, team workspaces and role-based permissions are built in." }
    ]
  },
  {
    id: "prod-3",
    featured: false,
    title: "Design System Masterclass — From Zero to Scale",
    type: "Course",
    category: "Course",
    price: 199,
    originalPrice: 299,
    discountPercent: 33,
    rating: 4.98,
    reviewCount: 412,
    salesCount: 2450,
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Master token architecture, component governance, and cross-platform design systems in 8 modules.",
    fullDescription: "A comprehensive video curriculum for senior product designers and frontend leads looking to architect design systems that scale across iOS, Android, and Web.",
    features: [
      "12+ Hours of High-Definition Video Tutorials",
      "8 Hands-on Design & Code Projects",
      "Downloadable Figma Tokens & Code Snippets",
      "Private Discord Channel Access",
      "Certificate of Completion"
    ],
    whatsIncluded: [
      "42 Video Lessons in 4K",
      "Figma Master Files",
      "Style Dictionary Token Repo",
      "Monthly Live Q&A Group Calls"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Elena Rostova",
        role: "Product Designer @ Spotify",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "2 weeks ago",
        comment: "The token architecture module alone transformed how our design team handoffs to iOS and Web engineers."
      }
    ],
    faq: [
      { q: "How long do I have access?", a: "You get lifetime access to all course materials and future content updates." }
    ]
  },
  {
    id: "prod-4",
    featured: false,
    title: "1-on-1 Design System Audit & Mentorship Call",
    type: "Service",
    category: "Coaching",
    price: 250,
    originalPrice: 350,
    discountPercent: 28,
    rating: 5.0,
    reviewCount: 89,
    salesCount: 310,
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    shortDescription: "60-minute live video call to review your Figma component setup, code tokens, or career growth.",
    fullDescription: "Get direct personalized feedback on your design system architecture, team handoff workflow, or UI engineering practices. Includes pre-call review and follow-up action plan.",
    features: [
      "60-minute 1-on-1 Zoom Session",
      "Pre-call Figma & Code Review",
      "Full Call Video Recording & Transcript",
      "Custom Written Action Plan PDF",
      "7 Days Follow-up Email Support"
    ],
    whatsIncluded: [
      "Calendar Scheduling Link",
      "Design System Checklist PDF",
      "Call Recording Link"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Brian Cox",
        role: "Staff Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "1 month ago",
        comment: "Invaluable 60 minutes. Alex helped us resolve a major design token synchronization bottleneck."
      }
    ],
    faq: [
      { q: "How do I schedule my session?", a: "Immediately after purchase, you will be redirected to Calendly to pick a time slot." }
    ]
  },
  {
    id: "prod-5",
    featured: false,
    title: "The Design Tokens Playbook — Ebook & Guide",
    type: "Ebook",
    category: "Ebook",
    price: 39,
    originalPrice: 59,
    discountPercent: 33,
    rating: 4.88,
    reviewCount: 174,
    salesCount: 1540,
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Actionable guide to naming conventions, W3C standards, and multi-brand token pipelines.",
    fullDescription: "Everything you need to master design tokens in 180 concise, practical pages. Covers W3C spec, Style Dictionary, Figma variables, and automated CI/CD token delivery.",
    features: [
      "180 PDF Pages (EPUB, MOBI & PDF formats)",
      "Real-world Token JSON Architectures",
      "Style Dictionary Build Script Samples",
      "Figma Variable Best Practices Guide"
    ],
    whatsIncluded: [
      "PDF, EPUB, MOBI File Downloads",
      "GitHub Repo with Code Samples"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Jessica Alba",
        role: "UI Architect",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "3 weeks ago",
        comment: "Clear, zero fluff, and extremely practical. Best $39 I've spent this year."
      }
    ],
    faq: [
      { q: "Is this book suitable for beginners?", a: "Yes, it covers fundamental concepts before diving into advanced CI/CD pipelines." }
    ]
  },
  {
    id: "prod-6",
    featured: false,
    title: "Creator Hub Notion Workspace & Growth OS",
    type: "Template",
    category: "Notion",
    price: 49,
    originalPrice: 79,
    discountPercent: 38,
    rating: 4.92,
    reviewCount: 198,
    salesCount: 2390,
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    shortDescription: "All-in-one Notion workspace for content planning, digital product roadmaps, and customer CRM.",
    fullDescription: "Manage your entire digital creator business inside Notion. Includes content calendar, product pipeline, sponsorship tracker, and revenue goal planner.",
    features: [
      "Content Matrix for YouTube, Twitter, Newsletter",
      "Digital Product Launch Template",
      "Customer & Sponsor CRM Database",
      "Financial Revenue Tracker with Formulas"
    ],
    whatsIncluded: [
      "One-click Notion Template Duplicate Link",
      "Video setup tutorial"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1200"
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Tom Hiddleston",
        role: "Creator",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        rating: 5,
        date: "1 month ago",
        comment: "Organized my entire product roadmap and YouTube content calendar instantly."
      }
    ],
    faq: [
      { q: "Do I need a paid Notion account?", a: "No! Works perfectly with free Notion accounts." }
    ]
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Sarah Jenkins",
    email: "sarah.j@vercel.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    totalSpend: 477,
    ordersCount: 3,
    segment: "VIP Customer",
    joinedDate: "2024-01-15",
    productsOwned: ["Apex Design System 3.0", "Design System Masterclass", "Design Tokens Playbook"]
  },
  {
    id: "cust-2",
    name: "David Chen",
    email: "david@saasify.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    totalSpend: 298,
    ordersCount: 2,
    segment: "Repeat Buyer",
    joinedDate: "2024-02-01",
    productsOwned: ["Apex Design System 3.0", "SaaS OS Starter Kit"]
  },
  {
    id: "cust-3",
    name: "Marcus Vance",
    email: "marcus.v@buildfast.dev",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    totalSpend: 149,
    ordersCount: 1,
    segment: "New Customer",
    joinedDate: "2024-03-10",
    productsOwned: ["SaaS OS Starter Kit"]
  },
  {
    id: "cust-4",
    name: "Elena Rostova",
    email: "elena@spotify.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    totalSpend: 449,
    ordersCount: 2,
    segment: "VIP Customer",
    joinedDate: "2023-11-20",
    productsOwned: ["Design System Masterclass", "1-on-1 Audit Session"]
  },
  {
    id: "cust-5",
    name: "Brian Cox",
    email: "brian@techcorp.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    totalSpend: 250,
    ordersCount: 1,
    segment: "Repeat Buyer",
    joinedDate: "2024-02-18",
    productsOwned: ["1-on-1 Audit Session"]
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-9841",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@vercel.com",
    productTitle: "Apex Design System 3.0 — Figma & React UI Kit",
    amount: 129,
    status: "Completed",
    date: "2025-02-24",
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "ORD-9840",
    customerName: "David Chen",
    customerEmail: "david@saasify.io",
    productTitle: "SaaS OS — Fullstack Next.js 14 Starter Kit",
    amount: 149,
    status: "Completed",
    date: "2025-02-23",
    paymentMethod: "Apple Pay"
  },
  {
    id: "ORD-9839",
    customerName: "Marcus Vance",
    customerEmail: "marcus.v@buildfast.dev",
    productTitle: "SaaS OS — Fullstack Next.js 14 Starter Kit",
    amount: 149,
    status: "Completed",
    date: "2025-02-22",
    paymentMethod: "Credit Card (•••• 1088)"
  },
  {
    id: "ORD-9838",
    customerName: "Elena Rostova",
    customerEmail: "elena@spotify.com",
    productTitle: "Design System Masterclass",
    amount: 199,
    status: "Completed",
    date: "2025-02-21",
    paymentMethod: "Credit Card (•••• 9920)"
  },
  {
    id: "ORD-9837",
    customerName: "Brian Cox",
    customerEmail: "brian@techcorp.com",
    productTitle: "1-on-1 Design System Audit",
    amount: 250,
    status: "Completed",
    date: "2025-02-20",
    paymentMethod: "Credit Card (•••• 3311)"
  }
];

const INITIAL_ANALYTICS = {
  totalRevenue: 142850,
  productsSold: 3840,
  totalCustomers: 2890,
  conversionRate: "4.8%",
  totalTraffic: "84.2k",
  revenueChange: "+18.4%",
  salesChange: "+12.1%",
  customersChange: "+24.5%",
  monthlyData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    revenue: [8200, 9500, 11200, 10800, 12500, 14100, 13800, 15200, 14900, 16800, 18200, 21200],
    traffic: [12000, 13500, 15000, 14200, 16800, 18500, 17900, 20100, 19800, 22000, 24500, 28000]
  },
  categoryBreakdown: {
    labels: ["Design Systems", "Boilerplates", "Courses", "Services", "Ebooks", "Notion"],
    data: [42, 24, 18, 8, 5, 3]
  }
};
