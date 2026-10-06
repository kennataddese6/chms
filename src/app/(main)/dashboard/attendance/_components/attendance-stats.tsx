import { CheckCircle2, Percent, Users, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttendanceStatsProps {
  presentCount: number;
  absentCount: number;
  totalMembers: number;
}

export function AttendanceStats({ presentCount, absentCount, totalMembers }: AttendanceStatsProps) {
  const rate = totalMembers > 0 ? Math.round((presentCount / totalMembers) * 100) : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium text-muted-foreground">Present</CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{presentCount}</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Marked present</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium text-muted-foreground">Absent</CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600">
            <XCircle className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{absentCount}</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Marked absent</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium text-muted-foreground">Attendance Rate</CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
            <Percent className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{rate}%</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Of total membership</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium text-muted-foreground">Total Expected</CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
            <Users className="size-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMembers}</div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Church members</p>
        </CardContent>
      </Card>
    </div>
  );
}
