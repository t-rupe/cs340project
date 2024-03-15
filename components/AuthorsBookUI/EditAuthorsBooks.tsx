/**
 * EditAuthorsBook Component
 * 
 * A dialog form for editing an AuthorsBook record. Validates input and sends a request to the server to update the record.
 * 
 * Props:
 * - authorsBooksId: ID of the AuthorsBook record to edit.
 * - initialAuthorId: Initial author ID.
 * - initialBookId: Initial book ID.
 * 
 * Uses the Dialog, Input, and Button components for the form, and the editAuthorsBook action to send the request.
 * Source: https://ui.shadcn.com/
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { editAuthorsBook } from "@/app/utils/AuthorBooks/editAuthorsBooks";
import { Input } from "@/components/ui/input";
import { AuthorsBooksFK } from "./AuthorsBooksFK";
import { CustomFK } from "./CustomAuthorFK";
// Zod schema for validating the input
const schema = z.object({
  authorsbooks_id: z.number(),
  author_id: z.number().nullable(),
  book_id: z.number().nullable(),
});

export default function EditAuthorsBook({
  authorsBooksId,
  initialAuthorId,
  initialBookId,
}: {
  authorsBooksId: number;
  initialAuthorId: number | null;
  initialBookId: number | null;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = React.useState<number | null>(
    initialAuthorId
  );
  const [selectedBookId, setSelectedBookId] = React.useState<number | null>(
    initialBookId
  );

  // Client action to edit an AuthorsBook record
  const clientAction = async () => {
    // Validates the input and returns early if the input is invalid.
    const newAuthorsBook = {
      authorsbooks_id: authorsBooksId,
      author_id: selectedAuthorId,
      book_id: selectedBookId,
    };

    console.log("New AuthorsBook:", newAuthorsBook);

    const result = schema.safeParse(newAuthorsBook);

    if (!result.success) {
      // Displays a toast message if the input is invalid
      toast({
        variant: "destructive",
        description: "Invalid input. Please check the entered values.",
      });
      return;
    }

    // Sends a request to edit the AuthorsBook record to the server action 'editAuthorsBook'
    const response = await editAuthorsBook(
      newAuthorsBook.authorsbooks_id,
      newAuthorsBook.author_id,
      newAuthorsBook.book_id
    );

    console.log("Server Response:", response);

    // if the response contains an error, display a toast message
    if (response?.error) {
      toast({
        variant: "destructive",
        description: response.error,
      });
    } else {
      // If the response is successful, close the dialog and display a 'successful' toast message
      setOpen(false);
      toast({
        description: "AuthorsBook record updated! 🎉",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit AuthorsBook</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit AuthorsBook</DialogTitle>
          <DialogDescription>
            Update the author and book for the selected AuthorsBook record.
          </DialogDescription>
        </DialogHeader>
        <div className={cn("grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label htmlFor="authorsbooks_id">AuthorsBooks ID</Label>
            <Input
              id="authorsbooks_id"
              value={authorsBooksId}
              disabled
              className="cursor-not-allowed"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <CustomFK
              selectedAuthorId={selectedAuthorId}
              setSelectedAuthorId={setSelectedAuthorId}
            />
          </div>{" "}
          <div className="grid gap-2">
            <Label htmlFor="book">Book</Label>
            <AuthorsBooksFK
              defaultValue={selectedBookId?.toString() || ""}
              selectedBookId={selectedBookId?.toString() || ""}
              setSelectedBookId={(bookId) =>
                setSelectedBookId(bookId ? parseInt(bookId) : null)
              }
            />
          </div>
          <SubmitButton onClick={clientAction} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus();
  // Displays a 'pending' button while the form is being submitted
  return (
    <Button type="button" aria-disabled={pending} onClick={onClick}>
      {pending ? "Updating..." : "Update AuthorsBook"}
    </Button>
  );
}
