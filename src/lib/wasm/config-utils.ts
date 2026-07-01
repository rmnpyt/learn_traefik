import type { TraefikConfig, FlowNodeData } from "@/types/config";

export function parseYamlConfig(yaml: string): TraefikConfig | { error: string } {
  try {
    const yamlMod = require("js-yaml");
    const parsed = yamlMod.load(yaml) as any;
    return transformToConfig(parsed);
  } catch (e: any) {
    return { error: e.message || "Invalid YAML" };
  }
}

function transformToConfig(parsed: any): TraefikConfig {
  const config: TraefikConfig = {
    entryPoints: [],
    routers: [],
    middlewares: [],
    services: [],
  };

  if (parsed?.entryPoints) {
    for (const [name, ep] of Object.entries<any>(parsed.entryPoints)) {
      const portMatch = ep.address?.match(/:(\d+)/);
      config.entryPoints.push({
        name,
        port: portMatch ? parseInt(portMatch[1]) : 0,
        protocol: ep.address?.includes("udp") ? "UDP" : "TCP",
        http3: !!ep.http3,
        tls: !!ep.http?.tls,
      });
    }
  }

  if (parsed?.http?.routers) {
    for (const [name, r] of Object.entries<any>(parsed.http.routers)) {
      config.routers.push({
        name,
        rule: r.rule || "",
        entryPoints: r.entryPoints || [],
        middlewares: r.middlewares || [],
        service: r.service || "",
        priority: r.priority,
        tls: r.tls
          ? {
              certResolver: r.tls.certResolver,
              options: r.tls.options,
              passthrough: r.tls.passthrough,
            }
          : undefined,
      });
    }
  }

  if (parsed?.http?.middlewares) {
    for (const [name, m] of Object.entries<any>(parsed.http.middlewares)) {
      const type = Object.keys(m)[0] || "unknown";
      config.middlewares.push({ name, type, config: m[type] });
    }
  }

  if (parsed?.http?.services) {
    for (const [name, s] of Object.entries<any>(parsed.http.services)) {
      const servers: string[] = [];
      if (s.loadBalancer?.servers) {
        for (const sv of s.loadBalancer.servers) {
          servers.push(sv.url || sv.address || "");
        }
      }
      config.services.push({
        name,
        strategy: s.loadBalancer?.strategy || "wrr",
        servers,
        sticky: s.loadBalancer?.sticky,
        healthCheck: s.loadBalancer?.healthCheck,
      });
    }
  }

  return config;
}

export function configToFlowNodes(
  config: TraefikConfig
): { nodes: any[]; edges: any[] } {
  const nodes: any[] = [];
  const edges: any[] = [];
  let yOffset = 0;

  const clientNode = {
    id: "client",
    type: "client",
    position: { x: 50, y: yOffset },
    data: { label: "Client", type: "client", meta: {} } as FlowNodeData,
  };
  nodes.push(clientNode);

  yOffset += 100;

  config.entryPoints.forEach((ep, i) => {
    const id = `ep-${ep.name}`;
    nodes.push({
      id,
      type: "entrypoint",
      position: { x: 250, y: yOffset + i * 120 },
      data: {
        label: ep.name,
        type: "entrypoint",
        meta: {
          Port: String(ep.port),
          Protocol: ep.protocol || "TCP",
          ...(ep.http3 ? { HTTP3: "✓" } : {}),
          ...(ep.tls ? { TLS: "✓" } : {}),
        },
      } as FlowNodeData,
    });
    edges.push({
      id: `e-client-${id}`,
      source: "client",
      target: id,
      animated: true,
    });
  });

  config.routers.forEach((r, i) => {
    const id = `router-${r.name}`;
    nodes.push({
      id,
      type: "router",
      position: { x: 500, y: yOffset + i * 160 },
      data: {
        label: r.name,
        type: "router",
        meta: {
          Rule: r.rule,
          Priority: String(r.priority || "default"),
          TLS: r.tls ? "✓" : "✗",
        },
      } as FlowNodeData,
    });
    r.entryPoints.forEach((ep) => {
      edges.push({
        id: `e-ep-${ep}-${id}`,
        source: `ep-${ep}`,
        target: id,
      });
    });
  });

  config.middlewares.forEach((m, i) => {
    const id = `mw-${m.name}`;
    nodes.push({
      id,
      type: "middleware",
      position: { x: 750, y: yOffset + i * 80 },
      data: {
        label: `${m.name} (${m.type})`,
        type: "middleware",
        meta: { Type: m.type },
      } as FlowNodeData,
    });
  });

  config.services.forEach((s, i) => {
    const id = `svc-${s.name}`;
    nodes.push({
      id,
      type: "service",
      position: { x: 1000, y: yOffset + i * 140 },
      data: {
        label: s.name,
        type: "service",
        meta: {
          Strategy: s.strategy || "wrr",
          Servers: s.servers.join(", "),
          ...(s.sticky?.cookie?.name ? { Sticky: s.sticky.cookie.name } : {}),
        },
      } as FlowNodeData,
    });

    const matchingRouter = config.routers.find((r) => r.service === s.name);
    if (matchingRouter) {
      edges.push({
        id: `e-router-${matchingRouter.name}-${id}`,
        source: `router-${matchingRouter.name}`,
        target: id,
      });
    }
  });

  return { nodes, edges };
}

export function extractHostFromRule(rule: string): string {
  const match = rule.match(/Host\(`([^`]+)`\)/);
  return match ? match[1] : "";
}

export function extractPathFromRule(rule: string): string {
  const match = rule.match(/Path(?:Prefix)?\(`([^`]+)`\)/);
  return match ? match[1] : "/";
}
