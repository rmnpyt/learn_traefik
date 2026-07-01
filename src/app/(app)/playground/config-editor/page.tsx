import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ConfigPlayground } from "@/components/playground/config-playground";

export default function ConfigEditorPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "Playground", href: "/playground" },
        { label: "Config Editor" },
      ]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Config Editor</h1>
          <p className="text-muted mt-2">
            Write YAML and see the request flow visualized in real-time. Edit entrypoints,
            routers, services, and middlewares to understand how Traefik routes traffic.
          </p>
        </div>
        <ConfigPlayground />
      </div>
    </>
  );
}
