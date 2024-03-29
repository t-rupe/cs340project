/**
 * This is the AddMember component. It provides a form for adding a new member.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Input, and Label.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component defines a Zod schema for validating the input. The schema requires the first name, last name, phone 1, street 1, city, state, country, and zip code. It also requires the created date and changed date to be dates.
 * 
 * The component uses the 'addMember' server action to add a new member. It also uses the 'getMembers' server action to check for existing members with the same first and last name.
 * 
 * The component uses a Dialog to display the form. The DialogTrigger is a Button that opens the Dialog. The DialogContent contains the form.
 * 
 * The form contains Inputs for the first name, last name, phone 1, phone 2, street 1, street 2, city, state, country, and zip code. It also contains a SubmitButton.
 * 
 * The SubmitButton component displays a 'pending' button while the form is being submitted.
 * 
 */
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
import { useFormStatus } from "react-dom";
import { toast, useToast } from "../ui/use-toast";
import { z } from "zod";
import { addMember } from "@/app/utils/Members/addMember";
import { getMembers } from "@/app/utils/Members/getMembers";

// Zod schema for validating the input
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
    .max(2, { message: "Please enter two characters for state" }),
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

export default function AddMember() {
  const [open, setOpen] = React.useState(false);

  // Client action to add a new member
  const clientAction = async (formData: FormData) => {
    // Destructures the input from the 'Add New Member' form
    const member = {
      member_first_name: formData.get("member_first_name"),
      member_last_name: formData.get("member_last_name"),
      phone_1: formData.get("phone_1"),
      phone_2: formData.get("phone_2"),
      street_1: formData.get("street_1"),
      street_2: formData.get("street_2"),
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      zip_code: formData.get("zip_code"),
      created_date: new Date(),
      changed_date: new Date(),
    };

    // Validates the input and returns early if the input is invalid.
    const result = schema.safeParse(member);
    console.log("check result", result);
    if (!result.success) {
      // Destructures the error message
      const message = result.error.flatten().fieldErrors;
      console.log("bad message", message);

      // Displays a toast message if the input is invalid
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

    // Check for existing members with the same first and last name
    const existingMembers = await getMembers();

    const existingMember = existingMembers.find(
      (member) =>
        member.member_first_name === formData.get("member_first_name") &&
        member.member_last_name === formData.get("member_last_name")
    );

    if (existingMember) {
      toast({
        variant: "destructive",
        description:
          "A member with the same first and last name already exists.",
      });
      return;
    }

    // Sends a request to add a new member to the server action 'addMember'
    const response = await addMember(result.data);
    console.log("check response", response);

    // if the response contains an error, display a toast message
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
      description: "Member added! 🥳",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new member.
          </DialogDescription>
        </DialogHeader>
        {/* pass the clientAction to the Addmember input form */}
        <form action={clientAction} className={cn("grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label htmlFor="member_first_name">Member First Name</Label>
            <Input id="member_first_name" name="member_first_name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="member_last_name">Member Last Name</Label>
            <Input id="member_last_name" name="member_last_name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone_1">Phone 1</Label>
            <Input id="phone_1" name="phone_1" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone_2">Phone 2</Label>
            <Input id="phone_2" name="phone_2" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="street_1">Street 1</Label>
            <Input id="street_1" name="street_1" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="street_2">Street 2</Label>
            <Input id="street_2" name="street_2" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zip_code">Zip Code</Label>
            <Input id="zip_code" name="zip_code" />
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  // Displays a 'pending' button while the form is being submitted
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? "Adding..." : "Add Member"}
    </Button>
  );
}
