import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function getFullGuideText(): string {
  const learnDir = path.join(contentDir, "learn");
  if (!fs.existsSync(learnDir)) return "";

  const files = fs.readdirSync(learnDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  const parts: string[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(learnDir, file), "utf-8");
    const { data, content } = matter(raw);
    const clean = content
      .replace(/```[\s\S]*?```/g, "[code block]")
      .replace(/[#*_~`\[\]]/g, "")
      .trim();
    parts.push(`## ${data.title || file}\n${clean}`);
  }

  return parts.join("\n\n");
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const guideText = getFullGuideText();

    const systemPrompt = `You are a Traefik expert assistant. Answer the user's question based on the provided guide content. Be concise and accurate. If the answer is not in the guide, say so.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || ""}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Guide content:\n\n${guideText.slice(0, 30000)}\n\nQuestion: ${question}` },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `AI search failed: ${error}` }, { status: 500 });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No answer found.";

    return NextResponse.json({ answer });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
