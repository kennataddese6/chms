"use client";

import { use, useState } from "react";

import Link from "next/link";

import { ArrowLeft, Calendar, Clock, Edit, MapPin, Search, Trash2, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { members as allMembers } from "@/data/members";
import { getInitials } from "@/lib/utils";
import { useGroupsStore } from "@/stores/groups/groups-store";

import { CreateGroupDialog } from "../_components/create-group-dialog";

interface GroupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id } = use(params);
  const { getGroupById, removeMemberFromGroup } = useGroupsStore();
  const group = getGroupById(id);

  const [memberSearch, setMemberSearch] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (!group) {
    return (
      <div className="space-y-6 py-12 text-center">
        <h2 className="font-bold text-xl">Group Not Found</h2>
        <p className="text-muted-foreground text-sm">The requested church group or ministry could not be found.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/groups">Back to Groups & Ministries</Link>
        </Button>
      </div>
    );
  }

  const groupLeader = allMembers.find((m) => m.id === group.leaderId) || {
    id: group.leaderId,
    name: group.leaderName,
    email: group.leaderEmail || "leader@stmarys.org.uk",
    phone: "+44 7700 900123",
  };

  const groupMembers = allMembers.filter((m) => group.memberIds.includes(m.id));
  const filteredGroupMembers = groupMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/dashboard/groups">
          <ArrowLeft className="size-3.5" /> Back to Groups & Ministries
        </Link>
      </Button>

      {/* Group Banner Card */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-purple-200 bg-purple-500/10 font-semibold text-purple-700 text-xs dark:text-purple-300"
            >
              {group.category}
            </Badge>
            <Badge variant="secondary" className="text-xs capitalize">
              {group.status}
            </Badge>
          </div>
          <h1 className="font-bold text-2xl tracking-tight">{group.name}</h1>
          <p className="max-w-2xl text-muted-foreground text-xs">{group.description}</p>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" /> {group.meetingSchedule}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {group.location}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
            <Edit className="size-3.5" /> Edit Group
          </Button>
          <Button size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
            <UserPlus className="size-3.5" /> Add Members
          </Button>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Group Leader</span>
            <div className="flex items-center gap-2 pt-1">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary/10 font-semibold text-[10px] text-primary">
                  {getInitials(groupLeader.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-semibold text-xs">{groupLeader.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">{groupLeader.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Enrolled Members</span>
            <div className="font-bold text-2xl">{groupMembers.length}</div>
            <span className="text-[10px] text-muted-foreground">Active group roster</span>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Group Attendance Rate</span>
            <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">{group.attendanceRate}%</div>
            <Progress value={group.attendanceRate} className="h-1.5" />
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="space-y-1 p-4">
            <span className="text-muted-foreground text-xs">Meeting Day & Time</span>
            <div className="truncate pt-1 font-semibold text-xs">{group.meetingSchedule}</div>
            <span className="truncate text-[10px] text-muted-foreground">{group.location}</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Section */}
      <Tabs defaultValue="roster" className="space-y-4">
        <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="roster"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Group Members ({groupMembers.length})
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Upcoming Activities ({(group.upcomingEvents || []).length})
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-none border-transparent border-b-2 py-2 font-semibold text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Recent Activity
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Group Members Roster */}
        <TabsContent value="roster" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search group members..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>
            <Button size="sm" onClick={() => setIsEditDialogOpen(true)} className="gap-1.5 text-xs">
              <UserPlus className="size-3.5" /> Assign / Add Members
            </Button>
          </div>

          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Group Roster ({filteredGroupMembers.length})</CardTitle>
              <CardDescription className="text-xs">Members & volunteers participating in {group.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {filteredGroupMembers.length === 0 ? (
                  <p className="py-6 text-center text-muted-foreground text-xs">
                    No members assigned to this group. Click &quot;Assign / Add Members&quot; to add.
                  </p>
                ) : (
                  filteredGroupMembers.map((mem) => (
                    <div
                      key={mem.id}
                      className="flex items-center justify-between rounded-lg border p-3 text-xs transition-colors hover:bg-accent/30"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarImage src={mem.avatarUrl} alt={mem.name} />
                          <AvatarFallback className="text-xs">{getInitials(mem.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold">{mem.name}</span>
                          <span className="text-[10px] text-muted-foreground">{mem.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="font-medium text-[11px] text-emerald-600 dark:text-emerald-400">
                            {mem.attendanceRate}% Attendance
                          </span>
                          <div className="text-[10px] text-muted-foreground">Joined {mem.joinedDate}</div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeMemberFromGroup(group.id, mem.id)}
                          title="Remove from group"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Upcoming Activities */}
        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {(group.upcomingEvents || []).map((evt) => (
              <Card key={evt.id} className="shadow-xs">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px]">
                      {group.name}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      Upcoming
                    </Badge>
                  </div>
                  <CardTitle className="pt-1 font-bold text-sm">{evt.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-4 pt-0 text-xs">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <MapPin className="size-3.5" />
                    <span>{evt.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 3: Recent Activity */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Group Activity Log</CardTitle>
              <CardDescription className="text-xs">Recent events for {group.name}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3 text-xs">
                {(
                  group.recentActivity || [
                    { id: "g-act1", title: "Monthly fellowship gathering held", date: "3 days ago" },
                    { id: "g-act2", title: "Group attendance logged: 88% present", date: "Sunday" },
                    { id: "g-act3", title: "New event announced by group leader", date: "1 week ago" },
                  ]
                ).map((act) => (
                  <div key={act.id} className="flex items-center gap-3 border-b pb-2.5 last:border-b-0">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <Clock className="size-3.5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{act.title}</p>
                      <span className="text-[10px] text-muted-foreground">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Group / Manage Members Modal */}
      <CreateGroupDialog editingGroup={group} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </div>
  );
}
