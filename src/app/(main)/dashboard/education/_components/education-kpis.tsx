import { Award, BookOpen, GraduationCap, School } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { teachers } from "@/data/teachers";

export function EducationKpis() {
  const kpis = [
    {
      title: "Active Classes & Cohorts",
      value: "13",
      subtext: "Grade 1 – Grade 12 & Grad",
      icon: School,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    },
    {
      title: "Total Students",
      value: "186",
      subtext: "Enrolled across cohorts",
      icon: GraduationCap,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
    },
    {
      title: "Active Teachers / Catechists",
      value: teachers.length.toString(),
      subtext: "Assigned to grade cohorts",
      icon: School,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      title: "Active Courses",
      value: courses.length.toString(),
      subtext: "Across 6 core subjects",
      icon: BookOpen,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-muted-foreground text-xs">{kpi.title}</CardTitle>
              <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.color}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{kpi.value}</div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{kpi.subtext}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
