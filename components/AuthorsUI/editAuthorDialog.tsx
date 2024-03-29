/**
 * This is the EditAuthorDialog component. It provides a dialog for editing an existing author in the database.
 * The component uses the 'editAuthor' server action to update the record.
 *
 * The component uses several components from the ShadCN UI library, including Button, Dialog, Input, and Label.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 *
 * The component receives an 'author' prop, which is the author to be edited.
 *
 * The component uses a Zod schema to validate the input. If the input is invalid, it displays a toast message with the error message.
 *
 * The component uses a dynamic form to display the fields for editing the author. The fields are defined in the 'fields' state variable.
 *
 * The component uses the 'editAuthor' function to send a request to the server to update the author. If the response contains an error, it displays a toast message with the error message.
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
import { editAuthor } from "@/app/utils/Authors/editAuthor";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { toast, useToast } from "../ui/use-toast";

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

type Author = {
  author_id: number;
  first_name: string;
  last_name: string;
};

interface EditAuthorDialogProps {
  author: Author;
}

const schema = z.object({
  id: z.number().optional(),
  first_name: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(255, { message: "First name is too long" }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(255, { message: "Last name is too long" }),
});

export default function EditAuthorDialog({ author }: EditAuthorDialogProps) {
  const [open, setOpen] = React.useState(false);

  const fields = [
    {
      name: "author_id",
      label: "ID",
      defaultValue: author.author_id.toString(),
      type: "number",
    },
    {
      name: "first_name",
      label: "First Name",
      defaultValue: author.first_name,
      type: "text",
    },
    {
      name: "last_name",
      label: "Last Name",
      defaultValue: author.last_name,
      type: "text",
    },
  ];

  // Client action to edit an author
  const clientAction = async (formData: FormData) => {
    // Desctructures the input from the 'Edit Author' form & the id from the author prop
    const newAuthor = {
      author_id: author.author_id,
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
    };

    // Validates the input and returns early if the input is invalid
    const result = schema.safeParse(newAuthor);
    if (!result.success) {
      const message = result.error.flatten().fieldErrors;

      // Displays a toast message with the error message if the input is invalid
      toast({
        variant: "destructive",
        description: message.first_name || message.last_name,
      });

      return;
    }

    // If client side validation passes, send a request to edit the author to the server action 'editAuthor'
    const response = await editAuthor(newAuthor.author_id, result.data);

    // If the response contains an error, display a toast with the error message
    if (response?.error) {
      toast({
        variant: "destructive",
        description: response.error.first_name || response.error.last_name,
      });
    }

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Author updated! 🥳",
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
          <DialogTitle>Edit Author</DialogTitle>
          <DialogDescription>
            Make changes to the selected author. Submit to save changes.
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

          {/* Displays the author_id field for UI/UX but disables it, preventing users from manually editing author_id */}
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            defaultValue={field.defaultValue.toString()}
            disabled={field.name === "author_id"}
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
      {pending ? "Updating..." : "Update Author"}
    </Button>
  );
}

export { EditAuthorDialog };
