"use client";

import { useState } from "react";

import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { gradeRecords } from "@/data/grades";
import { getLevelLabel } from "@/data/types";

export default function TeacherGradesPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filteredGrades = gradeRecords.filter((g) => {
    const matchesSearch =
      g.studentName.toLowerCase().includes(search.toLowerCase()) ||
      g.subject.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "all" || g.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Gradebook & Exam Results</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Education — Review student exam scores, quiz grades, and overall standing.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search student or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8 text-xs"
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="h-9 w-[160px] text-xs">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="Theology">Theology</SelectItem>
            <SelectItem value="Scripture">Scripture</SelectItem>
            <SelectItem value="Bible Studies">Bible Studies</SelectItem>
            <SelectItem value="Church History">Church History</SelectItem>
            <SelectItem value="Christian Ethics">Christian Ethics</SelectItem>
            <SelectItem value="Pastoral Care">Pastoral Care</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-base">Student Grade Records</CardTitle>
          <CardDescription>Evaluated quizzes, mid-terms, and final exam submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-xs">Student Name</TableHead>
                  <TableHead className="font-semibold text-xs">Subject</TableHead>
                  <TableHead className="font-semibold text-xs">Level</TableHead>
                  <TableHead className="font-semibold text-xs">Assessment Type</TableHead>
                  <TableHead className="text-center font-semibold text-xs">Score (%)</TableHead>
                  <TableHead className="text-center font-semibold text-xs">Grade</TableHead>
                  <TableHead className="text-right font-semibold text-xs">Date Posted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((rec) => (
                  <TableRow key={rec.id} className="transition-colors hover:bg-muted/40">
                    <TableCell className="py-3 font-semibold text-xs">{rec.studentName}</TableCell>
                    <TableCell className="py-3 text-xs">{rec.subject}</TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className="text-[10px]">
                        {getLevelLabel(rec.level)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-muted-foreground text-xs capitalize">{rec.type}</TableCell>
                    <TableCell className="py-3 text-center font-bold text-emerald-600 text-xs dark:text-emerald-400">
                      {rec.score}%
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <Badge
                        variant={rec.score >= 90 ? "default" : rec.score >= 80 ? "secondary" : "outline"}
                        className="font-bold text-[10px]"
                      >
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
