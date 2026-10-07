import { Award, BookOpen, CheckCircle2, GraduationCap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { getLevelLabel } from "@/data/types";

export function StudentProgressOverview() {
  const student = students[0]; // Daniel Tesfaye

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-background to-background">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-purple-300 bg-purple-500/15 text-purple-700 text-xs dark:text-purple-300"
            >
              <GraduationCap className="mr-1 size-3.5" />
              {getLevelLabel(student.level)} Level
            </Badge>
            <Badge variant="secondary" className="font-semibold text-emerald-600 text-xs dark:text-emerald-400">
              Average Grade: {student.averageGrade}%
            </Badge>
          </div>
          <span className="font-medium text-muted-foreground text-xs">St. Mary&apos;s Education</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between font-semibold text-xs">
            <span>Level Progression</span>
            <span className="font-bold text-purple-600 dark:text-purple-400">{student.progress}% Completed</span>
          </div>
          <Progress value={student.progress} className="h-2.5" />
        </div>

        <div className="grid grid-cols-3 gap-3 border-t pt-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
            <div>
              <div className="font-bold">{student.completedLevels.length} Tiers</div>
              <div className="text-[10px] text-muted-foreground">Completed</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 shrink-0 text-blue-600" />
            <div>
              <div className="font-bold">{student.enrolledCourseIds.length} Courses</div>
              <div className="font-medium text-[10px] text-muted-foreground">Active</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="size-4 shrink-0 text-amber-600" />
            <div>
              <div className="font-bold">Grade A-</div>
              <div className="font-medium text-[10px] text-muted-foreground">Standing</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
