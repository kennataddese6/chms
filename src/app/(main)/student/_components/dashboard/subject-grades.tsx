import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { students } from "@/data/students";

export function StudentSubjectGrades() {
  const student = students[0]; // Daniel Tesfaye

  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardHeader>
        <CardTitle className="font-semibold text-base">My Subject Standing</CardTitle>
        <CardDescription>Academic scores across Senior Level curriculum</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-xs">
          {student.subjects.map((sub) => (
            <div key={sub.subject} className="flex items-center justify-between rounded-lg border bg-card p-3">
              <span className="font-semibold">{sub.subject}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{sub.grade}%</span>
                <Badge variant="outline" className="font-bold text-[10px]">
                  Grade {sub.letterGrade}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
