import { students } from "@/data/students";

import { StudentTable } from "./_components/student-table";

export default function EducationStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Education Students Directory</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Community Church — 186 total enrolled students across 6 education levels. Representative
          prototype records displayed below.
        </p>
      </div>

      <StudentTable initialStudents={students} />
    </div>
  );
}
