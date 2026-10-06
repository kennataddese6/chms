import { Award, CheckCircle2, GraduationCap, Lock, ShieldAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { EDUCATION_LEVELS } from "@/data/types";

export default function StudentProgressPage() {
  const student = students[0]; // Daniel Tesfaye (Senior level)

  const currentLevelOrder = EDUCATION_LEVELS.find((l) => l.value === student.level)?.order || 4;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Level Progression & Catechism Track</h1>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Education — Academic roadmap from Grade 1 to Candidate status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Education Level Roadmap</CardTitle>
          <CardDescription>Visual stepper of your progress through the 6 education tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l-2 border-primary/20 ml-4 pl-6 space-y-6">
            {EDUCATION_LEVELS.map((lvl) => {
              const isCompleted = student.completedLevels.includes(lvl.value);
              const isCurrent = student.level === lvl.value;
              const isLocked = lvl.order > currentLevelOrder;

              return (
                <div key={lvl.value} className="relative group">
                  {/* Step Icon */}
                  <div
                    className={`absolute -left-[35px] top-0.5 flex size-6 items-center justify-center rounded-full text-xs font-bold ${
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
                  <div className="rounded-lg border p-4 bg-card space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">{lvl.label}</h4>
                      {isCompleted && (
                        <Badge variant="secondary" className="text-[10px] text-emerald-600">
                          Completed
                        </Badge>
                      )}
                      {isCurrent && <Badge className="text-[10px] bg-purple-600">Current Level</Badge>}
                      {isLocked && (
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          Locked
                        </Badge>
                      )}
                    </div>

                    {isCurrent && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Completion Progress</span>
                          <span className="text-purple-600">{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">
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
