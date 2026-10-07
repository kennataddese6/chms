"use client";

import { Calendar, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { events } from "@/data/events";

interface EventSelectorProps {
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
  onMarkAllPresent: () => void;
}

export function EventSelector({ selectedEventId, onSelectEvent, onMarkAllPresent }: EventSelectorProps) {
  const _selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Calendar className="size-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-muted-foreground text-xs">Select Event / Service</span>
          <Select value={selectedEventId} onValueChange={onSelectEvent}>
            <SelectTrigger className="mt-0.5 h-8 w-[260px] font-medium text-xs">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((evt) => (
                <SelectItem key={evt.id} value={evt.id} className="text-xs">
                  {evt.title} ({evt.date})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:self-end">
        <Button variant="outline" size="sm" onClick={onMarkAllPresent} className="h-8 gap-1.5 text-xs">
          <CheckCheck className="size-4 text-emerald-600" />
          Mark All Present
        </Button>
      </div>
    </div>
  );
}
