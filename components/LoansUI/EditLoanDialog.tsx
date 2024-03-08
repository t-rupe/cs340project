"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editLoan } from "@/app/utils/Loans/editLoan";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { toast } from ".././ui/use-toast";
import { MemberFK } from "@/components/MemberFK";
import { ComboBoxResponsive } from "../StatusChange";

interface Field {
  name: string;
  label: string;
  defaultValue: string;
  type: string;
}

interface DynamicFormProps {
  fields: Field[];
  className?: string;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

type Loan = {
  loan_id: number;
  loan_status: string;
  date_checked_out: Date;
  date_due: Date;
  date_returned: Date | null;
  book_id: number;
  member_id: number | null;
  changed_date: Date;
};

interface EditLoanDialogProps {
  loan: Loan;
}

const schema = z.object({
  loan_id: z.number().optional(),
  loan_status: z.enum(["checked-out", "returned"]),

  date_checked_out: z.date(),
  date_due: z.date(),
  date_returned: z.date(),
  book_id: z.number(),
  member_id: z.number().nullable(),
  changed_date: z.date(),
});

export default function EditLoanDialog({ loan }: EditLoanDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedMemberId, setSelectedMemberId] = React.useState(
    loan.member_id?.toString() || ""
  );
  const [selectedStatus, setSelectedStatus] = React.useState(loan.loan_status);

  const fields = [
    {
      name: "loan_id",
      label: "ID",
      defaultValue: loan.loan_id.toString(),
      type: "number",
    },
    {
      name: "loan_status",
      label: "Status",
      defaultValue: loan.loan_status,
      type: "text",
    },
    {
      name: "book_id",
      label: "Book ID",
      defaultValue: loan.book_id.toString(),
      type: "number",
    },
    {
      name: "member_id",
      label: "Member ID",
      defaultValue: loan.member_id?.toString() || "",
      type: "number",
    },
    {
      name: "date_checked_out",
      label: "Date Checked Out",
      defaultValue: loan.date_checked_out.toISOString().split("T")[0],
      type: "date",
    },
    {
      name: "date_due",
      label: "Date Due",
      defaultValue: loan.date_due.toISOString().split("T")[0],
      type: "date",
    },
    {
      name: "date_returned",
      label: "Date Returned",
      defaultValue: loan.date_returned
        ? loan.date_returned.toISOString().split("T")[0]
        : "",
      type: "date",
    },
  ];

  // Client action to edit a loan
  const clientAction = async (formData: FormData) => {
    // Destructures the input from the 'Edit Loan' form & the id from the loan prop
    const newLoan = {
      loan_id: loan.loan_id,
      loan_status: "returned",
      date_checked_out: new Date(formData.get("date_checked_out") as string),
      date_due: new Date(formData.get("date_due") as string),
      date_returned: selectedStatus === "returned" ? new Date() : null,
      book_id: loan.book_id,
      member_id: Number(selectedMemberId) || null,
      changed_date: new Date(),
    };

    // Validates the input and returns early if the input is invalid
    const result = schema.safeParse(newLoan);
    if (!result.success) {
      const message = result.error.flatten().fieldErrors;

      // Displays a toast message with the error message if the input is invalid
      toast({
        variant: "destructive",
        description:
          message.loan_status ||
          message.date_checked_out ||
          message.date_due ||
          message.date_returned ||
          message.book_id ||
          message.member_id,
      });

      return;
    }

    // If client side validation passes, send a request to edit the loan to the server action 'editLoan'
    const response = await editLoan(newLoan.loan_id, result.data);

    // If the response contains an error, display a toast with the error message
    if (response?.error) {
      toast({
        variant: "destructive",
        description:
          response.error.loan_status ||
          response.error.date_checked_out ||
          response.error.date_due ||
          response.error.date_returned ||
          response.error.book_id ||
          response.error.member_id,
      });
    }

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Loan updated! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2" size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Loan</DialogTitle>
          <DialogDescription>
            Make changes to the selected loan. Submit to save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <DynamicForm
            fields={fields}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          {!loan.member_id && (
            <div className="grid gap-2">
              <Label htmlFor="member_id">Member (Optional)</Label>
              <MemberFK
                defaultValue={selectedMemberId}
                selectedMemberId={selectedMemberId}
                setSelectedMemberId={setSelectedMemberId}
              />
            </div>
          )}
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DynamicForm({
  fields,
  className,
  selectedStatus,
  setSelectedStatus,
}: DynamicFormProps) {
  return (
    <div className={cn("grid items-start gap-4", className)}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>

          <input type="hidden" name="loan_status" value={selectedStatus} />

          {field.name === "loan_status" ? (
            <ComboBoxResponsive
              defaultValue={field.defaultValue}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          ) : (
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              defaultValue={field.defaultValue}
              disabled={
                field.name === "loan_id" ||
                field.name === "book_id" ||
                field.name === "date_checked_out" ||
                field.name === "date_due" ||
                field.name === "date_returned"
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SubmitButton() {
  // Displays a 'pending' button while the form is being submitted
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Updating..." : "Update Loan"}
    </Button>
  );
}

export { EditLoanDialog };
