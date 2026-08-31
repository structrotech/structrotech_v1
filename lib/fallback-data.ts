export const FALLBACK_CATEGORIES = [
  {
    _id: "cat-ai",
    title: "Artificial Intelligence",
    slug: { current: "ai" },
    image: null,
    description: "Learn artificial intelligence, machine learning, and neural network basics.",
    articleCount: 1,
    tag: "AI",
  },
  {
    _id: "cat-cybersecurity",
    title: "Cybersecurity",
    slug: { current: "cybersecurity" },
    image: null,
    description: "Explore ethical hacking, security protocols, network defense, and system auditing.",
    articleCount: 1,
    tag: "Cybersecurity",
  },
  {
    _id: "cat-linux",
    title: "Linux & Systems",
    slug: { current: "linux" },
    image: null,
    description: "Master the Linux command line, system administration, and shell scripting.",
    articleCount: 1,
    tag: "Tech",
  },
];

export const FALLBACK_TRICKS = [
  {
    _id: "trick-1",
    question: "How to run safe terminal commands?",
    slug: { current: "safe-terminal-commands" },
    category: "Tech",
    featuredOnHome: true,
    homeOrder: 1,
    popular: true,
    publishedAt: "2026-08-30T00:00:00.000Z",
    readTime: 3,
    linkedPost: { slug: { current: "linux-command-line-guide" } },
  },
  {
    _id: "trick-2",
    question: "Secure your home router configuration.",
    slug: { current: "secure-home-router" },
    category: "Cybersecurity",
    featuredOnHome: true,
    homeOrder: 2,
    popular: false,
    publishedAt: "2026-08-28T00:00:00.000Z",
    readTime: 4,
    linkedPost: undefined,
  },
];

export const FALLBACK_POSTS = [
  {
    _id: "post-1",
    title: "Getting Started with Linux Command Line",
    slug: { current: "linux-command-line-guide" },
    coverImage: null,
    excerpt: "An introductory guide for beginners starting out with the Linux bash terminal.",
    publishedAt: "2026-08-29T00:00:00.000Z",
    readTime: 5,
    featured: true,
    category: {
      title: "Linux & Systems",
      slug: { current: "linux" },
    },
    author: {
      name: "StructroTech Staff",
      slug: { current: "staff" },
      avatar: null,
      bio: "Educational guide writers at StructroTech.",
    },
  },
  {
    _id: "post-2",
    title: "AI Basics: Understanding Neural Networks",
    slug: { current: "ai-basics-neural-networks" },
    coverImage: null,
    excerpt: "A simple overview explaining neural networks and deep learning without complex math.",
    publishedAt: "2026-08-27T00:00:00.000Z",
    readTime: 6,
    featured: false,
    category: {
      title: "Artificial Intelligence",
      slug: { current: "ai" },
    },
    author: {
      name: "StructroTech Staff",
      slug: { current: "staff" },
      avatar: null,
      bio: "Educational guide writers at StructroTech.",
    },
  },
];

export const FALLBACK_RESOURCES = [
  {
    _id: "res-1",
    title: "Linux Command Cheat Sheet",
    slug: { current: "linux-cheat-sheet" },
    type: "Cheatsheet",
    image: null,
    description: "A compact PDF guide containing standard terminal commands and keyboard shortcuts.",
    downloadUrl: "#",
  },
  {
    _id: "res-2",
    title: "Cybersecurity Self-Study Roadmap",
    slug: { current: "security-roadmap" },
    type: "Roadmap",
    image: null,
    description: "Step-by-step roadmap outlining the certs and concepts to study for entry-level security.",
    downloadUrl: "#",
  },
];
