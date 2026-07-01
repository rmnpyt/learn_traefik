import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

interface IndexEntry {
  id: string;
  title: string;
  section: string;
  content: string;
  path: string;
}

function buildIndex(): IndexEntry[] {
  const index: IndexEntry[] = [];
  const learnDir = path.join(contentDir, "learn");

  if (!fs.existsSync(learnDir)) return index;

  const files = fs.readdirSync(learnDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(learnDir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/^\d+-/, "").replace(".mdx", "");
    const section = data.title || slug;
    const clean = content
      .replace(/```[\s\S]*?```/g, "")
      .replace(/#{1,6}\s/g, "")
      .replace(/[`*_~\[\]]/g, "")
      .trim();

    const chunks = splitIntoChunks(clean, 200);
    chunks.forEach((chunk, i) => {
      index.push({
        id: `${slug}-${i}`,
        title: data.title || slug,
        section,
        content: chunk,
        path: `/learn/${slug}`,
      });
    });
  }

  return index;
}

function splitIntoChunks(text: string, size: number): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size).join(" "));
  }
  return chunks;
}

let indexCache: IndexEntry[] | null = null;

function getIndex(): IndexEntry[] {
  if (!indexCache) {
    indexCache = buildIndex();
  }
  return indexCache;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase() || "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const index = getIndex();

  const results = index
    .filter((entry) => {
      const content = entry.content.toLowerCase();
      const title = entry.title.toLowerCase();
      return content.includes(q) || title.includes(q);
    })
    .slice(0, 20)
    .map((entry) => ({
      id: entry.id,
      title: entry.title,
      section: entry.section,
      path: entry.path,
      snippet: getSnippet(entry.content, q),
    }));

  return NextResponse.json({ results });
}

function getSnippet(content: string, query: string, maxLen: number = 150): string {
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return content.slice(0, maxLen);

  const start = Math.max(0, idx - 60);
  const end = Math.min(content.length, idx + query.length + 80);
  let snippet = content.slice(start, end);

  if (start > 0) snippet = "..." + snippet;
  if (end < content.length) snippet = snippet + "...";

  return snippet;
}
