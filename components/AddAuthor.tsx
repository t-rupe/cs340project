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
import { addAuthor } from "@/app/utils/Authors/addAuthor";
import { useFormStatus } from "react-dom";
import { toast, useToast } from "./ui/use-toast";
import { useFormState } from "react-dom";
import { set, z } from "zod";

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

export default function AddAuthor() {
  const [open, setOpen] = React.useState(false);

  const clientAction = async (formData: FormData) => {
    const author = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
    };

    const result = schema.safeParse(author);
    if (!result.success) {
      const message = result.error.flatten().fieldErrors;

      toast({
        variant: "destructive",
        description: message.first_name || message.last_name,
      });

      return;
    }

    const response = await addAuthor(result.data);

    if (response?.error) {
      toast({
        variant: "destructive",
        description: response.error.first_name || response.error.last_name,
      });
    }

    setOpen(false);
    toast({
      description: "Author added! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Author</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Author</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new author.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" name="first_name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" name="last_name" />
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { toast } = useToast();

  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Adding..." : "Add Author"}
    </Button>
  );
}
