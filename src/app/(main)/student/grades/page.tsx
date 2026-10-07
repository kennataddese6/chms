import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { gradeRecords } from "@/data/grades";
import { students } from "@/data/students";

export default function StudentGradesPage() {
  const student = students[0]; // Daniel Tesfaye
  const studentGrades = gradeRecords.filter((g) => g.studentId === student.id || g.studentName === student.name);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">My Academic Transcript & Grades</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Education — Official grade records and quiz scores for Daniel Tesfaye.
        </p>
      </div>

      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-background to-background">
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold text-base">Overall Standing</CardTitle>
          <CardDescription font-medium>Senior Level Catechism & Theology Track</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-8">
          <div>
            <div className="font-bold text-3xl text-emerald-600 dark:text-emerald-400">{student.averageGrade}%</div>
            <div className="font-medium text-muted-foreground text-xs">Cumulative Average</div>
          </div>
          <div className="border-l pl-8">
            <div className="font-bold text-3xl">Grade A-</div>
            <div className="font-medium text-muted-foreground text-xs">Standing</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-base">Assessment & Quiz Grades</CardTitle>
          <CardDescription>All recorded quiz and exam submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-xs">Subject</TableHead>
                  <TableHead className="font-semibold text-xs">Type</TableHead>
                  <TableHead className="text-center font-semibold text-xs">Score (%)</TableHead>
                  <TableHead className="text-center font-semibold text-xs">Grade</TableHead>
                  <TableHead className="text-right font-semibold text-xs">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentGrades.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="py-3 font-semibold text-xs">{rec.subject}</TableCell>
                    <TableCell className="py-3 text-muted-foreground text-xs capitalize">{rec.type}</TableCell>
                    <TableCell className="py-3 text-center font-bold text-emerald-600 text-xs dark:text-emerald-400">
                      {rec.score}%
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <Badge variant="default" className="font-bold text-[10px]">
                        {rec.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-right text-muted-foreground text-xs">{rec.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
