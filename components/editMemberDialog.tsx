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
import { editMember } from "@/app/utils/Members/editMember";

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

type Member = {
    member_id: number; 
    member_first_name: string; 
    member_last_name: string; 
    phone_1: string; 
    phone_2: string; 
    street_1: string; 
    street_2: string; 
    city: string; 
    state: string; 
    country: string; 
    zip_code: string; 
    created_date: Date; 
    changed_date: Date; 
};
};

interface EditMemberDialogProps {
  member: Member;
}

const schema = z.object({
    member_id: z.number().optional(),
    member_first_name: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .max(255, { message: "First name is too long" }),
    member_last_name: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .max(255, { message: "Last name is too long" }),
    phone_1: z
      .string()
      .trim()
      .min(1, { message: "Phone 1 is required" })
      .max(255, { message: "Phone 1 is too long" }),
    phone_2: z.string().optional(),
    street_1: z
      .string()
      .trim()
      .min(1, { message: "Street 1 is required" })
      .max(255, { message: "Street 1 is too long" }),
    street_2: z.string().optional(),
    city: z
      .string()
      .trim()
      .min(1, { message: "City is required" })
      .max(255, { message: "City is too long" }),
    state: z
      .string()
      .trim()
      .min(1, { message: "State is required" })
      .max(255, { message: "State is too long" }),
    country: z
      .string()
      .trim()
      .min(1, { message: "Country is required" })
      .max(255, { message: "Country is too long" }),
    zip_code: z
      .string()
      .trim()
      .min(1, { message: "Zip code is required" })
      .max(255, { message: "Zip code is too long" }),
    created_date: z.date(),
    changed_date: z.date(),
});
export default function EditMemberDialog({ member }: EditMemberDialogProps) {
  const [open, setOpen] = React.useState(false);

  const currentTime = new Date().toISOString().split('T')[0];

  const fields = [
    {
      name: "member_id",
      label: "ID",
      defaultValue: member.member_id.toString(),
      type: "number",
    },
    {
      name: "member_first_name",
      label: "Member First Name",
      defaultValue: member.member_first_name,
      type: "text",
    },
    {
        name: "member_last_name",
        label: "Member Last Name",
        defaultValue: member.member_last_name,
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

    // If the response is successful, close the dialog and display a 'successful' toast message
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
