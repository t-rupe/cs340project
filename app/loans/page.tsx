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

const LoansPage = () => {
  // Static data for Loans
  const loans = [
    {
      loan_id: 1,
      loan_status: "Checked Out",
      date_checked_out: "2023-02-01",
      date_due: "2023-03-01",
      date_returned: null,
      book_id: 1,
      member_id: 1,
      changed_date: "2023-02-01",
    },
    // Add more loan objects as needed
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-black font-semibold text-lg py-2" colSpan={8}>
                Loans Table
              </TableHead>
            </TableRow>
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
                <TableCell>{loan.date_returned || 'N/A'}</TableCell>
                <TableCell>{loan.book_id}</TableCell>
                <TableCell>{loan.member_id}</TableCell>
                <TableCell>{loan.changed_date}</TableCell>
                <TableCell className="flex justify-end">
                  <Button className="mr-2" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">
                    Delete
                  </Button>
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
