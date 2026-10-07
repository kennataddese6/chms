"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const gradeDistributionData = [
  { grade: "A (93-100%)", count: 48, fill: "var(--color-primary, #3b82f6)" },
  { grade: "A- (90-92%)", count: 36, fill: "var(--color-primary, #3b82f6)" },
  { grade: "B+ (87-89%)", count: 42, fill: "var(--color-primary, #3b82f6)" },
  { grade: "B (83-86%)", count: 30, fill: "var(--color-primary, #3b82f6)" },
  { grade: "B- (80-82%)", count: 18, fill: "var(--color-primary, #3b82f6)" },
  { grade: "C+ & below", count: 12, fill: "var(--color-primary, #3b82f6)" },
];

export function EducationCharts() {
  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardHeader>
        <CardTitle className="font-semibold text-base">Grade Distribution</CardTitle>
        <CardDescription>Academic performance across all 186 enrolled students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
              <XAxis dataKey="grade" tickLine={false} axisLine={false} className="fill-muted-foreground text-[10px]" />
              <YAxis tickLine={false} axisLine={false} className="fill-muted-foreground text-[11px]" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-popover p-2 text-xs shadow-md">
                        <p className="font-semibold">{data.grade}</p>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">{data.count} students</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" fill="var(--color-primary, #3b82f6)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
