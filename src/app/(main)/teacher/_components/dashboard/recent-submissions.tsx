import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { gradeRecords } from "@/data/grades";

export function RecentSubmissions() {
  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Student Submissions</CardTitle>
        <CardDescription>Latest quiz and exam completions by students</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {gradeRecords.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold leading-tight">{item.studentName}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.subject} • {item.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.score}%</span>
                <Badge variant="outline" className="text-[10px] font-bold">
                  {item.grade}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
