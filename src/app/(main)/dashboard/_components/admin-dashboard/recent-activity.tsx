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
        <CardTitle className="font-semibold text-base">Recent Activity</CardTitle>
        <CardDescription>Latest church events, attendance, and education updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.slice(0, 5).map((activity) => {
            const Icon = (activity.icon && ICON_MAP[activity.icon]) || CheckCircle2;
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-accent/40 text-primary">
                  <Icon className="size-4" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-semibold text-xs leading-tight">{activity.title}</span>
                  <span className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{activity.description}</span>
                  <span className="mt-1 text-[10px] text-muted-foreground/70">{activity.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
