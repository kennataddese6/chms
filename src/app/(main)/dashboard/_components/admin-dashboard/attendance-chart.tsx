"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyAttendanceHistory } from "@/data/attendance";

export function AdminAttendanceChart() {
  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Weekly Attendance Trend</CardTitle>
        <CardDescription>Sunday Service attendance records over the last 12 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyAttendanceHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} className="text-[11px] fill-muted-foreground" />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-[11px] fill-muted-foreground"
                domain={[200, 360]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-popover p-2.5 shadow-md text-xs">
                        <p className="font-semibold">
                          {label} ({data.date})
                        </p>
                        <div className="mt-1 flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">Present:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{data.present}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-muted-foreground">Absent:</span>
                          <span className="font-medium text-muted-foreground">{data.absent}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="present"
                stroke="var(--color-primary, #3b82f6)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#attendanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
