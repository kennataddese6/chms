"use client";

import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const PROGRESSION_STEPS = [
  { grade: "Grade 1", level: "Primary" },
  { grade: "Grade 2", level: "Primary" },
  { grade: "Grade 3", level: "Junior" },
  { grade: "Grade 4", level: "Junior" },
  { grade: "Grade 5", level: "Junior" },
  { grade: "Grade 6", level: "Senior" },
  { grade: "Grade 7", level: "Senior" },
  { grade: "Grade 8", level: "Senior" },
  { grade: "Grade 9", level: "Graduate" },
  { grade: "Grade 10", level: "Graduate" },
  { grade: "Grade 11", level: "Candidate" },
  { grade: "Grade 12", level: "Candidate" },
  { grade: "Graduation Class", level: "Commissioned" },
];

export function ProgressionPathwayBanner() {
  return (
    <Card className="border-purple-500/30 bg-purple-500/5 shadow-xs dark:bg-purple-950/20">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
            <Sparkles className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground text-xs">Cohort Progression Pathway Concept</h3>
              <Badge
                variant="secondary"
                className="bg-purple-500/15 font-medium text-[10px] text-purple-700 dark:text-purple-300"
              >
                Future Architecture
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Visual roadmap for year-end student advancement (Grade 1 ➔ Grade 12 ➔ Graduation Class).
            </p>
          </div>
        </div>

        {/* Scrollable Horizontal Progression Chain */}
        <div className="overflow-x-auto border-purple-500/20 border-t pt-2 pb-1">
          <div className="flex min-w-max items-center gap-2">
            {PROGRESSION_STEPS.map((step, idx) => (
              <div key={step.grade} className="flex items-center gap-2">
                <div className="flex flex-col items-center rounded-md border bg-card p-1.5 px-2.5 text-center shadow-2xs">
                  <span className="font-bold text-xs">{step.grade}</span>
                  <span className="text-[9px] text-muted-foreground">{step.level}</span>
                </div>
                {idx < PROGRESSION_STEPS.length - 1 && (
                  <ArrowRight className="size-3 shrink-0 text-purple-500 opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
