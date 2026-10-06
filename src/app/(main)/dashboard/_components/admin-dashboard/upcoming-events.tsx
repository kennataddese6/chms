import Link from "next/link";

import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/data/events";

const EVENT_TYPE_BADGES: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  "sunday-service": { label: "Sunday Service", variant: "default" },
  "bible-study": { label: "Bible Study", variant: "secondary" },
  "youth-meeting": { label: "Youth", variant: "outline" },
  "education-exam": { label: "Exam", variant: "destructive" as any },
  community: { label: "Community", variant: "secondary" },
};

export function AdminUpcomingEvents() {
  const upcomingEvents = events.slice(0, 4);

  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">Upcoming Events</CardTitle>
          <CardDescription>Scheduled services and church activities</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs gap-1">
          <Link href="/dashboard/events">
            View All <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3.5">
          {upcomingEvents.map((evt) => {
            const badgeInfo = EVENT_TYPE_BADGES[evt.type] || { label: evt.type, variant: "outline" };
            return (
              <div
                key={evt.id}
                className="flex flex-col gap-1.5 rounded-lg border p-3 transition-colors hover:bg-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs leading-tight">{evt.title}</span>
                  <Badge variant={badgeInfo.variant as any} className="text-[10px] px-1.5 py-0">
                    {badgeInfo.label}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3 text-primary/70" />
                    {evt.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3 text-primary/70" />
                    {evt.time} {evt.endTime ? `- ${evt.endTime}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3 text-primary/70" />
                    {evt.location}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
