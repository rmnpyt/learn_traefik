import { getAllChapters } from "@/lib/mdx/content";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export default function LearnIndex() {
  const chapters = getAllChapters();

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learn Traefik</h1>
          <p className="text-muted mt-2">Fifteen chapters covering everything from basics to production.</p>
        </div>

        <div className="grid gap-4">
          {chapters.map((ch) => (
            <Link key={ch.slug} href={`/learn/${ch.slug}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle>
                        <span className="text-muted font-normal">Chapter {ch.chapter}: </span>
                        {ch.title}
                      </CardTitle>
                    </div>
                    <Badge variant={ch.difficulty === "beginner" ? "default" : ch.difficulty === "intermediate" ? "warning" : "error"}>
                      {ch.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                {ch.description && (
                  <CardContent>
                    <p className="text-sm text-muted">{ch.description}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
