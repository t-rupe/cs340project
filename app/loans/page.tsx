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
import { AlertDialogDemo } from "@/components/AlertDestructive"; // Ensure this import path is correct
import { DialogDemo } from "@/components/EditDialog";
import { Dialog } from "@radix-ui/react-dialog";
import AddDialog from "@/components/AddDialog";

type Loan = {
  loan_id: number;
  loan_status: string;
  date_checked_out: string;
  date_due: string;
  date_returned: string | null;
  book_id: number;
  member_id: number;
  changed_date: string;
  [key: string]: number | string | null;
};

const LoansPage = () => {
  // Static data for Loans
  const loans: Loan[] = [
    {
      loan_id: 1,
      loan_status: "Checked Out",
      date_checked_out: "2023-02-01",
      date_due: "2023-03-01",
      date_returned: null,
      book_id: 4,
      member_id: 1,
      changed_date: "2023-02-01",
    },
    // Add more loan objects as needed
  ];

  const loanFields = [
    {
      name: "status",
      label: "Status",
      defaultValue: "",
      type: "text",
      isStatusChange: true,
    },
    {
      name: "date_checked_out",
      label: "Date Checked Out",
      defaultValue: "",
      type: "date",
    },
    { name: "date_due", label: "Date Due", defaultValue: "", type: "date" },
    {
      name: "date_returned",
      label: "Date Returned",
      defaultValue: "",
      type: "date",
    },
    {
      name: "book_id",
      label: "Book ID",
      defaultValue: "",
      type: "number",
      isBookId: true,
    },
    {
      name: "member_id",
      label: "Member ID",
      defaultValue: "",
      type: "number",
      isMemberId: true,
    },
    {
      name: "changed_date",
      label: "Changed Date",
      defaultValue: "",
      type: "date",
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center ">
          <h2 className="text-lg font-semibold">Loans</h2>
          <AddDialog fields={loanFields} />{" "}
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Checked Out</TableHead>
              <TableHead>Date Due</TableHead>
              <TableHead>Date Returned</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Changed Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.loan_id}>
                <TableCell>{loan.loan_id}</TableCell>
                <TableCell>{loan.loan_status}</TableCell>
                <TableCell>{loan.date_checked_out}</TableCell>
                <TableCell>{loan.date_due}</TableCell>
                <TableCell>{loan.date_returned || "N/A"}</TableCell>
                <TableCell>{loan.book_id}</TableCell>
                <TableCell>{loan.member_id}</TableCell>
                <TableCell>{loan.changed_date}</TableCell>
                <TableCell className="flex justify-end">
                  <DialogDemo
                    fields={loanFields.map((field) => ({
                      ...field,
                      defaultValue:
                        loan[field.name]?.toString() || field.defaultValue,
                    }))}
                  />

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

export default LoansPage;
