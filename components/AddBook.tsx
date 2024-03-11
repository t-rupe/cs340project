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
import { toast } from "./ui/use-toast";
import { z } from "zod";
import { addBook } from "@/app/utils/Books/addBook";
import { addBookAudit } from "@/app/utils/BookAudits/addBookAudit";
import { getBookId } from "@/app/utils/BookAudits/getBookId";
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

    const bookID = await getBookId(result.data.title)
    const bookAudit = {
      book_id: bookID,
      book_status: "Available",
      changed_date: new Date(),
    };

    // Send a request to create a new book_audit record
    const auditResponse = await addBookAudit(bookAudit);
    

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Book added! 🥳",
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
