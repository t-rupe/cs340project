import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ComboBoxResponsive } from "./StatusChange";
import { BookFK } from "@/components/BookFK";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MemberFK } from "./MemberFK";
import { AuthorFK } from "./AuthorFK";
import { cn } from "@/lib/utils";
import { addAuthor } from '@/app/utils/Authors/addAuthor';
import { useFormStatus } from 'react-dom';

interface Field {
  name: string;
  label: string;
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

interface AddDialogProps {
  fields: Field[];
}

export default function AddDialog({ fields }: AddDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new record.
          </DialogDescription>
        </DialogHeader>
        <DynamicForm fields={fields} />
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Adding...' : 'Add Record'}
    </Button>
  );
}


function DynamicForm({ fields, className }: DynamicFormProps) {



  return (
    <form  className={cn("grid items-start gap-4", className)}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {
            // Render components based on field type without defaultValue
            field.isStatusChange ? <ComboBoxResponsive /> :
            field.isBookId ? <BookFK /> :
            field.isMemberId ? <MemberFK /> :
            field.isAuthorId ? <AuthorFK /> :
            <Input type={field.type} id={field.name} />
          }
        </div>
      ))}
      <SubmitButton />
    </form>
  );
}
