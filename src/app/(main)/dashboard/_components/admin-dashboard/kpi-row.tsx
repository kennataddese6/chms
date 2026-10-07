import { Calendar, CalendarCheck, GraduationCap, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { members } from "@/data/members";

export function AdminKpiRow() {
  const totalMembersCount = 427; // Spec total member count
  const activeMembersCount = members.filter((m) => m.status === "active").length;
  const avgAttendance = 312; // Spec average attendance
  const totalStudents = 186; // Spec education students count
  const upcomingEventsCount = 24; // Spec upcoming events count

  const kpis = [
    {
      title: "Total Members",
      value: totalMembersCount.toLocaleString(),
      change: "+12 this month",
      trend: "up",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
      description: `${activeMembersCount} active members`,
    },
    {
      title: "Avg. Sunday Attendance",
      value: avgAttendance.toLocaleString(),
      change: "+4.5% vs last month",
      trend: "up",
      icon: CalendarCheck,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
      description: "73% overall attendance rate",
    },
    {
      title: "Education Students",
      value: totalStudents.toLocaleString(),
      change: "6 education levels",
      trend: "neutral",
      icon: GraduationCap,
      color: "text-purple-600 dark:text-purple-400 bg-purple-500/10",
      description: "12 active catechists/teachers",
    },
    {
      title: "Upcoming Events",
      value: upcomingEventsCount.toLocaleString(),
      change: "Next: Sunday Service",
      trend: "neutral",
      icon: Calendar,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
      description: "Scheduled for this month",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-muted-foreground text-xs">{kpi.title}</CardTitle>
              <div className={`flex size-8 items-center justify-center rounded-lg ${kpi.color}`}>
                <Icon className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{kpi.value}</div>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{kpi.description}</span>
                {kpi.trend === "up" && (
                  <span className="inline-flex items-center font-medium text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="mr-0.5 size-3" />
                    {kpi.change}
                  </span>
                )}
                {kpi.trend === "down" && (
                  <span className="inline-flex items-center font-medium text-red-600 dark:text-red-400">
                    <TrendingDown className="mr-0.5 size-3" />
                    {kpi.change}
                  </span>
                )}
                {kpi.trend === "neutral" && <span className="font-medium text-muted-foreground">{kpi.change}</span>}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
