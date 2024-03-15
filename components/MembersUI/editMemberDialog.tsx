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
import { nullable, z } from "zod";
import { toast, useToast } from "../ui/use-toast";
import { editMember } from "@/app/utils/Members/editMember";
import States from "@/components/States";

interface Field {
  name: string;
  label: string;
  defaultValue: string;
  type: string;
}

interface DynamicFormProps {
  fields: Field[];
  className?: string;
  stateValue: string;
  setStateValue: (value: string) => void;
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
    .max(2, { message: "Please enter two characters for state." }),
  country: z
    .string()
    .trim()
    .min(1, { message: "Country is required" })
    .max(2, { message: "Please enter two characters for country" }),
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
  const [stateValue, setStateValue] = React.useState(member.state);

  const currentTime = new Date().toISOString().split("T")[0];

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
      name: "phone_1",
      label: "Phone 1",
      defaultValue: member.phone_1,
      type: "text",
    },
    {
      name: "phone_2",
      label: "Phone 2",
      defaultValue: member.phone_2,
      type: "text",
    },
    {
      name: "street_1",
      label: "Street 1",
      defaultValue: member.street_1,
      type: "text",
    },
    {
      name: "street_2",
      label: "Street 2",
      defaultValue: member.street_2,
      type: "text",
    },
    {
      name: "city",
      label: "City",
      defaultValue: member.city,
      type: "text",
    },
    {
      name: "state",
      label: "State",
      defaultValue: stateValue,
      type: "text",
    },
    {
      name: "country",
      label: "Country",
      defaultValue: member.country,
      type: "text",
    },
    {
      name: "zip_code",
      label: "Zip Code",
      defaultValue: member.zip_code,
      type: "text",
    },
    {
      name: "created_date",
      label: "Created Date",
      defaultValue: member.created_date.toString(),
      type: "date",
    },
    {
      name: "changed_date",
      label: "Changed Date",
      defaultValue: currentTime,
      type: "date",
    },
  ];

  // Client action to edit an member
  const clientAction = async (formData: FormData) => {
    // Desctructures the input from the 'Edit Member' form & the id from the member prop
    const newMember = {
      member_id: member.member_id,
      member_first_name: formData.get("member_first_name"),
      member_last_name: formData.get("member_last_name"),
      phone_1: formData.get("phone_1"),
      phone_2: formData.get("phone_2"),
      street_1: formData.get("street_1"),
      street_2: formData.get("street_2"),
      city: formData.get("city"),
      state: stateValue.toUpperCase(),
      country: formData.get("country"),
      zip_code: formData.get("zip_code"),
      created_date: member.created_date,
      changed_date: new Date(),
    };

    // Validates the input and returns early if the input is invalid
    const result = schema.safeParse(newMember);
    if (!result.success) {
      const message = result.error.flatten().fieldErrors;

      console.log("bad message", message);
      // Displays a toast message with the error message if the input is invalid
      toast({
        variant: "destructive",
        description:
          message.member_first_name ||
          message.member_last_name ||
          message.phone_1 ||
          message.phone_2 ||
          message.street_1 ||
          message.street_2 ||
          message.city ||
          message.state ||
          message.country ||
          message.zip_code,
      });

      return;
    }

    // If client side validation passes, send a request to edit the member to the server action 'editMember'
    const response = await editMember(newMember.member_id, result.data);

    // If the response contains an error, display a toast with the error message
    if (response?.error) {
      toast({
        variant: "destructive",
        description:
          response.error.member_first_name ||
          response.error.member_last_name ||
          response.error.phone_1 ||
          response.error.phone_2 ||
          response.error.street_1 ||
          response.error.street_2 ||
          response.error.city ||
          response.error.state ||
          response.error.country ||
          response.error.zip_code,
      });
    }

    // If the response is successful, close the dialog and display a 'successful' toast message
    setOpen(false);
    toast({
      description: "Member updated! 🥳",
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
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>
            Make changes to the selected member. Submit to save changes.
          </DialogDescription>
        </DialogHeader>
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <DynamicForm
            fields={fields}
            stateValue={stateValue}
            setStateValue={setStateValue}
          />
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DynamicForm({ fields, stateValue, setStateValue }: DynamicFormProps) {
  return (
    <div className={cn("grid items-start gap-4")}>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.name === "state" ? (
            <States
              value={stateValue}
              onChange={setStateValue}
              defaultValue={field.defaultValue}
            />
          ) : (
            <Input
              type={field.type}
              id={field.name}
              name={field.name}
              defaultValue={field.defaultValue}
              disabled={
                field.name === "member_id" ||
                field.name === "changed_date" ||
                field.name === "created_date"
              }
            />
          )}
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
      {pending ? "Updating..." : "Update Member"}
    </Button>
  );
}

export { EditMemberDialog };
