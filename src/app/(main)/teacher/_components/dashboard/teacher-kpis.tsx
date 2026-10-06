import { Award, FileSpreadsheet, School, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teachers } from "@/data/teachers";

export function TeacherKpis() {
  const currentTeacher = teachers[0]; // Fr. James Osei

  const kpis = [
    {
      title: "My Classes",
      value: currentTeacher.classIds.length.toString(),
      subtext: "Grade 1 & Senior level",
      icon: School,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      title: "Total Students",
      value: currentTeacher.studentCount.toString(),
      subtext: "Enrolled across classes",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    },
    {
      title: "Upcoming Exams",
      value: "2",
      subtext: "Senior Level Exegesis & Theology",
      icon: FileSpreadsheet,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
    },
    {
      title: "Class Average Performance",
      value: "90.2%",
      subtext: "Grade A- average standing",
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
