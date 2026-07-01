import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ComposeGenerator } from "@/components/playground/compose-generator";

export default function ComposeGeneratorPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "Playground", href: "/playground" },
        { label: "Compose Generator" },
      ]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Docker Compose Generator</h1>
          <p className="text-muted mt-2">
            Generate a production-ready docker-compose.yml with Traefik, optionally including
            Let's Encrypt TLS, and any number of backend services.
          </p>
        </div>
        <ComposeGenerator />
      </div>
    </>
  );
}
