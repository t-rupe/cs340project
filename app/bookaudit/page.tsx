'use client';
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
import { AlertDialogDemo } from "@/components/AlertDestructive";
import AddDialog from "@/components/AddDialog";

const BookAuditPage = () => {

    interface BookAudit {
        book_audit_id: number;
        book_id: number;
        book_status: string;
        changed_date: string;
      }

      const bookAuditFields = [
        { name: "book_id", label: "Book ID", type: "number", isBookId: true },
        { name: "book_status", label: "Book Status", type: "text", isStatusChange: true },
        { name: "changed_date", label: "Changed Date", type: "date" },
      ];
      

  // Static data for BookAudit
  const bookAudits: BookAudit[] = [
    {
      book_audit_id: 1,
      book_id: 4,
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
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center ">
          <h2 className="text-lg font-semibold">BookAudit</h2>
          <AddDialog fields={bookAuditFields} />{" "}
        </div>{" "}
        <Table className="bg-white">
          <TableHeader>
          
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
                  <Button variant="outline" className="mr-2" size="sm">
                    Edit
                  </Button>
                  <AlertDialogDemo />
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
