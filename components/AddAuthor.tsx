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
import { useToast } from "./ui/use-toast";

export default function AddAuthor() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addAuthor(formData);

    setOpen(false);
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
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4")}>
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
    <Button
      onClick={() => {
        toast({
          description: "Author added! 🥳",
        });
      }}
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Adding..." : "Add Author"}
    </Button>
  );
}
