"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { addLoan } from "@/app/utils/Loans/addLoan";
import { useFormStatus } from "react-dom";
import { toast } from ".././ui/use-toast";
import { set, z } from "zod";
import { BookFK } from "@/components/BookFK";
import { MemberFK } from "@/components/MemberFK";

// Zod schema for validating the input
const schema = z.object({
  loan_id: z.number().optional(),
  loan_status: z.enum(["CheckedOut", "Returned"]).default("CheckedOut"),
  date_checked_out: z.date().default(new Date()),
  date_due: z.date().default(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), // 2 weeks from now
  date_returned: z.date().nullable().default(null),
  book_id: z.number().min(1, { message: "Book is required" }),
  member_id: z.number().optional(),
  changed_date: z.date().default(new Date()),
});

export default function AddLoan() {
  const [open, setOpen] = React.useState(false);
  const [selectedBookId, setSelectedBookId] = React.useState("");
  const [selectedMemberId, setSelectedMemberId] = React.useState("");

  React.useEffect(() => {
    console.log("Updated selectedBookId:", selectedBookId);
  }, [selectedBookId, selectedMemberId]);

  // Client action to add a new loan
  const clientAction = async (formData: FormData) => {
    console.log("Form Data:", formData);
    const loan = {
      book_id: Number(formData.get("book_id")),
      member_id: Number(formData.get("member_id")) || undefined,
    };
    console.log("Loan Object:", loan);

    // Validates the input and returns early if the input is invalid.
    const result = schema.safeParse(loan);
    if (!result.success) {
      // Destructures the error message
      const message = result.error.flatten().fieldErrors;
      // Displays a toast message if the input is invalid
      toast({
        variant: "destructive",
        description: message.book_id || message.member_id,
      });
      return;
    }

    // Sends a request to add a new loan to the server action 'addLoan'
    const response = await addLoan(result.data);
    console.log("Server Response:", response);

    // if the response contains an error, display a toast message
    if (response?.error) {
      toast({
        variant: "destructive",
        description: response.error.book_id || response.error.member_id,
      });
    }

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Loan added! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Loan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Loan</DialogTitle>
          <DialogDescription>
            Select a book and member to add a new loan.
          </DialogDescription>
        </DialogHeader>
        {/* pass the clientAction to the AddLoan input form */}
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <input type="hidden" name="book_id" value={selectedBookId} />

          <div className="grid gap-2">
            <Label htmlFor="book_id">Book</Label>
            <BookFK
              defaultValue=""
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="member_id">Member (Optional)</Label>
            <MemberFK
              defaultValue=""
              selectedMemberId={selectedMemberId}
              setSelectedMemberId={setSelectedMemberId}
            />
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  // Displays a 'pending' button while the form is being submitted
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? "Adding..." : "Add Loan"}
    </Button>
  );
}
