export interface TraefikConfig {
  entryPoints: EntryPoint[];
  routers: Router[];
  middlewares: Middleware[];
  services: Service[];
}

export interface EntryPoint {
  name: string;
  port: number;
  protocol?: "TCP" | "UDP";
  http3?: boolean;
  tls?: boolean;
}

export interface Router {
  name: string;
  rule: string;
  entryPoints: string[];
  middlewares: string[];
  service: string;
  priority?: number;
  tls?: RouterTLS;
}

export interface RouterTLS {
  certResolver?: string;
  options?: string;
  passthrough?: boolean;
}

export interface Middleware {
  name: string;
  type: string;
  config?: Record<string, unknown>;
}

export interface Service {
  name: string;
  strategy?: "wrr" | "p2c" | "hrw" | "leasttime";
  servers: string[];
  sticky?: StickyConfig;
  healthCheck?: HealthCheckConfig;
}

export interface StickyConfig {
  cookie?: {
    name?: string;
    secure?: boolean;
    httpOnly?: boolean;
  };
}

export interface HealthCheckConfig {
  path?: string;
  interval?: string;
  timeout?: string;
}

export interface FlowNodeData {
  label: string;
  type: "entrypoint" | "router" | "middleware" | "service" | "client";
  meta?: Record<string, string>;
  config?: EntryPoint | Router | Middleware | Service;
  [key: string]: unknown;
}
