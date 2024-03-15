/**
 * This is the AddBook component. It provides a form for adding a new book to the database.
 * The component uses the 'addBook' and 'addBookAudit' server actions to add the new record and optionally track it in the book audits.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Dialog, Input, Label, and Checkbox.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses a Zod schema to validate the input. If the input is invalid, it displays a toast message with the error message.
 * 
 * The component uses a dynamic form to display the fields for adding a book. The fields are defined in the 'fields' state variable.
 * 
 * The component uses the 'addBook' function to send a request to the server to add the book. If the response contains an error, it displays a toast message with the error message.
 * 
 * If the user chooses to track the book in the book audits, the component uses the 'addBookAudit' function to send a request to the server to add a book audit.
 * 
 * If the response is successful, it closes the dialog and displays a 'successful' toast message.
 */
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { toast } from "../ui/use-toast";
import { z } from "zod";
import { addBook } from "@/app/utils/Books/addBook";
import { addBookAudit } from "@/app/utils/BookAudits/addBookAudit";
import { getBookId } from "@/app/utils/BookAudits/getBookId";

import { Checkbox } from "@/components/ui/checkbox";

// Zod schema for validating the input
const schema = z.object({
  book_id: z.number().optional(),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title is too long" }),
  isbn: z
    .string()
    .trim()
    .min(1, { message: "ISBN is required" })
    .max(255, { message: "ISBN is too long" }),
  book_category: z
    .string()
    .trim()
    .min(1, { message: "Book category is required" })
    .max(255, { message: "Book category is too long" }),
  book_type: z
    .string()
    .trim()
    .min(1, { message: "Book type is required" })
    .max(255, { message: "Book type is too long" }),
  book_status: z.string().optional(),
  changed_date: z.date().optional(),
});

export default function AddBook() {
  const [open, setOpen] = React.useState(false);

  const [trackInAudit, setTrackInAudit] = React.useState(false);

  const handleCheckboxChange = () => {
    setTrackInAudit(!trackInAudit);
  };

  // Client action to add a new book
  const clientAction = async (formData: FormData) => {
    // Destructures the input from the 'Add New Book' form
    const book = {
      title: formData.get("title"),
      isbn: formData.get("isbn"),

      book_category: formData.get("book_category"),
      book_type: formData.get("book_type"),
      book_status: "Available",
      changed_date: new Date(),
    };

    // Validates the input and returns early if the input is invalid.
    const result = schema.safeParse(book);
    console.log("check result", result);
    if (!result.success) {
      // Destructures the error message
      const message = result.error.flatten().fieldErrors;
      console.log("bad message", message);

      // Displays a toast message if the input is invalid
      toast({
        variant: "destructive",
        description:
          message.title ||
          message.isbn ||
          message.book_category ||
          message.book_type,
      });

      return;
    }

    // Sends a request to add a new book to the server action 'addBook'
    const response = await addBook(result.data);

    // if the response contains an error, display a toast message
    if (response?.error) {
      toast({
        variant: "destructive",
        description:
          response.error.title ||
          response.error.isbn ||
          response.error.book_category ||
          response.error.book_type,
      });
    }

    console.log("response", result.data);

    const bookID = await getBookId(result.data.title);

    // Send a request to create a new book_audit record if a user chooses to add the tracking for that added book.
    if (trackInAudit) {
      const bookAudit = {
        book_id: bookID,
        book_status: "Available",
        changed_date: new Date(),
      };

      await addBookAudit(bookAudit);
    }

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Book added successfully! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new book.
          </DialogDescription>
        </DialogHeader>
        {/* pass the clientAction to the Addbook input form */}
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="book_category">Category</Label>
            <Input id="book_category" name="book_category" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="book_type">Type</Label>
            <Input id="book_type" name="book_type" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onCheckedChange={handleCheckboxChange}
              id="trackInAudit"
            />
            <Label htmlFor="trackInAudit">
              Track this book in Book Audits?
            </Label>
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
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Adding..." : "Add Book"}
    </Button>
  );
}
