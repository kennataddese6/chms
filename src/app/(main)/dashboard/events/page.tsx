"use client";

import { useState } from "react";

import { events as initialEvents } from "@/data/events";
import type { ChurchEvent } from "@/data/types";

import { CreateEventDialog } from "./_components/create-event-dialog";
import { EventCard } from "./_components/event-card";

export default function EventsPage() {
  const [eventList, setEventList] = useState<ChurchEvent[]>(initialEvents);

  const handleAddEvent = (newEvent: ChurchEvent) => {
    setEventList([newEvent, ...eventList]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Church Events & Calendar</h1>
          <p className="text-sm text-muted-foreground">
            St. Mary&apos;s Community Church — Manage worship services, Bible studies, and exams.
          </p>
        </div>
        <CreateEventDialog onAddEvent={handleAddEvent} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventList.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
