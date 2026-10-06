import { members } from "@/data/members";

import { MembersTable } from "./_components/members-table";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Church Directory</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Community Church — 427 organization members. Representative prototype records displayed below.
        </p>
      </div>

      <MembersTable initialMembers={members} />
    </div>
  );
}
