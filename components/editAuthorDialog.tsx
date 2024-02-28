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
import { useToast } from "./ui/use-toast";

interface Field {
  name: string;
  label: string;
  defaultValue: string;
  type: string;
}

interface DynamicFormProps {
  fields: Field[];
  className?: string; // Making className optional
}


type Author = {
    author_id: number;
    first_name: string;
    last_name: string;
  };

interface EditAuthorDialogProps {
    author: Author;
  }

  export default function EditAuthorDialog({ author }: EditAuthorDialogProps) {
    const [open, setOpen] = React.useState(false);
  
    const fields = [
      { name: 'author_id', label: 'ID', defaultValue: author.author_id.toString(), type: 'number' },
      { name: 'first_name', label: 'First Name', defaultValue: author.first_name, type: 'text' },
      { name: 'last_name', label: 'Last Name', defaultValue: author.last_name, type: 'text' },
    ];


  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const editAuthorWithId = editAuthor.bind(null, author.author_id);
        editAuthorWithId(formData);
      
        setOpen(false);
      };  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mr-2 " size="sm" variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Author</DialogTitle>
            <DialogDescription>
              Make changes to the selected author. Submit to save changes.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className={cn("grid items-start gap-4")}>
            <DynamicForm fields={fields} />
            <SubmitButton />
          </form>
        </DialogContent>
      </Dialog>
    );
  }
  
function DynamicForm({ fields, className }: DynamicFormProps) {
  return (
    <div className={cn("grid items-start gap-4", className)}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            type={field.type}
            id={field.name}
            name={field.name}
            defaultValue={field.defaultValue.toString()}
            disabled={field.name === 'author_id'} 
          />
        </div>
      ))}
    </div>
  );
}  
  function SubmitButton() {
    const { toast } = useToast();
  
    const { pending } = useFormStatus();
  
    return (
      <Button
        onClick={() => {
          toast({
            description: "Author updated! 🥳",
          });
        }}
        type="submit"
        aria-disabled={pending}
      >
        {pending ? "Updating..." : "Update Author"}
      </Button>
    );
  }
  
  export { EditAuthorDialog };