import { Award, BookOpen, FileSpreadsheet, GraduationCap, School } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";

export function EducationKpis() {
  const kpis = [
    {
      title: "Total Students",
      value: "186",
      subtext: "Enrolled across 6 levels",
      icon: GraduationCap,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
    },
    {
      title: "Active Teachers / Catechists",
      value: teachers.length.toString(),
      subtext: "Assigned to courses",
      icon: School,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      title: "Active Courses",
      value: courses.length.toString(),
      subtext: "Across 6 core subjects",
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    },
    {
      title: "Average Grade",
      value: "88.4%",
      subtext: "Grade B+ overall",
      icon: Award,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.color}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.subtext}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
