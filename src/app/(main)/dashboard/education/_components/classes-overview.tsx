"use client";

import Link from "next/link";

import { ArrowRight, School, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClassesStore } from "@/stores/classes/classes-store";

export function ClassesOverviewCard() {
  const { classes } = useClassesStore();

  const previewClasses = classes.slice(0, 4);

  return (
    <Card className="col-span-12 shadow-xs">
      <CardHeader className="flex flex-col justify-between space-y-2 pb-3 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2 font-bold text-base">
              <School className="size-4 text-blue-600 dark:text-blue-400" />
              Active Grade Classes & Cohorts ({classes.length})
            </CardTitle>
            <Badge
              variant="outline"
              className="border-purple-200 bg-purple-500/10 text-[10px] text-purple-700 dark:text-purple-300"
            >
              <Sparkles className="mr-1 size-3" /> Progression Concept Ready
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Grade 1 through Grade 12 & Graduation Cohorts — Teacher assignments, attendance, and student rosters.
          </CardDescription>
        </div>

        <Button size="sm" asChild variant="outline" className="shrink-0 gap-1.5 text-xs">
          <Link href="/dashboard/education/classes">
            Manage All Classes <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {previewClasses.map((cls) => (
            <div
              key={cls.id}
              className="flex flex-col justify-between space-y-2 rounded-lg border bg-card p-3.5 text-xs transition-colors hover:border-primary/40"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-500/10 font-semibold text-[10px] text-blue-600">
                    {cls.gradeLevel}
                  </Badge>
                  <span className="font-semibold text-[10px] text-emerald-600 dark:text-emerald-400">
                    {cls.attendanceRate}% Att.
                  </span>
                </div>
                <h4 className="pt-0.5 font-bold text-sm">{cls.name}</h4>
                <p className="text-[11px] text-muted-foreground">Teacher: {cls.teacherName}</p>
              </div>

              <div className="flex items-center justify-between border-t pt-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Users className="size-3 text-muted-foreground" /> {cls.studentCount} Students
                </span>
                <Link
                  href={`/dashboard/education/classes/${cls.id}`}
                  className="flex items-center gap-0.5 font-medium text-[11px] text-primary hover:underline"
                >
                  View <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
