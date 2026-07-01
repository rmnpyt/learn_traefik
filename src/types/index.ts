export interface FlowNodeData {
  label: string;
  type: "entrypoint" | "router" | "middleware" | "service" | "client";
  meta: Record<string, string>;
  status?: "active" | "inactive" | "highlighted";
}

export interface NavItem {
  title: string;
  href?: string;
  icon?: string;
  chapter?: number;
  children?: NavItem[];
  track?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  section: string;
  content: string;
  path: string;
  chapter?: string;
  tags?: string[];
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "config-challenge";
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  options?: string[];
  correctIndex?: number;
  explanation?: string;
  codeContext?: string;
  brokenConfig?: string;
  hints?: string[];
}

export type TrackId = "beginner" | "docker" | "kubernetes" | "security" | "observability" | "production";
