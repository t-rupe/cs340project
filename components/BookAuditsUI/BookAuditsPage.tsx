/**
 * This is the BookAuditsPage component. It displays a list of book audits in a table.
 * 
 * The component uses several components from the ShadCN UI library, including Table, TableRow, TableHeader, TableCell, and TableBody.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component receives a 'data' prop, which is an array of book audits to be displayed.
 * 
 * Each book audit has a 'book_audit_id', 'book_id', 'book_status', and 'changed_date'.
 * 
 * The component maps over the 'audits' array and creates a TableRow for each audit. Each TableRow contains four TableCells, one for each property of the audit.
 * 
 */
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
          <p>This table is responsible for tracking the changes to book status for a particular book. </p>
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
