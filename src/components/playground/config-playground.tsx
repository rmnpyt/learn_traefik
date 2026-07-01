"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { parseYamlConfig, configToFlowNodes } from "@/lib/wasm/config-utils";
import { ArchitectureFlow } from "@/components/diagrams/architecture-flow";
import { Play, RotateCcw } from "lucide-react";

const DEFAULT_CONFIG = `## EntryPoints
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

## HTTP Routing
http:
  routers:
    api:
      rule: "Host(\`api.example.com\`)"
      entryPoints:
        - websecure
      service: api-service
      tls:
        certResolver: letsencrypt

  services:
    api-service:
      loadBalancer:
        servers:
          - url: "http://10.0.0.1:8080"
        healthCheck:
          path: "/health"
          interval: "30s"
`;

export function ConfigPlayground() {
  const { theme } = useTheme();
  const [yaml, setYaml] = useState(DEFAULT_CONFIG);
  const [result, setResult] = useState<ReturnType<typeof parseYamlConfig> | null>(null);

  const handleParse = () => {
    const parsed = parseYamlConfig(yaml);
    setResult(parsed);
  };

  const handleReset = () => {
    setYaml(DEFAULT_CONFIG);
    setResult(null);
  };

  const flowNodes = result && !("error" in result) ? configToFlowNodes(result) : null;

  return (
    <div className="space-y-4">
      <Tabs
        tabs={[
          {
            value: "editor",
            label: "Editor",
            content: (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">YAML Configuration</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                      </Button>
                      <Button size="sm" onClick={handleParse}>
                        <Play className="h-3.5 w-3.5" />
                        Visualize
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border overflow-hidden h-[500px]">
                    <Editor
                      height="100%"
                      defaultLanguage="yaml"
                      value={yaml}
                      onChange={(v) => setYaml(v || "")}
                      theme={theme === "dark" ? "vs-dark" : "light"}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Visualization</h3>
                  {flowNodes ? (
                    <ArchitectureFlow nodes={flowNodes.nodes} edges={flowNodes.edges} />
                  ) : (
                    <Card className="flex items-center justify-center h-[500px] text-muted">
                      <div className="text-center">
                        <p className="text-sm">Click "Visualize" to render</p>
                        <p className="text-xs mt-1">Or edit the YAML and re-parse</p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ),
          },
          {
            value: "parsed",
            label: "Parsed Config",
            content: (
              <Card>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold">Parsed Configuration</h3>
                  {result && "error" in result ? (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 text-sm">
                      {result.error}
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">EntryPoints ({result.entryPoints.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.entryPoints.map((ep) => (
                            <Badge key={ep.name} variant="default">{ep.name}:{ep.port}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Routers ({result.routers.length})</h4>
                        {result.routers.map((r) => (
                          <div key={r.name} className="text-sm p-2 bg-surface rounded mb-1">
                            <span className="font-medium">{r.name}</span>: {r.rule} → {r.service}
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Middlewares ({result.middlewares.length})</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.middlewares.map((m) => (
                            <Badge key={m.name} variant="outline">{m.name} ({m.type})</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Services ({result.services.length})</h4>
                        {result.services.map((s) => (
                          <div key={s.name} className="text-sm p-2 bg-surface rounded mb-1">
                            <span className="font-medium">{s.name}</span>: {s.servers.length} server(s), {s.strategy}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted">No config parsed yet. Click Visualize.</p>
                  )}
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
