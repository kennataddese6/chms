"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { BookOpen, Calendar, GraduationCap, School, Search, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { courses } from "@/data/courses";
import { events } from "@/data/events";
import { members } from "@/data/members";
import { students } from "@/data/students";

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-xs text-muted-foreground sm:w-64 sm:pr-12"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-3.5" />
        <span>Search members, events, courses...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search members, events, or courses..." className="text-xs" />
        <CommandList>
          <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">No results found.</CommandEmpty>

          {/* Members */}
          <CommandGroup heading="Church Members">
            {members.slice(0, 6).map((member) => (
              <CommandItem
                key={member.id}
                value={`member ${member.name} ${member.email}`}
                onSelect={() => handleSelect(`/dashboard/members/${member.id}`)}
                className="text-xs gap-2 cursor-pointer py-2"
              >
                <User className="size-3.5 text-blue-500" />
                <div className="flex flex-col">
                  <span className="font-semibold">{member.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {member.email} • {member.groups.join(", ")}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Events */}
          <CommandGroup heading="Church Events">
            {events.slice(0, 4).map((evt) => (
              <CommandItem
                key={evt.id}
                value={`event ${evt.title} ${evt.location}`}
                onSelect={() => handleSelect("/dashboard/events")}
                className="text-xs gap-2 cursor-pointer py-2"
              >
                <Calendar className="size-3.5 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="font-semibold">{evt.title}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {evt.date} • {evt.location}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Courses & Education */}
          <CommandGroup heading="Education Courses & Students">
            {courses.slice(0, 4).map((crs) => (
              <CommandItem
                key={crs.id}
                value={`course ${crs.title} ${crs.subject}`}
                onSelect={() => handleSelect(`/student/courses/${crs.id}`)}
                className="text-xs gap-2 cursor-pointer py-2"
              >
                <BookOpen className="size-3.5 text-purple-500" />
                <div className="flex flex-col">
                  <span className="font-semibold">{crs.title}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {crs.subject} • Instructor: {crs.teacherName}
                  </span>
                </div>
              </CommandItem>
            ))}
            {students.slice(0, 3).map((std) => (
              <CommandItem
                key={std.id}
                value={`student ${std.name} ${std.level}`}
                onSelect={() => handleSelect(`/dashboard/education/students/${std.id}`)}
                className="text-xs gap-2 cursor-pointer py-2"
              >
                <GraduationCap className="size-3.5 text-amber-500" />
                <div className="flex flex-col">
                  <span className="font-semibold">{std.name} (Student)</span>
                  <span className="text-[10px] text-muted-foreground">
                    Level: {std.level} • Grade: {std.averageGrade}%
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
