"use client";

import { use, useState } from "react";

import Link from "next/link";

import { ArrowLeft, Clock, Edit, Search, Sparkles, Trash2, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses } from "@/data/courses";
import { students as allStudents } from "@/data/students";
import { teachers as allTeachers } from "@/data/teachers";
import { getInitials } from "@/lib/utils";
import { useClassesStore } from "@/stores/classes/classes-store";

import { CreateClassDialog } from "../_components/create-class-dialog";

interface ClassDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { id } = use(params);
  const { getClassById, removeStudentFromClass } = useClassesStore();
  const cls = getClassById(id);

  const [studentSearch, setStudentSearch] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!cls) {
    return (
      <div className="space-y-6 py-12 text-center">
        <h2 className="font-bold text-xl">Class Not Found</h2>
        <p className="text-muted-foreground text-sm">The requested class could not be found or has been removed.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/education/classes">Back to Classes</Link>
        </Button>
      </div>
    );
  }

  const assignedTeacher = allTeachers.find((t) => t.id === cls.teacherId) || {
    id: cls.teacherId,
    name: cls.teacherName,
    title: "Senior Teacher",
    email: "teacher@stmarys.org.uk",
  };

  const enrolledStudents = allStudents.filter((s) => cls.studentIds.includes(s.id));
  const filteredEnrolledStudents = enrolledStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  const associatedCourses = courses.filter((c) => cls.courseIds?.includes(c.id) || c.level === cls.level);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/dashboard/education/classes">
          <ArrowLeft className="size-3.5" /> Back to Classes & Cohorts
        </Link>
      </Button>

      {/* Class Banner Card */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-500/10 font-semibold text-blue-600 text-xs dark:text-blue-400"
            >
              {cls.gradeLevel}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {cls.status}
            </Badge>
            {cls.progressionNextGrade && (
              <Badge
                variant="outline"
                className="border-purple-200 bg-purple-500/10 text-[10px] text-purple-700 dark:text-purple-300"
              >
                Progression: {cls.gradeLevel} ➔ {cls.progressionNextGrade}
              </Badge>
            )}
          </div>
          <h1 className="font-bold text-2xl tracking-tight">{cls.name}</h1>
          <p className="flex items-center gap-2 text-muted-foreground text-xs">
            <span>Teacher: {cls.teacherName}</span>
            <span>•</span>
            <span>{cls.schedule || "Sundays 09:30 AM"}</span>
            <span>•</span>
            <span>{cls.room || "Room 101"}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
            <Edit className="size-3.5" /> Edit Details
          </Button>
          <Button size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
            <UserPlus className="size-3.5" /> Manage Students
          </Button>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Assigned Teacher</span>
            <div className="flex items-center gap-2 pt-1">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary/10 font-semibold text-[10px] text-primary">
                  {getInitials(assignedTeacher.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-semibold text-xs">{assignedTeacher.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">{assignedTeacher.title}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Enrolled Students</span>
            <div className="font-bold text-2xl">{enrolledStudents.length}</div>
            <span className="text-[10px] text-muted-foreground">Active class roster</span>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Attendance Summary</span>
            <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">{cls.attendanceRate}%</div>
            <Progress value={cls.attendanceRate} className="h-1.5" />
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Class Average Grade</span>
            <div className="font-bold text-2xl text-blue-600 dark:text-blue-400">{cls.averageGrade}%</div>
            <span className="text-[10px] text-muted-foreground">Exam & Quiz average</span>
          </CardContent>
        </Card>
      </div>

      {/* Progression Concept Banner */}
      <Card className="border-purple-500/30 bg-purple-500/5 shadow-xs dark:bg-purple-950/20">
        <CardContent className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="font-semibold text-xs">Cohort Progression Concept</div>
              <p className="text-[11px] text-muted-foreground">
                Upon academic year completion, students in{" "}
                <strong>
                  {cls.name} ({cls.gradeLevel})
                </strong>{" "}
                will automatically transition to <strong>{cls.progressionNextGrade || "Next Grade"}</strong>.
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-purple-300 bg-background text-purple-700 text-xs dark:text-purple-300"
          >
            Target Next: {cls.progressionNextGrade || "Next Grade"}
          </Badge>
        </CardContent>
      </Card>

      {/* Main Tabs Section */}
      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="roster"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Student Roster ({enrolledStudents.length})
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Associated Courses ({associatedCourses.length})
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Recent Activity
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Student Roster */}
        <TabsContent value="roster" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search class roster..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>
            <Button size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
              <UserPlus className="size-3.5" /> Assign / Add Students
            </Button>
          </div>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Enrolled Students ({filteredEnrolledStudents.length})</CardTitle>
              <CardDescription className="text-xs">Student roster for {cls.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {filteredEnrolledStudents.length === 0 ? (
                  <p className="py-6 text-center text-muted-foreground text-xs">
                    No students currently assigned to this class roster. Click &quot;Assign / Add Students&quot; to add.
                  </p>
                ) : (
                  filteredEnrolledStudents.map((std) => (
                    <div
                      key={std.id}
                      className="flex items-center justify-between rounded-lg border p-3 text-xs transition-colors hover:bg-accent/30"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarImage src={std.avatarUrl} alt={std.name} />
                          <AvatarFallback className="text-xs">{getInitials(std.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold">{std.name}</span>
                          <span className="text-[10px] text-muted-foreground">{std.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="hidden w-28 flex-col gap-1 sm:flex">
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>Course Progress</span>
                            <span>{std.progress}%</span>
                          </div>
                          <Progress value={std.progress} className="h-1.5" />
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-blue-600 dark:text-blue-400">{std.averageGrade}%</span>
                          <div className="text-[10px] text-muted-foreground">Avg Grade</div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeStudentFromClass(cls.id, std.id)}
                          title="Remove from class"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Associated Courses */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {associatedCourses.map((crs) => (
              <Card key={crs.id} className="shadow-xs">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px]">
                      {crs.subject}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] capitalize">
                      {crs.status}
                    </Badge>
                  </div>
                  <CardTitle className="pt-1 font-bold text-sm">{crs.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0 text-xs">
                  <p className="line-clamp-2 text-[11px] text-muted-foreground">{crs.description}</p>
                  <div className="flex items-center justify-between border-t pt-2 text-[11px] text-muted-foreground">
                    <span>Teacher: {crs.teacherName}</span>
                    <span>{crs.lessonCount} Lessons</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Recent Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Class Activity Log</CardTitle>
              <CardDescription className="text-xs">Recent events for {cls.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 text-xs">
                {(
                  cls.recentActivity || [
                    { id: "a1", title: "Class syllabus updated by Fr. James Osei", date: "2 days ago" },
                    { id: "a2", title: "Weekly attendance logged: 94% present", date: "Sunday" },
                    { id: "a3", title: "New quiz added for Grade 4", date: "1 week ago" },
                  ]
                ).map((act) => (
                  <div key={act.id} className="flex items-center gap-3 border-b pb-2.5 last:border-b-0">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Clock className="size-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{act.title}</p>
                      <span className="text-[10px] text-muted-foreground">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Class / Manage Students Modal */}
      <CreateClassDialog editingClass={cls} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </div>
  );
}
