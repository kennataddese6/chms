import { Award, BookOpen, CheckCircle2, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { getLevelLabel } from "@/data/types";

export function StudentProgressOverview() {
  const student = students[0]; // Daniel Tesfaye

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 via-background to-background border-purple-500/20">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-300"
            >
              <GraduationCap className="mr-1 size-3.5" />
              {getLevelLabel(student.level)} Level
            </Badge>
            <Badge variant="secondary" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Average Grade: {student.averageGrade}%
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground font-medium">St. Mary&apos;s Education</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span>Level Progression</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">{student.progress}% Completed</span>
          </div>
          <Progress value={student.progress} className="h-2.5" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 border-t text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold">{student.completedLevels.length} Tiers</div>
              <div className="text-[10px] text-muted-foreground">Completed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-blue-600 shrink-0" />
            <div>
              <div className="font-bold">{student.enrolledCourseIds.length} Courses</div>
              <div className="text-[10px] text-muted-foreground font-medium">Active</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="size-4 text-amber-600 shrink-0" />
            <div>
              <div className="font-bold">Grade A-</div>
              <div className="text-[10px] text-muted-foreground font-medium">Standing</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
