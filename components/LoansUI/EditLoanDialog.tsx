/**
 * This is the EditLoanDialog component. It provides a dialog for editing a loan.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, Label, and Select.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'editLoan' server action to edit the loan.
 * 
 * The component uses a Zod schema to validate the input. If the input is invalid, it displays a toast message with the error message.
 * 
 * The component uses a dynamic form to display the fields for editing a loan. The fields are defined in the 'fields' state variable.
 * 
 * The component uses the 'clientAction' function to send a request to the server to edit the loan. If the response contains an error, it displays a toast message with the error message.
 * 
 * If the response is successful, it closes the dialog and displays a 'successful' toast message.
 */
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
import { MemberFK } from "@/components/MembersUI/MemberFK";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";

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
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedMemberId: string;
  setSelectedMemberId: (memberId: string) => void;
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
  loan_status: z.enum(["Checked-Out", "Returned", "Overdue"]),
  date_checked_out: z.date(),
  date_due: z.date(),
  date_returned: z.date().nullable(),
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
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined
  );

  const setSelectedDateWithStatusCheck = (date: Date | undefined) => {
    console.log(selectedDate);
    console.log(selectedStatus);
    setSelectedDate(date);
    if (date && loan.date_checked_out > date) {
      setSelectedStatus("Overdue");
    }
  };

  const fields = [
    {
      name: "loan_id",
      label: "ID",
      defaultValue: loan.loan_id.toString(),
      type: "number",
    },
    {
      name: "book_id",
      label: "Book ID",
      defaultValue: loan.book_id.toString(),
      type: "number",
    },
    {
      name: "member_id",
      label: "Member (Optional)",
      defaultValue: loan.member_id?.toString() || "",
      type: "select",
    },
    {
      name: "loan_status",
      label: "Status",
      defaultValue: loan.loan_status,
      type: "text",
    },
    {
      name: "date_due",
      label: "Date Due",
      defaultValue: loan.date_due.toISOString().split("T")[0],
      type: "date",
    },
    {
      name: "date_checked_out",
      label: "Date Checked Out",
      defaultValue: loan.date_checked_out.toISOString().split("T")[0],
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
      loan_status: selectedStatus,
      date_checked_out: loan.date_checked_out,
      date_due: selectedDate ? new Date(selectedDate) : loan.date_due,
      date_returned: selectedStatus === "Returned" ? new Date() : null,
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
    console.log(response);

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
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDateWithStatusCheck}
            selectedMemberId={selectedMemberId}
            setSelectedMemberId={setSelectedMemberId}
          />

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DynamicForm({
  fields,
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
  selectedMemberId,
  setSelectedMemberId,
}: DynamicFormProps) {
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    console.log("Status changed to:", value);
  };

  return (
    <div className={cn("grid items-start gap-4")}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>

          {field.name === "loan_status" ? (
            <Select
              onValueChange={handleStatusChange}
              value={selectedStatus}
              defaultValue="Select Status"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem
                    value="Checked-Out"
                    disabled={selectedStatus === "Checked-Out"}
                  >
                    Checked-Out
                  </SelectItem>
                  <SelectItem
                    value="Returned"
                    disabled={selectedStatus === "Returned"}
                  >
                    Returned
                  </SelectItem>
                  <SelectItem value="Overdue" disabled>
                    Overdue
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : field.name === "date_due" ? (
            <DatePicker selected={selectedDate} onSelect={setSelectedDate} />
          ) : field.name === "member_id" ? (
            <MemberFK
              defaultValue={selectedMemberId}
              selectedMemberId={selectedMemberId}
              setSelectedMemberId={setSelectedMemberId}
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
