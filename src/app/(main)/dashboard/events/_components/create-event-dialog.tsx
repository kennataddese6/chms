"use client";

import { useState } from "react";

import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ChurchEvent, EventType } from "@/data/types";

interface CreateEventDialogProps {
  onAddEvent: (event: ChurchEvent) => void;
}

export function CreateEventDialog({ onAddEvent }: CreateEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<EventType>("sunday-service");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const newEvt: ChurchEvent = {
      id: `evt-${Date.now()}`,
      title,
      type,
      date,
      time,
      location: location || "Main Sanctuary",
      description: description || "Church gathering event.",
      attendeeCount: 50,
    };

    onAddEvent(newEvt);
    toast.success(`Event "${title}" scheduled successfully!`);
    setOpen(false);

    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5">
          <CalendarPlus className="size-4" />
          Schedule Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Schedule New Event</DialogTitle>
            <DialogDescription>Create a service, study session, or church activity.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-xs">
                Event Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Youth Prayer & Worship Night"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="type" className="text-xs">
                  Category
                </Label>
                <Select value={type} onValueChange={(val) => setType(val as EventType)}>
                  <SelectTrigger id="type" className="h-9 text-xs">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday-service">Sunday Service</SelectItem>
                    <SelectItem value="bible-study">Bible Study</SelectItem>
                    <SelectItem value="youth-meeting">Youth Meeting</SelectItem>
                    <SelectItem value="prayer-meeting">Prayer Meeting</SelectItem>
                    <SelectItem value="education-exam">Education Exam</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date" className="text-xs">
                  Date
                </Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="time" className="text-xs">
                  Start Time
                </Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-xs">
                  Location / Room
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Main Sanctuary"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="text-xs">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Details, speakers, or special notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[70px] text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Publish Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
