import type { QuizQuestion } from "@/types";

export const quizQuestions: Record<string, QuizQuestion[]> = {
  "01-introduction": [
    {
      id: "intro-1",
      type: "mcq",
      chapter: "01-introduction",
      difficulty: "easy",
      prompt: "What is Traefik primarily used for?",
      options: [
        "A database management system",
        "An application proxy and reverse proxy",
        "A JavaScript framework",
        "A container runtime",
      ],
      correctIndex: 1,
      explanation:
        "Traefik is an open-source Application Proxy that handles routing, load balancing, and service discovery.",
    },
    {
      id: "intro-2",
      type: "mcq",
      chapter: "01-introduction",
      difficulty: "easy",
      prompt: "Which of these is NOT a core concept in Traefik?",
      options: ["EntryPoints", "Routers", "Containers", "Middleware"],
      correctIndex: 2,
      explanation:
        "The four core concepts are EntryPoints, Routers, Services, and Middleware. Containers are a provider concept, not a Traefik core concept.",
    },
  ],
  "02-architecture": [
    {
      id: "arch-1",
      type: "mcq",
      chapter: "02-architecture",
      difficulty: "easy",
      prompt: "What is the correct order of request flow through Traefik?",
      options: [
        "Service → Router → EntryPoint → Middleware",
        "EntryPoint → Router → Middleware → Service",
        "Router → EntryPoint → Service → Middleware",
        "Middleware → EntryPoint → Router → Service",
      ],
      correctIndex: 1,
      explanation:
        "A request flows: EntryPoint (listens for traffic) → Router (matches rules) → Middleware (modifies request) → Service (forwards to backend).",
    },
    {
      id: "arch-2",
      type: "mcq",
      chapter: "02-architecture",
      difficulty: "medium",
      prompt: "What is the role of a Provider in Traefik?",
      options: [
        "It provides TLS certificates",
        "It supplies configuration by watching infrastructure APIs",
        "It provides the web dashboard",
        "It manages the database backend",
      ],
      correctIndex: 1,
      explanation:
        "Providers are infrastructure components (Docker, Kubernetes, Consul, etc.) that Traefik queries to discover routing configuration automatically.",
    },
  ],
  "03-entrypoints": [
    {
      id: "ep-1",
      type: "mcq",
      chapter: "03-entrypoints",
      difficulty: "easy",
      prompt: "Which entrypoint configuration enables HTTP to HTTPS redirection?",
      options: [
        "http.redirections.entryPoint",
        "http.tls.enabled",
        "http3: {}",
        "forwardedHeaders.insecure",
      ],
      correctIndex: 0,
      explanation:
        "The http.redirections.entryPoint config on the web entrypoint redirects all HTTP traffic to HTTPS.",
    },
  ],
  "04-routers": [
    {
      id: "rtr-1",
      type: "mcq",
      chapter: "04-routers",
      difficulty: "easy",
      prompt: "Which matcher would you use to route based on a request header?",
      options: ["Host()", "PathPrefix()", "Header()", "Query()"],
      correctIndex: 2,
      explanation:
        "The Header() matcher matches requests containing a specific header key and value.",
    },
    {
      id: "rtr-2",
      type: "config-challenge",
      chapter: "04-routers",
      difficulty: "medium",
      prompt:
        "Fix this router rule. It should match requests to api.example.com with path prefix /v2, but the syntax is wrong.",
      brokenConfig: `http:
  routers:
    api:
      rule: "Host(api.example.com) && PathPrefix(/v2)"
      service: api-service`,
      hints: [
        "Host values need backtick quotes",
        "Path values also need backtick quotes",
      ],
    },
  ],
  "05-services": [
    {
      id: "svc-1",
      type: "mcq",
      chapter: "05-services",
      difficulty: "medium",
      prompt: "Which load balancing strategy selects two random servers and routes to the one with fewer active connections?",
      options: ["wrr (Weighted Round Robin)", "p2c (Power of Two Choices)", "hrw (Highest Random Weight)", "leasttime"],
      correctIndex: 1,
      explanation:
        "Power of Two Choices (p2c) selects two random servers and routes to the one with fewer active connections for better distribution.",
    },
  ],
  "06-middleware": [
    {
      id: "mw-1",
      type: "mcq",
      chapter: "06-middleware",
      difficulty: "easy",
      prompt: "Which middleware would you use to protect the Traefik dashboard with a username and password?",
      options: ["ForwardAuth", "BasicAuth", "DigestAuth", "IPAllowList"],
      correctIndex: 1,
      explanation: "BasicAuth provides HTTP Basic Authentication, commonly used to secure the Traefik dashboard.",
    },
    {
      id: "mw-2",
      type: "config-challenge",
      chapter: "06-middleware",
      difficulty: "hard",
      prompt: "Add a rate limit middleware that allows 100 requests per minute with a burst of 50, then attach it to the api router.",
      brokenConfig: `http:
  routers:
    api:
      rule: "Host(\`api.example.com\`)"
      service: api-service

  services:
    api-service:
      loadBalancer:
        servers:
          - url: "http://10.0.0.1:8080"`,
      hints: [
        "Define the middleware under http.middlewares",
        "Use rateLimit with average, burst, and period",
        "Attach using the middlewares field on the router",
      ],
    },
  ],
  "07-providers": [
    {
      id: "prov-1",
      type: "mcq",
      chapter: "07-providers",
      difficulty: "easy",
      prompt: "What label must be set to true for Traefik to discover a Docker container when exposedByDefault is false?",
      options: ["traefik.enable", "traefik.allow", "traefik.discover", "traefik.route"],
      correctIndex: 0,
      explanation:
        "When exposedByDefault is false, only containers with traefik.enable=true are discovered by Traefik.",
    },
  ],
  "08-tls-acme": [
    {
      id: "tls-1",
      type: "mcq",
      chapter: "08-tls-acme",
      difficulty: "medium",
      prompt: "Which ACME challenge type is required for wildcard certificates?",
      options: ["HTTP-01", "DNS-01", "TLS-ALPN-01", "All of the above"],
      correctIndex: 1,
      explanation:
        "DNS-01 is required for wildcard certificates because Let's Encrypt validates domain ownership via DNS TXT records.",
    },
  ],
};

export function getQuestionsForChapter(slug: string): QuizQuestion[] {
  return quizQuestions[slug] || [];
}

export function getAllQuestions(): QuizQuestion[] {
  return Object.values(quizQuestions).flat();
}
