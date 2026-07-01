"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs } from "@/components/ui/tabs";
import { Check, X, Lightbulb, ChevronRight, RotateCcw } from "lucide-react";
import { QuizQuestion } from "@/types";

export function QuizComponent({
  questions,
  chapterTitle,
}: {
  questions: QuizQuestion[];
  chapterTitle?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return null;

  const q = questions[current];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
    if (q.type === "mcq" && index === q.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const total = questions.filter((qi) => qi.type === "mcq").length;
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-primary">
            {score} / {total}
          </div>
          <p className="text-muted">
            {score === total ? "Perfect! You're a Traefik expert!" : "Review your answers and try again."}
          </p>
          <Button onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" /> Retry Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {chapterTitle || "Quiz"}
          </CardTitle>
          <Badge variant="outline">
            {current + 1} / {questions.length}
          </Badge>
        </div>
        <Badge variant={q.difficulty === "easy" ? "default" : q.difficulty === "medium" ? "warning" : "error"}>
          {q.difficulty}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {q.type === "mcq" && (
          <>
            <p className="font-medium">{q.prompt}</p>
            <div className="space-y-2">
              {q.options?.map((opt, i) => {
                const isCorrect = showResult && i === q.correctIndex;
                const isWrong = showResult && selected === i && i !== q.correctIndex;
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                      isCorrect
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : isWrong
                        ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                        : selected === i
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect && <Check className="h-4 w-4 text-green-600" />}
                      {isWrong && <X className="h-4 w-4 text-red-600" />}
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {q.type === "config-challenge" && (
          <>
            <p className="font-medium">{q.prompt}</p>
            {q.brokenConfig && (
              <CodeBlock code={q.brokenConfig} language="yaml" />
            )}
            {q.hints && q.hints.length > 0 && showResult && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400">
                  <Lightbulb className="h-4 w-4" />
                  Hints
                </div>
                <ul className="mt-1 space-y-1">
                  {q.hints.map((hint, i) => (
                    <li key={i} className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-1">
                      <ChevronRight className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {showResult && q.explanation && (
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm">
            {q.explanation}
          </div>
        )}

        <div className="flex justify-end">
          {showResult ? (
            <Button onClick={handleNext}>
              {current < questions.length - 1 ? "Next Question" : "See Results"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <p className="text-xs text-muted">Select an answer above</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
