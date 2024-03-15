/**
 * This is the LoansPage component. It displays a list of loans in a table.
 * The component uses the 'deleteLoan' server action to delete a loan.
 * 
 * The component uses several components from the ShadCN UI library, including Table, TableRow, TableHeader, TableCell, TableBody, and DeleteButton.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component receives a 'data' prop, which is an array of loans to be displayed.
 * 
 * Each loan has a 'loan_id', 'loan_status', 'date_checked_out', 'date_due', 'date_returned', 'book_id', 'member_id', and 'changed_date'.
 * 
 * The component maps over the 'loans' array and creates a TableRow for each loan. Each TableRow contains eight TableCells, one for each property of the loan.
 * 
 * The component uses the 'AddLoan' and 'EditLoanDialog' components to provide functionality for adding and editing loans.
 * 
 * The component uses the 'deleteLoan' function to delete a loan. The 'deleteLoan' function is passed to the 'DeleteButton' component as a prop.
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
import { DeleteButton } from "@/components/AlertDestructive";
import AddLoan from "./AddLoan";
import { deleteLoan } from "@/app/utils/Loans/deleteLoan";
import EditLoanDialog from "./EditLoanDialog";

type Loan = {
  loan_id: number;
  loan_status: string;
  date_checked_out: Date;
  date_due: Date;
  date_returned: Date;
  book_id: number;
  member_id: number;
  changed_date: Date;
};

type LoanPageProps = {
  data: Loan[];
};
const LoansPage = ({ data }: LoanPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Loans</h2>
          {/* Below is the component for the AddAuthor Dialog */}
          <AddLoan />
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Loan ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Member ID</TableHead>
              <TableHead>Checked Out</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Returned Date</TableHead>

              <TableHead>Changed Date</TableHead>

              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.loan_id}</TableCell>
                <TableCell>{loan.loan_status}</TableCell>
                <TableCell>{loan.book_id}</TableCell>
                <TableCell>{loan.member_id}</TableCell>
                <TableCell>
                  {loan.date_checked_out.toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                  {loan.date_due.toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                  {loan.date_returned?.toISOString().split("T")[0] ?? "N/A"}
                </TableCell>

                <TableCell>
                  {loan.changed_date.toISOString().split("T")[0]}
                </TableCell>

                <TableCell className="flex justify-end">
                  <EditLoanDialog loan={loan} />
                  <DeleteButton
                    deleteFunction={deleteLoan}
                    id={loan.loan_id}
                    type="Loan"
                  />
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
