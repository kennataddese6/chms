"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, Info, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Student } from "@/data/types";
import { getLevelLabel } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface StudentTableProps {
  initialStudents: Student[];
}

export function StudentTable({ initialStudents }: StudentTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const filteredData = initialStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || s.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const totalOrganizationStudents = 186;
  const totalPages = Math.ceil(totalOrganizationStudents / pageSize);

  const paginatedRows = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search student..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            className="h-9 pl-8 text-xs"
          />
        </div>
        <Select
          value={levelFilter}
          onValueChange={(val) => {
            setLevelFilter(val);
            setPageIndex(0);
          }}
        >
          <SelectTrigger className="h-9 w-[150px] text-xs">
            <SelectValue placeholder="Education Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="grade-1">Grade 1</SelectItem>
            <SelectItem value="grade-2">Grade 2</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="candidate">Candidate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-xs">Student Name</TableHead>
              <TableHead className="font-semibold text-xs">Level</TableHead>
              <TableHead className="font-semibold text-xs">Course Progress</TableHead>
              <TableHead className="font-semibold text-xs">Average Grade</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length ? (
              paginatedRows.map((student) => (
                <TableRow
                  key={student.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/education/students/${student.id}`)}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs leading-tight">{student.name}</span>
                        <span className="text-[11px] text-muted-foreground">{student.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {getLevelLabel(student.level)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex min-w-[120px] items-center gap-2">
                      <Progress value={student.progress} className="h-1.5 flex-1" />
                      <span className="font-semibold text-muted-foreground text-xs">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`font-bold text-xs ${
                        student.averageGrade >= 90
                          ? "text-emerald-600 dark:text-emerald-400"
                          : student.averageGrade >= 80
                            ? "text-blue-600"
                            : "text-amber-600"
                      }`}
                    >
                      {student.averageGrade}%
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant={student.status === "active" ? "default" : "secondary"}
                      className="text-[10px] capitalize"
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground text-xs">
                  No students found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <Info className="size-3.5 shrink-0 text-primary/70" />
          <span>
            Showing {paginatedRows.length} of {totalOrganizationStudents} total enrolled students (representative demo
            subset)
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageIndex >= totalPages - 1 || paginatedRows.length < pageSize}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
