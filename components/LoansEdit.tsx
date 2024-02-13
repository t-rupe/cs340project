'use client';
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

interface Field {
    name: string;
    label: string;
    defaultValue: string;
    type: string; // You might want to be more specific here, e.g., "text" | "email" | "date"
  }
  
  interface DynamicFormProps {
    fields: Field[];
    className?: string; // Making className optional
  }
  
  interface DrawerDialogDemoProps {
    fields: Field[];
  }


export default function DialogDemo({ fields }: DrawerDialogDemoProps) {
    const [open, setOpen] = React.useState(false);
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
            <DialogDescription>
              Make changes to the selected record. Submit to save changes.
            </DialogDescription>
          </DialogHeader>
          <DynamicForm fields={fields} />
        </DialogContent>
      </Dialog>
    );
  }
  
  function DynamicForm({ fields, className }: DynamicFormProps) {
    return (
      <form className={cn("grid items-start gap-4", className)}>
        {fields.map((field, index) => (
          <div key={index} className="grid gap-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input type={field.type} id={field.name} defaultValue={field.defaultValue} />
          </div>
        ))}
        <Button type="submit">Save changes</Button>
      </form>
    );
  }

export { DialogDemo };
  