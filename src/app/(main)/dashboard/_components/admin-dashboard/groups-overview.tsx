"use client";

import Link from "next/link";

import { ArrowRight, Users, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGroupsStore } from "@/stores/groups/groups-store";

export function AdminGroupsOverview() {
  const { groups } = useGroupsStore();
  const previewGroups = groups.slice(0, 4);

  return (
    <Card className="col-span-12 shadow-xs lg:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 font-bold text-base">
            <UsersRound className="size-4 text-purple-600 dark:text-purple-400" />
            Groups & Ministries ({groups.length})
          </CardTitle>
          <CardDescription className="text-xs">
            Active church fellowships, choir, prayer teams, and ministry groups.
          </CardDescription>
        </div>
        <Button size="sm" variant="outline" asChild className="gap-1.5 text-xs">
          <Link href="/dashboard/groups">
            View All <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        <div className="grid gap-2.5 sm:grid-cols-2">
          {previewGroups.map((grp) => (
            <div
              key={grp.id}
              className="flex flex-col justify-between space-y-2 rounded-lg border bg-card p-3 text-xs transition-colors hover:border-primary/40"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-purple-500/10 font-medium text-[10px] text-purple-700">
                    {grp.category}
                  </Badge>
                  <span className="font-semibold text-[10px] text-emerald-600">{grp.attendanceRate}% Att.</span>
                </div>
                <h4 className="pt-0.5 font-bold text-xs">{grp.name}</h4>
                <p className="truncate text-[10px] text-muted-foreground">Leader: {grp.leaderName}</p>
              </div>

              <div className="flex items-center justify-between border-t pt-1.5 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="size-3" /> {grp.memberCount} Members
                </span>
                <span className="max-w-[110px] truncate">{grp.meetingSchedule}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
