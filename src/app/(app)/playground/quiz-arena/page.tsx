import { Breadcrumb } from "@/components/layout/breadcrumb";
import { QuizArena } from "@/components/playground/quiz-arena";

export default function QuizArenaPage() {
  return (
    <>
      <Breadcrumb items={[
        { label: "Playground", href: "/playground" },
        { label: "Quiz Arena" },
      ]} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Arena</h1>
          <p className="text-muted mt-2">
            Test your knowledge with multiple-choice questions and interactive configuration challenges.
          </p>
        </div>
        <QuizArena />
      </div>
    </>
  );
}
