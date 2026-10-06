import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { getLevelLabel } from "@/data/types";
import { getInitials } from "@/lib/utils";

export default function TeacherStudentsPage() {
  // Students in Fr. James Osei's taught levels (grade-1 and senior)
  const teacherStudents = students.filter((s) => s.level === "grade-1" || s.level === "senior");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Teacher&apos;s Student Roster</h1>
        <p className="text-sm text-muted-foreground">
          Students across Grade 1 and Senior Level classes taught by Fr. James Osei.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">All Enrolled Students ({teacherStudents.length})</CardTitle>
          <CardDescription>Academic progress and grades for assigned students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teacherStudents.map((std) => (
              <div
                key={std.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/40 transition-colors text-xs"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={std.avatarUrl} alt={std.name} />
                    <AvatarFallback>{getInitials(std.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{std.name}</span>
                    <span className="text-[11px] text-muted-foreground">{std.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <Badge variant="outline" className="text-[10px]">
                    {getLevelLabel(std.level)}
                  </Badge>
                  <div className="hidden sm:flex flex-col w-28 gap-1">
                    <Progress value={std.progress} className="h-1.5" />
                    <span className="text-[10px] text-muted-foreground text-right">{std.progress}% Done</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{std.averageGrade}%</span>
                    <div className="text-[10px] text-muted-foreground">Grade</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
