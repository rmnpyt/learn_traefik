import { getAllChapters, getChapter } from "@/lib/mdx/content";
import { MDXContent } from "@/components/mdx/mdx-content";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { QuizComponent } from "@/components/playground/quiz";
import { getQuestionsForChapter } from "@/lib/quiz/questions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return getAllChapters().map((c) => ({ slug: c.slug }));
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  const questions = getQuestionsForChapter(slug);

  return (
    <>
      <Breadcrumb items={[
        { label: "Learn", href: "/" },
        { label: chapter.meta.title },
      ]} />

      <div className="flex items-center gap-3 mb-6">
        <Badge variant="outline">Chapter {chapter.meta.chapter}</Badge>
        <Badge variant={chapter.meta.difficulty === "beginner" ? "default" : "warning"}>
          {chapter.meta.difficulty}
        </Badge>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-8">{chapter.meta.title}</h1>

      <MDXContent source={chapter.content} />

      {questions.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Chapter Quiz</h2>
          <QuizComponent questions={questions} chapterTitle={chapter.meta.title} />
        </section>
      )}
    </>
  );
}
