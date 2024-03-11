"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

type BookAudit = {
  book_audit_id: number;
  book_id: number;
  book_status: string;
  changed_date: Date;
};

type BookAuditsPageProps = {
  data: BookAudit | BookAudit[];
};

const BookAuditsPage = ({ data }: BookAuditsPageProps) => {
  const audits = Array.isArray(data) ? data : [data].filter(Boolean);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Book Audits</h2>
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Audit ID</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Changed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit, index) => (
              <TableRow key={index}>
                <TableCell>{audit.book_audit_id}</TableCell>
                <TableCell>{audit.book_id}</TableCell>
                <TableCell>{audit.book_status}</TableCell>
                <TableCell>
                  {audit.changed_date.toISOString().split("T")[0]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default BookAuditsPage;
