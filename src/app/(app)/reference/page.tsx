import { getAllReferenceDocs } from "@/lib/mdx/content";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function ReferenceIndex() {
  const docs = getAllReferenceDocs();

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reference</h1>
          <p className="text-muted mt-2">Quick reference guides for Traefik configuration.</p>
        </div>

        <div className="grid gap-4">
          {docs.map((doc) => (
            <Link key={doc.slug} href={`/reference/${doc.slug}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bookmark className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle>{doc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted capitalize">Category: {doc.category}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
