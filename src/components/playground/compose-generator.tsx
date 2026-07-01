"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Download, Plus, Trash2, RotateCcw } from "lucide-react";
import JSZip from "jszip";

interface Service {
  name: string;
  image: string;
  port: number;
  labels: string[];
}

export function ComposeGenerator() {
  const [domain, setDomain] = useState("example.com");
  const [email, setEmail] = useState("admin@example.com");
  const [useTLS, setUseTLS] = useState(true);
  const [services, setServices] = useState<Service[]>([
    { name: "web", image: "nginx:alpine", port: 80, labels: [] },
  ]);
  const [generated, setGenerated] = useState("");

  const addService = () => {
    setServices([...services, { name: `app${services.length + 1}`, image: "node:lts-alpine", port: 3000, labels: [] }]);
  };

  const removeService = (index: number) => {
    if (services.length <= 1) return;
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const updated = [...services];
    (updated[index] as any)[field] = value;
    setServices(updated);
  };

  const generate = useCallback(() => {
    let yaml = `services:
  traefik:
    image: traefik:v3.3
    container_name: traefik
    restart: unless-stopped
    command:
      - "--api.dashboard=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
${useTLS ? `      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.tlschallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.email=${email}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"` : ""}
    ports:
      - "80:80"
${useTLS ? `      - "443:443"` : ""}
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
${useTLS ? `      - ./letsencrypt:/letsencrypt` : ""}
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host(\`traefik.${domain}\`)"
      - "traefik.http.routers.dashboard.service=api@internal"
      - "traefik.http.routers.dashboard.middlewares=auth"
${useTLS ? `      - "traefik.http.routers.dashboard.tls.certresolver=letsencrypt"` : ""}
      - "traefik.http.middlewares.auth.basicauth.users=admin:$$2y$$05$$xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

`;

    services.forEach((svc) => {
      yaml += `  ${svc.name}:
    image: ${svc.image}
    container_name: ${svc.name}
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.${svc.name}.rule=Host(\`${svc.name}.${domain}\`)"
      - "traefik.http.routers.${svc.name}.entrypoints=web${useTLS ? "secure" : ""}"
${useTLS ? `      - "traefik.http.routers.${svc.name}.tls.certresolver=letsencrypt"` : ""}
      - "traefik.http.services.${svc.name}.loadbalancer.server.port=${svc.port}"

`;
    });

    yaml += `networks:
  default:
    name: traefik-net
`;

    setGenerated(yaml);
  }, [services, domain, email, useTLS]);

  const downloadZip = async () => {
    const zip = new JSZip();
    zip.file("docker-compose.yml", generated);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "traefik-stack.zip";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((svc, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 p-3 rounded-lg border border-border bg-surface">
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted block mb-1">Name</label>
                <input
                  type="text"
                  value={svc.name}
                  onChange={(e) => updateService(i, "name", e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="text-xs text-muted block mb-1">Image</label>
                <input
                  type="text"
                  value={svc.image}
                  onChange={(e) => updateService(i, "image", e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="w-20">
                <label className="text-xs text-muted block mb-1">Port</label>
                <input
                  type="number"
                  value={svc.port}
                  onChange={(e) => updateService(i, "port", e.target.value)}
                  className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeService(i)} disabled={services.length <= 1}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addService}>
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Global Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted block mb-1">Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted block mb-1">ACME Email (for TLS)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useTLS}
              onChange={(e) => setUseTLS(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Enable TLS (HTTPS) with Let's Encrypt</span>
          </label>
          <div className="flex gap-2">
            <Button onClick={generate}>
              Generate Compose File
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setGenerated("");
                setServices([{ name: "web", image: "nginx:alpine", port: 80, labels: [] }]);
                setDomain("example.com");
                setEmail("admin@example.com");
                setUseTLS(true);
              }}
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {generated && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>docker-compose.yml</CardTitle>
              <Button size="sm" onClick={downloadZip}>
                <Download className="h-4 w-4" /> Download .zip
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CodeBlock code={generated} language="yaml" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
