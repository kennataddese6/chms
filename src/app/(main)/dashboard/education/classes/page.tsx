"use client";

import { useState } from "react";

import { BookOpen, Filter, LayoutGrid, Plus, School, Search, Sparkles, Table as TableIcon, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useClassesStore } from "@/stores/classes/classes-store";

import { ClassCard } from "./_components/class-card";
import { ClassTable } from "./_components/class-table";
import { CreateClassDialog } from "./_components/create-class-dialog";
import { ProgressionPathwayBanner } from "./_components/progression-pathway-banner";

export default function AdminClassesPage() {
  const { classes } = useClassesStore();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showProgressionBanner, setShowProgressionBanner] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredClasses = classes.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      c.gradeLevel.toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      levelFilter === "all" ||
      (levelFilter === "primary" && (c.gradeLevel === "Grade 1" || c.gradeLevel === "Grade 2")) ||
      (levelFilter === "junior" &&
        (c.gradeLevel === "Grade 3" || c.gradeLevel === "Grade 4" || c.gradeLevel === "Grade 5")) ||
      (levelFilter === "senior" &&
        (c.gradeLevel === "Grade 6" || c.gradeLevel === "Grade 7" || c.gradeLevel === "Grade 8")) ||
      (levelFilter === "graduate" && (c.gradeLevel === "Grade 9" || c.gradeLevel === "Grade 10")) ||
      (levelFilter === "graduation" &&
        (c.gradeLevel === "Grade 11" || c.gradeLevel === "Grade 12" || c.gradeLevel.includes("Graduation")));

    return matchesSearch && matchesLevel;
  });

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const avgAttendance = Math.round(classes.reduce((sum, c) => sum + c.attendanceRate, 0) / (classes.length || 1));
  const avgGrade = Math.round(classes.reduce((sum, c) => sum + c.averageGrade, 0) / (classes.length || 1));

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Education Classes & Cohorts</h1>
          <p className="text-muted-foreground text-sm">
            St. Mary&apos;s Community Church — Manage grade cohorts (Grade 1 – Grade 12, Graduation Class), teacher
            assignments, and rosters.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="shrink-0 gap-2">
          <Plus className="size-4" /> Create Class
        </Button>
      </div>

      {/* 2. Overview KPIs Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <School className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl">{classes.length}</div>
              <div className="text-muted-foreground text-xs">Total Classes</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Users className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl">{totalStudents}</div>
              <div className="text-muted-foreground text-xs">Enrolled Students</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <BookOpen className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">{avgAttendance}%</div>
              <div className="text-muted-foreground text-xs">Avg Attendance</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Filter className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{avgGrade}%</div>
              <div className="text-muted-foreground text-xs">Class Grade Avg</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Filter and View Controls Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-md flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search classes or teachers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue placeholder="Filter Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="primary">Primary (Grade 1-2)</SelectItem>
              <SelectItem value="junior">Junior (Grade 3-5)</SelectItem>
              <SelectItem value="senior">Senior (Grade 6-8)</SelectItem>
              <SelectItem value="graduate">Graduate (Grade 9-10)</SelectItem>
              <SelectItem value="graduation">Graduation (Grade 11-12+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={showProgressionBanner ? "secondary" : "outline"}
            size="sm"
            onClick={() => setShowProgressionBanner(!showProgressionBanner)}
            className="h-9 gap-1.5 text-purple-700 text-xs dark:text-purple-300"
          >
            <Sparkles className="size-3.5" /> Progression Roadmap
          </Button>

          <div className="flex items-center gap-1 rounded-lg border bg-card p-0.5">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 gap-1.5 px-2.5 text-xs"
            >
              <LayoutGrid className="size-3.5" /> Grid
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="h-8 gap-1.5 px-2.5 text-xs"
            >
              <TableIcon className="size-3.5" /> Table
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Collapsible Progression Pathway Banner */}
      {showProgressionBanner && <ProgressionPathwayBanner />}

      {/* 5. Class Content Area */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full space-y-2 rounded-lg border bg-card py-12 text-center text-muted-foreground text-sm">
              <p>No education classes match your search criteria.</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setLevelFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredClasses.map((cls) => <ClassCard key={cls.id} cls={cls} />)
          )}
        </div>
      ) : (
        <ClassTable classes={filteredClasses} />
      )}

      {/* Create Class Dialog Modal */}
      <CreateClassDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
