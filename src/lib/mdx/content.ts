import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ChapterMeta {
  slug: string;
  title: string;
  chapter: number;
  track: string;
  difficulty: string;
  description?: string;
}

export function getAllChapters(track?: string): ChapterMeta[] {
  const learnDir = path.join(contentDir, "learn");
  const files = fs.readdirSync(learnDir).filter((f) => f.endsWith(".mdx"));

  const chapters = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(learnDir, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/^\d+-/, "").replace(".mdx", "");
      return {
        slug,
        title: data.title || slug,
        chapter: data.chapter || 0,
        track: data.track || "beginner",
        difficulty: data.difficulty || "beginner",
        description: data.description || "",
      };
    })
    .filter((c) => !track || c.track === track)
    .sort((a, b) => a.chapter - b.chapter);

  return chapters;
}

export function getChapter(slug: string): { content: string; meta: ChapterMeta } | null {
  const learnDir = path.join(contentDir, "learn");
  const files = fs.readdirSync(learnDir).filter((f) => f.endsWith(".mdx"));

  for (const file of files) {
    const fileSlug = file.replace(/^\d+-/, "").replace(".mdx", "");
    if (fileSlug === slug) {
      const raw = fs.readFileSync(path.join(learnDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        content,
        meta: {
          slug,
          title: data.title || slug,
          chapter: data.chapter || 0,
          track: data.track || "beginner",
          difficulty: data.difficulty || "beginner",
          description: data.description || "",
        },
      };
    }
  }
  return null;
}

export function getAllReferenceDocs(): { slug: string; title: string; category: string }[] {
  const refDir = path.join(contentDir, "reference");
  const docs: { slug: string; title: string; category: string }[] = [];

  function walk(dir: string, category: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), entry.name);
      } else if (entry.name.endsWith(".mdx")) {
        const raw = fs.readFileSync(path.join(dir, entry.name), "utf-8");
        const { data } = matter(raw);
        docs.push({
          slug: entry.name.replace(".mdx", ""),
          title: data.title || entry.name.replace(".mdx", ""),
          category,
        });
      }
    }
  }

  walk(refDir, "general");
  return docs;
}

export function getReferenceDoc(slug: string): { content: string; title: string; category: string } | null {
  const refDir = path.join(contentDir, "reference");

  function walk(dir: string): { content: string; title: string; category: string } | null {
    if (!fs.existsSync(dir)) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const result = walk(path.join(dir, entry.name));
        if (result) return result;
      } else if (entry.name.endsWith(".mdx") && entry.name.replace(".mdx", "") === slug) {
        const raw = fs.readFileSync(path.join(dir, entry.name), "utf-8");
        const { data, content } = matter(raw);
        const category = path.basename(path.dirname(path.join(dir, entry.name)));
        return { content, title: data.title || slug, category: category || "general" };
      }
    }
    return null;
  }

  return walk(refDir);
}
