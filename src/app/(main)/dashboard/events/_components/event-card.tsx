import { Calendar, Clock, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChurchEvent } from "@/data/types";

const EVENT_TYPE_STYLES: Record<string, { label: string; badgeClass: string }> = {
  "sunday-service": { label: "Sunday Service", badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
  "bible-study": { label: "Bible Study", badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" },
  "youth-meeting": { label: "Youth Meeting", badgeClass: "bg-purple-500/15 text-purple-700 dark:text-purple-300" },
  "prayer-meeting": { label: "Prayer", badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  "education-exam": { label: "Exam", badgeClass: "bg-red-500/15 text-red-700 dark:text-red-300" },
  community: { label: "Community", badgeClass: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300" },
};

interface EventCardProps {
  event: ChurchEvent;
}

export function EventCard({ event }: EventCardProps) {
  const style = EVENT_TYPE_STYLES[event.type] || {
    label: event.type,
    badgeClass: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="flex flex-col justify-between transition-colors hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={`border-0 font-medium text-[11px] ${style.badgeClass}`}>{style.label}</Badge>
          {event.attendeeCount && (
            <span className="inline-flex items-center gap-1 font-medium text-[11px] text-muted-foreground">
              <Users className="size-3" />
              {event.attendeeCount} expected
            </span>
          )}
        </div>
        <CardTitle className="mt-2 font-bold text-base leading-snug">{event.title}</CardTitle>
        <CardDescription className="mt-1 line-clamp-2 text-xs">{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 pt-0 text-muted-foreground text-xs">
        <div className="grid grid-cols-2 gap-2 border-t pt-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5 text-primary" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-primary" />
            {event.time} {event.endTime ? `- ${event.endTime}` : ""}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" />
          {event.location}
        </div>
      </CardContent>
    </Card>
  );
}
