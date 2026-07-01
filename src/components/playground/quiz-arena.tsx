"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { QuizComponent } from "@/components/playground/quiz";
import { getAllQuestions } from "@/lib/quiz/questions";

const allQuestions = getAllQuestions();

const chapters = [...new Set(allQuestions.map((q) => q.chapter))];

export function QuizArena() {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const chapterQuestions = selectedChapter
    ? allQuestions.filter((q) => q.chapter === selectedChapter)
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>All Chapters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <button
              onClick={() => {
                setSelectedChapter(null);
                setExpanded(!expanded);
              }}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground cursor-pointer"
            >
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              All Chapters ({allQuestions.length} questions)
            </button>
            {expanded && (
              <div className="ml-6 mt-2 space-y-1">
                {chapters.map((ch) => {
                  const count = allQuestions.filter((q) => q.chapter === ch).length;
                  return (
                    <button
                      key={ch}
                      onClick={() => setSelectedChapter(ch)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors cursor-pointer ${
                        selectedChapter === ch
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-surface"
                      }`}
                    >
                      <span className="font-mono text-xs text-muted mr-2">{ch}</span>
                      <span>{count} questions</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedChapter && (
        <QuizComponent questions={chapterQuestions} chapterTitle={selectedChapter} />
      )}

      {!selectedChapter && (
        <Card>
          <CardContent className="py-8 text-center text-muted">
            Select a chapter above to start the quiz
          </CardContent>
        </Card>
      )}
    </div>
  );
}
