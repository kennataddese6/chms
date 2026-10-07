"use client";

import { useState } from "react";

import {
  Calendar,
  HeartHandshake,
  LayoutGrid,
  Plus,
  Search,
  Table as TableIcon,
  Users,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGroupsStore } from "@/stores/groups/groups-store";

import { CreateGroupDialog } from "./_components/create-group-dialog";
import { GroupCard } from "./_components/group-card";
import { GroupTable } from "./_components/group-table";

export default function AdminGroupsPage() {
  const { groups } = useGroupsStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredGroups = groups.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.leaderName.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === "all" || g.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const totalMembersCount = groups.reduce((sum, g) => sum + g.memberCount, 0);
  const avgAttendance = Math.round(groups.reduce((sum, g) => sum + g.attendanceRate, 0) / (groups.length || 1));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-2xl tracking-tight">Church Groups & Ministries</h1>
          <p className="text-muted-foreground text-sm">
            St. Mary&apos;s Community Church — Manage ministry teams, fellowships, choir, prayer groups, and member
            participation.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} className="shrink-0 gap-2">
          <Plus className="size-4" /> Create Group / Ministry
        </Button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <UsersRound className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl">{groups.length}</div>
              <div className="text-muted-foreground text-xs">Groups & Ministries</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl">{totalMembersCount}</div>
              <div className="text-muted-foreground text-xs">Group Memberships</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <HeartHandshake className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">{avgAttendance}%</div>
              <div className="text-muted-foreground text-xs">Avg Attendance</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Calendar className="size-5" />
            </div>
            <div>
              <div className="font-bold text-2xl">5</div>
              <div className="text-muted-foreground text-xs">Categories</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and View Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex max-w-md flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search groups or leaders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 pl-9 text-xs"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-9 w-[160px] text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ministry">Ministry</SelectItem>
              <SelectItem value="fellowship">Fellowship</SelectItem>
              <SelectItem value="worship">Worship</SelectItem>
              <SelectItem value="discipleship">Discipleship</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 rounded-lg border bg-card p-0.5">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 gap-1.5 px-2.5 text-xs"
          >
            <LayoutGrid className="size-3.5" /> Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8 gap-1.5 px-2.5 text-xs"
          >
            <TableIcon className="size-3.5" /> Table
          </Button>
        </div>
      </div>

      {/* Group Content Area */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.length === 0 ? (
            <div className="col-span-full space-y-2 rounded-lg border bg-card py-12 text-center text-muted-foreground text-sm">
              <p>No church groups match your search criteria.</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            filteredGroups.map((grp) => <GroupCard key={grp.id} group={grp} />)
          )}
        </div>
      ) : (
        <GroupTable groups={filteredGroups} />
      )}

      {/* Create Group Dialog Modal */}
      <CreateGroupDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}
