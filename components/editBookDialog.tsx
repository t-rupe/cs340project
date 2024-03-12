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
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { toast, useToast } from "./ui/use-toast";
import { editBook } from "@/app/utils/Books/editBook";
import { deleteBookAudit } from "@/app/utils/BookAudits/deleteBookAudit";
import { Checkbox } from "@/components/ui/checkbox";
import { addBookAudit } from "@/app/utils/BookAudits/addBookAudit";
import { getBookById } from "@/app/utils/BookAudits/getBookById";

interface Field {
  name: string;
  label: string;
  defaultValue: string;
  type: string;
}

interface DynamicFormProps {
  fields: Field[];
  className?: string;
}

type Book = {
  book_id: number;
  title: string;
  isbn: string;
  book_category: string;
  book_type: string;
  book_status: string;
  changed_date: Date;
};

interface EditBookDialogProps {
  book: Book;
}

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

export default function EditBookDialog({ book }: EditBookDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [trackInAudit, setTrackInAudit] = React.useState(false);
  const [auditExists, setAuditExists] = React.useState(false);

  React.useEffect(() => {
    const checkAuditExistence = async () => {
      const audit = await getBookById(book.book_id);
      setAuditExists(audit !== null);
    };

    checkAuditExistence();
  }, [book.book_id]);

  const handleAuditChange = (checked: boolean) => {
    setTrackInAudit(checked);
  };

  const currentTime = new Date().toISOString().split("T")[0];

  const fields = [
    {
      name: "book_id",
      label: "ID",
      defaultValue: book.book_id.toString(),
      type: "number",
    },
    {
      name: "title",
      label: "Title",
      defaultValue: book.title,
      type: "text",
    },
    {
      name: "isbn",
      label: "ISBN",
      defaultValue: book.isbn,
      type: "text",
    },
    {
      name: "book_category",
      label: "Category",
      defaultValue: book.book_category,
      type: "text",
    },
    {
      name: "book_type",
      label: "Type",
      defaultValue: book.book_type,
      type: "text",
    },
    {
      name: "book_status",
      label: "Status",
      defaultValue: book.book_status,
      type: "text",
    },
    {
      name: "changed_date",
      label: "Date",
      defaultValue: currentTime,
      type: "date",
    },
  ];

  // Client action to edit an book
  const clientAction = async (formData: FormData) => {
    // Desctructures the input from the 'Edit Book' form & the id from the book prop
    const newBook = {
      book_id: book.book_id,
      title: formData.get("title"),
      isbn: formData.get("isbn"),
      book_category: formData.get("book_category"),
      book_type: formData.get("book_type"),
      book_status: book.book_status,
      changed_date: new Date(),
    };

    // Validates the input and returns early if the input is invalid
    const result = schema.safeParse(newBook);
    if (!result.success) {
      const message = result.error.flatten().fieldErrors;

      console.log("bad message", message);
      // Displays a toast message with the error message if the input is invalid
      toast({
        variant: "destructive",
        description:
          message.title ||
          message.isbn ||
          message.book_category ||
          message.book_type ||
          message.book_status ||
          message.changed_date,
      });

      return;
    }

    // If client side validation passes, send a request to edit the book to the server action 'editBook'
    const response = await editBook(newBook.book_id, result.data);

    // If the response contains an error, display a toast with the error message
    if (response?.error) {
      toast({
        variant: "destructive",
        description:
          response.error.title ||
          response.error.isbn ||
          response.error.book_category ||
          response.error.book_type ||
          response.error.book_status ||
          response.error.changed_date,
      });
    }

    if (trackInAudit && !auditExists) {
      const auditResponse = await addBookAudit({
        book_id: book.book_id,
        book_status: "Available", // or any other status you want to set
        changed_date: new Date(),
      });

      setAuditExists(true);
    } else if (!trackInAudit && auditExists) {
      await deleteBookAudit(book.book_id);
      setAuditExists(false);
    }


    setOpen(false);
    toast({
      description: "Book updated! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 " size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Make changes to the selected book. Submit to save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <DynamicForm fields={fields} />
          <div className="flex gap-2">
            <Checkbox
              checked={trackInAudit}
              onCheckedChange={handleAuditChange}
              id="trackInAudit"
            />
            <Label htmlFor="trackInAudit">
              Track this book in Book Audits?
            </Label>
          </div>
          <p className="text-xs gray-600">
            {auditExists
              ? "This book is currently being tracked in Book Audits"
              : "This book is not currently being tracked in Book Audits"}
          </p>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DynamicForm({ fields, className }: DynamicFormProps) {
  // Renders a dynamic edit form based on the fields prop, defined at the top of the file
  return (
    <div className={cn("grid items-start gap-4", className)}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>

          {/* Displays the book_id field for UI/UX but disables it, preventing users from manually editing book_id */}
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            defaultValue={field.defaultValue.toString()}
            disabled={
              field.name === "book_id" ||
              field.name === "changed_date" ||
              field.name === "book_status"
            }
          />
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
      {pending ? "Updating..." : "Update Book"}
    </Button>
  );
}

export { EditBookDialog };
