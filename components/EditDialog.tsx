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
import { ComboBoxResponsive } from "./StatusChange";
import { BookFK } from "@/components/BookFK";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberFK } from "./MemberFK";
import { AuthorFK } from "./AuthorFK";

interface Field {
  name: string;
  label: string;
  defaultValue: string;
  type: string;
  isStatusChange?: boolean;
  isBookId?: boolean;
  isMemberId?: boolean;
  isAuthorId?: boolean;  
}

interface DynamicFormProps {
  fields: Field[];
  className?: string; 
}

interface DrawerDialogDemoProps {
  fields: Field[];
}

export default function DialogDemo({ fields }: DrawerDialogDemoProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mr-2 " size="sm" variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
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
          {field.isStatusChange ? (
            <ComboBoxResponsive defaultValue={field.defaultValue.toString()} />
          ) : field.isBookId ? (
            <BookFK defaultValue={field.defaultValue.toString()} />
          ) : field.isMemberId ? (
            <MemberFK defaultValue={field.defaultValue.toString()} />
          ) : field.isAuthorId ? ( 
            <AuthorFK defaultValue={field.defaultValue.toString()} /> 
          ) : (
            <Input
              type={field.type}
              id={field.name}
              defaultValue={field.defaultValue.toString()}
            />
          )}
        </div>
      ))}

      <Button type="submit">Save changes</Button>
    </form>
  );
}

export { DialogDemo };
