import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, Server, GraduationCap } from "lucide-react";

const playgrounds = [
  { icon: Play, title: "Config Editor", description: "Write YAML and visualize Traefik request flow in real-time", href: "/playground/config-editor" },
  { icon: Server, title: "Compose Generator", description: "Generate production docker-compose.yml with one click", href: "/playground/compose-generator" },
  { icon: GraduationCap, title: "Quiz Arena", description: "Test your knowledge with MCQ and config challenges", href: "/playground/quiz-arena" },
];

export default function PlaygroundIndex() {
  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Playground</h1>
          <p className="text-muted mt-2">Interactive tools to learn, experiment, and test your Traefik knowledge.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {playgrounds.map((p) => (
            <Link key={p.href} href={p.href}>
              <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{p.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{p.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
