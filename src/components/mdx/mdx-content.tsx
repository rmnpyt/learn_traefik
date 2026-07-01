import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "@/components/ui/callout";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const mdxComponents = {
  Callout,
  CodeBlock,
  Tabs,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  pre: ({ children }: any) => <>{children}</>,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const code = String(children).replace(/\n$/, "");
    if (match) {
      return <CodeBlock code={code} language={match[1]} />;
    }
    return (
      <code className="bg-surface px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    );
  },
};

export async function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-h2:mt-10 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
      prose-h3:mt-8
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-code:before:content-none prose-code:after:content-none
      prose-img:rounded-lg
      prose-table:text-sm
      prose-th:bg-surface prose-th:px-3 prose-th:py-2
      prose-td:px-3 prose-td:py-2
      prose-li:marker:text-muted
    ">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}
