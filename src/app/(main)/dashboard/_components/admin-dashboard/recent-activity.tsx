import { BookOpen, Calendar, CheckCircle2, FileSpreadsheet, GraduationCap, UserPlus } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities } from "@/data/activity";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle2,
  GraduationCap,
  UserPlus,
  FileSpreadsheet,
  BookOpen,
  Calendar,
};

export function AdminRecentActivity() {
  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <CardDescription>Latest church events, attendance, and education updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.slice(0, 5).map((activity) => {
            const Icon = (activity.icon && ICON_MAP[activity.icon]) || CheckCircle2;
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border bg-accent/40 text-primary mt-0.5">
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-semibold leading-tight truncate">{activity.title}</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{activity.description}</span>
                  <span className="text-[10px] text-muted-foreground/70 mt-1">{activity.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
