"use client";

import { useState } from "react";

import Link from "next/link";

import { CalendarCheck, CheckCircle2, FileText, Send, User, Users, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { sundayServiceAttendance } from "@/data/attendance";
import { members } from "@/data/members";
import type { Member, MemberNote } from "@/data/types";

interface MemberProfileTabsProps {
  member: Member;
}

export function MemberProfileTabs({ member }: MemberProfileTabsProps) {
  const [notes, setNotes] = useState<MemberNote[]>(member.notes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteItem: MemberNote = {
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      author: "Admin",
      content: newNote.trim(),
    };

    setNotes([noteItem, ...notes]);
    setNewNote("");
    toast.success("Pastoral note added successfully!");
  };

  const memberAttendance = sundayServiceAttendance.filter((r) => r.memberId === member.id);

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 max-w-md">
        <TabsTrigger value="overview" className="text-xs gap-1.5">
          <User className="size-3.5" /> Overview
        </TabsTrigger>
        <TabsTrigger value="family" className="text-xs gap-1.5">
          <Users className="size-3.5" /> Family ({member.family.length})
        </TabsTrigger>
        <TabsTrigger value="attendance" className="text-xs gap-1.5">
          <CalendarCheck className="size-3.5" /> Attendance
        </TabsTrigger>
        <TabsTrigger value="notes" className="text-xs gap-1.5">
          <FileText className="size-3.5" /> Notes ({notes.length})
        </TabsTrigger>
      </TabsList>

      {/* Tab 1: Overview */}
      <TabsContent value="overview" className="mt-4 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Member Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription>Demographic and membership record details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">{member.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{member.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{member.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium text-right max-w-[200px]">{member.address}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline" className="capitalize text-[10px]">
                  {member.status}
                </Badge>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Joined Date:</span>
                <span className="font-medium">{member.joinedDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Ministry & Attendance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ministry & Engagement</CardTitle>
              <CardDescription>Assigned groups and overall attendance standing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <span className="text-muted-foreground font-medium">Assigned Ministries / Groups:</span>
                <div className="flex flex-wrap gap-1.5">
                  {member.groups.map((grp) => (
                    <Badge key={grp} variant="secondary" className="text-xs">
                      {grp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between font-medium">
                  <span>Attendance Rate</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{member.attendanceRate}%</span>
                </div>
                <Progress value={member.attendanceRate} className="h-2" />
                <p className="text-[11px] text-muted-foreground">Based on Sunday Service records for Q3/Q4 2026.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Tab 2: Family */}
      <TabsContent value="family" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Linked Family Members</CardTitle>
            <CardDescription>Household relationships registered in the church directory</CardDescription>
          </CardHeader>
          <CardContent>
            {member.family.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {member.family.map((fam) => {
                  const relative = members.find((m) => m.id === fam.memberId);
                  if (!relative) return null;
                  return (
                    <Link
                      key={fam.memberId}
                      href={`/dashboard/members/${relative.id}`}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {relative.name[0]}
                        </div>
                        <div className="flex flex-col text-xs">
                          <span className="font-semibold">{relative.name}</span>
                          <span className="text-muted-foreground capitalize">{fam.relationship}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        View Profile
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No linked family members registered.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab 3: Attendance */}
      <TabsContent value="attendance" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance History</CardTitle>
            <CardDescription>Sunday Service attendance records for {member.name}</CardDescription>
          </CardHeader>
          <CardContent>
            {memberAttendance.length > 0 ? (
              <div className="space-y-2">
                {memberAttendance.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between rounded-md border p-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      {rec.status === "present" ? (
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      ) : (
                        <XCircle className="size-4 text-red-500" />
                      )}
                      <span>Sunday Service — {rec.date}</span>
                    </div>
                    <Badge
                      variant={rec.status === "present" ? "default" : "destructive"}
                      className="text-[10px] capitalize"
                    >
                      {rec.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-4 text-center">
                Member attendance rate: <span className="font-bold text-foreground">{member.attendanceRate}%</span> over
                the last 12 weeks.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Tab 4: Notes */}
      <TabsContent value="notes" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Pastoral Note</CardTitle>
            <CardDescription>Record care visits, prayer requests, or administrative notes</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddNote} className="space-y-3">
              <Textarea
                placeholder="Type pastoral care note or updates here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="text-xs min-h-[80px]"
              />
              <Button type="submit" size="sm" className="gap-1.5 text-xs">
                <Send className="size-3.5" /> Save Note
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Author: {note.author}</span>
                  <span>{note.date}</span>
                </div>
                <p className="text-foreground leading-relaxed">{note.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
