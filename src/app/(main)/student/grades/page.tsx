import { Award, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { gradeRecords } from "@/data/grades";
import { students } from "@/data/students";

export default function StudentGradesPage() {
  const student = students[0]; // Daniel Tesfaye
  const studentGrades = gradeRecords.filter((g) => g.studentId === student.id || g.studentName === student.name);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Academic Transcript & Grades</h1>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Education — Official grade records and quiz scores for Daniel Tesfaye.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-purple-500/10 via-background to-background border-purple-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Overall Standing</CardTitle>
          <CardDescription font-medium>Senior Level Catechism & Theology Track</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-8">
          <div>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{student.averageGrade}%</div>
            <div className="text-xs text-muted-foreground font-medium">Cumulative Average</div>
          </div>
          <div className="border-l pl-8">
            <div className="text-3xl font-bold">Grade A-</div>
            <div className="text-xs text-muted-foreground font-medium">Standing</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Assessment & Quiz Grades</CardTitle>
          <CardDescription>All recorded quiz and exam submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold">Subject</TableHead>
                  <TableHead className="text-xs font-semibold">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Score (%)</TableHead>
                  <TableHead className="text-xs font-semibold text-center">Grade</TableHead>
                  <TableHead className="text-xs font-semibold text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentGrades.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell className="py-3 font-semibold text-xs">{rec.subject}</TableCell>
                    <TableCell className="py-3 text-xs capitalize text-muted-foreground">{rec.type}</TableCell>
                    <TableCell className="py-3 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {rec.score}%
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <Badge variant="default" className="text-[10px] font-bold">
                        {rec.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-right text-xs text-muted-foreground">{rec.date}</TableCell>
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
