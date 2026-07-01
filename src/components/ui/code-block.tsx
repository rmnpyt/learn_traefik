"use client";

import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

const languages: Record<string, () => Promise<any>> = {
  yaml: () => import("highlight.js/lib/languages/yaml").then(m => m.default),
  json: () => import("highlight.js/lib/languages/json").then(m => m.default),
  bash: () => import("highlight.js/lib/languages/bash").then(m => m.default),
  go: () => import("highlight.js/lib/languages/go").then(m => m.default),
  sql: () => import("highlight.js/lib/languages/sql").then(m => m.default),
  dockerfile: () => import("highlight.js/lib/languages/dockerfile").then(m => m.default),
  nginx: () => import("highlight.js/lib/languages/nginx").then(m => m.default),
  xml: () => import("highlight.js/lib/languages/xml").then(m => m.default),
  ini: () => import("highlight.js/lib/languages/ini").then(m => m.default),
  diff: () => import("highlight.js/lib/languages/diff").then(m => m.default),
  plaintext: () => import("highlight.js/lib/languages/plaintext").then(m => m.default),
};

async function highlight(code: string, lang: string): Promise<string> {
  const hljs = (await import("highlight.js/lib/core")).default;
  const loader = languages[lang] || languages.plaintext;
  hljs.registerLanguage(lang, await loader());
  try {
    return hljs.highlight(code, { language: lang }).value;
  } catch {
    return hljs.highlight(code, { language: "plaintext" }).value;
  }
}

function CodeBlock({ code, language = "yaml", showLineNumbers = false, className }: {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    let cancelled = false;
    highlight(code, language).then(h => { if (!cancelled) setHighlighted(h); });
    return () => { cancelled = true; };
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group my-4 rounded-lg overflow-hidden border border-border", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
        <span className="text-xs text-muted uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="text-sm font-mono p-4 leading-6">
          {highlighted ? (
            <code dangerouslySetInnerHTML={{ __html: highlighted }} />
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}

export { CodeBlock };
