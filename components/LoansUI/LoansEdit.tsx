/**
 * This is the LoansEdit Dialog component. It provides a dialog for editing a loan.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, and Label.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'ComboBoxResponsive' component from '@/components/LoansUI/LoansStatusChange' to provide a dropdown for changing the loan status.
 * 
 * The component uses the 'BookFK' and 'MemberFK' components to provide dropdowns for selecting a book and a member.
 * 
 * The component receives a 'fields' prop, which is an array of fields to be displayed in the form. Each field has a 'name', 'label', 'defaultValue', 'type', and optional 'isStatusChange', 'isBookId', and 'isMemberId' properties.
 * 
 * The component maps over the 'fields' array and creates a form field for each field. If 'isStatusChange' is true, it creates a ComboBoxResponsive. If 'isBookId' is true, it creates a BookFK. If 'isMemberId' is true, it creates a MemberFK. Otherwise, it creates an Input.
 * 
 * The component uses a 'DynamicForm' component to display the form fields. The 'DynamicForm' component receives the 'fields' prop and optional 'className' prop.
 * 
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
import { ComboBoxResponsive } from "@/components/LoansUI/LoansStatusChange";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookFK } from "../BookFK";
import { MemberFK } from "../MembersUI/MemberFK";

interface Field {
  name: string;
  isStatusChange?: boolean;

  label: string;
  defaultValue: string;
  type: string;
  isBookId?: boolean;
  isMemberId?: boolean;
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
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Changing and then saving the Status will automatically update the
            related attributes for this record.
          </DialogDescription>
        </DialogHeader>
        <DynamicForm fields={fields} />
      </DialogContent>
    </Dialog>
  );
}

function DynamicForm({ fields, className }: DynamicFormProps) {
  const [selectedBookId, setSelectedBookId] = React.useState("");
  const [selectedMemberId, setSelectedMemberId] = React.useState("");

  return (
    <form className={cn("grid items-start gap-4", className)}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.isStatusChange ? (
            <ComboBoxResponsive defaultValue={field.defaultValue.toString()} />
          ) : field.isBookId ? (
            <BookFK
              defaultValue={field.defaultValue.toString()}
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
            />
          ) : field.isMemberId ? (
            <MemberFK
              defaultValue={field.defaultValue.toString()}
              setSelectedMemberId={setSelectedMemberId}
              selectedMemberId={selectedMemberId}
            />
          ) : (
            <Input
              type={field.type}
              id={field.name}
              defaultValue={field.defaultValue}
            />
          )}
        </div>
      ))}
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export { DialogDemo };
