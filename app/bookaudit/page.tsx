import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const BookAuditPage = () => {
  // Static data for BookAudit
  const bookAudits = [
    {
      book_audit_id: 1,
      book_id: 1,
      book_status: "Checked Out",
      changed_date: "2023-02-15",
    },
    {
      book_audit_id: 2,
      book_id: 2,
      book_status: "Available",
      changed_date: "2023-02-16",
    },
    {
      book_audit_id: 3,
      book_id: 3,
      book_status: "Missing",
      changed_date: "2023-02-17",
    },
    // Add more book audit records as needed
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-black font-semibold text-lg py-2"
                colSpan={4}
              >
                Book Audit Table
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Audit ID</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Changed Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookAudits.map((audit) => (
              <TableRow key={audit.book_audit_id}>
                <TableCell>{audit.book_audit_id}</TableCell>
                <TableCell>{audit.book_id}</TableCell>
                <TableCell>{audit.book_status}</TableCell>
                <TableCell>{audit.changed_date}</TableCell>
                <TableCell className="flex justify-end">
                  <Button className="mr-2" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default BookAuditPage;
