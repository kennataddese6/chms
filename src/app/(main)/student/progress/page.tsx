import { CheckCircle2, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { EDUCATION_LEVELS } from "@/data/types";

export default function StudentProgressPage() {
  const student = students[0]; // Daniel Tesfaye (Senior level)

  const currentLevelOrder = EDUCATION_LEVELS.find((l) => l.value === student.level)?.order || 4;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Level Progression & Catechism Track</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Education — Academic roadmap from Grade 1 to Candidate status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-base">Education Level Roadmap</CardTitle>
          <CardDescription>Visual stepper of your progress through the 6 education tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative ml-4 space-y-6 border-primary/20 border-l-2 pl-6">
            {EDUCATION_LEVELS.map((lvl) => {
              const isCompleted = student.completedLevels.includes(lvl.value);
              const isCurrent = student.level === lvl.value;
              const isLocked = lvl.order > currentLevelOrder;

              return (
                <div key={lvl.value} className="group relative">
                  {/* Step Icon */}
                  <div
                    className={`absolute top-0.5 -left-[35px] flex size-6 items-center justify-center rounded-full font-bold text-xs ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                          ? "bg-purple-600 text-white ring-4 ring-purple-500/20"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="size-4" />
                    ) : isLocked ? (
                      <Lock className="size-3" />
                    ) : (
                      lvl.order
                    )}
                  </div>

                  {/* Level Details */}
                  <div className="space-y-2 rounded-lg border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{lvl.label}</h4>
                      {isCompleted && (
                        <Badge variant="secondary" className="text-[10px] text-emerald-600">
                          Completed
                        </Badge>
                      )}
                      {isCurrent && <Badge className="bg-purple-600 text-[10px]">Current Level</Badge>}
                      {isLocked && (
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          Locked
                        </Badge>
                      )}
                    </div>

                    {isCurrent && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between font-semibold text-xs">
                          <span>Completion Progress</span>
                          <span className="text-purple-600">{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                    )}

                    <p className="text-muted-foreground text-xs">
                      {isCompleted
                        ? "All coursework and exams passed for this tier."
                        : isCurrent
                          ? "Active tier. Complete all 4 enrolled courses and pass the Senior exam to advance to Graduate level."
                          : "Requires completion of Senior tier."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
