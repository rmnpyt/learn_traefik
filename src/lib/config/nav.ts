import { NavItem, TrackId } from "@/types";

export const navData: NavItem[] = [
  {
    title: "Learn",
    icon: "book",
    children: [
      { title: "Introduction", href: "/learn/introduction", chapter: 1 },
      { title: "Architecture", href: "/learn/architecture", chapter: 2 },
      { title: "EntryPoints", href: "/learn/entrypoints", chapter: 3 },
      { title: "Routers & Rules", href: "/learn/routers", chapter: 4 },
      { title: "Services & Load Balancing", href: "/learn/services", chapter: 5 },
      { title: "Middleware", href: "/learn/middleware", chapter: 6 },
      { title: "Providers", href: "/learn/providers", chapter: 7 },
      { title: "TLS & ACME", href: "/learn/tls-acme", chapter: 8 },
      { title: "Observability", href: "/learn/observability", chapter: 9 },
      { title: "API & Dashboard", href: "/learn/api-dashboard", chapter: 10 },
      { title: "TCP & UDP Routing", href: "/learn/tcp-udp", chapter: 11 },
      { title: "Security", href: "/learn/security", chapter: 12 },
      { title: "Plugins", href: "/learn/plugins", chapter: 13 },
      { title: "Ecosystem", href: "/learn/ecosystem", chapter: 14 },
      { title: "Production", href: "/learn/production", chapter: 15 },
    ],
  },
  {
    title: "Reference",
    icon: "bookmark",
    children: [
      { title: "Middleware Catalog", href: "/reference/middleware-catalog" },
      { title: "Rules Cheat Sheet", href: "/reference/rules-cheatsheet" },
      { title: "Docker Labels", href: "/reference/docker-labels" },
      { title: "EntryPoints Reference", href: "/reference/entrypoints" },
    ],
  },
  {
    title: "Playground",
    icon: "play",
    children: [
      { title: "Config Editor", href: "/playground/config-editor" },
      { title: "Compose Generator", href: "/playground/compose-generator" },
      { title: "Quiz Arena", href: "/playground/quiz-arena" },
    ],
  },
];

export const tracks: { id: TrackId; label: string; description: string; chapters: number[] }[] = [
  { id: "beginner", label: "Beginner Track", description: "Start here — learn Traefik from scratch", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 15] },
  { id: "docker", label: "Docker Track", description: "Traefik with Docker and Docker Compose", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 15] },
  { id: "kubernetes", label: "Kubernetes Track", description: "Traefik on Kubernetes with CRDs", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 15] },
  { id: "security", label: "Security Track", description: "TLS, auth middlewares, and security hardening", chapters: [6, 8, 12] },
  { id: "observability", label: "Observability Track", description: "Metrics, tracing, and access logs", chapters: [9, 10] },
  { id: "production", label: "Production Track", description: "HA, deployment, and operations", chapters: [13, 14, 15] },
];
