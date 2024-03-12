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
import { addAuthorBook } from "@/app/utils/AuthorBooks/addAuthorsBooks";
import { AuthorFK } from "@/components/AuthorFK";
import { BookFK } from "@/components/BookFK";

// Zod schema for validating the input
const schema = z.object({
  author_id: z.number(),
  book_id: z.number(),
});

export default function AddAuthorsBook() {
  const [open, setOpen] = React.useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = React.useState("");
  const [selectedBookId, setSelectedBookId] = React.useState("");

  // Client action to add a new AuthorsBook record
  const clientAction = async () => {
    // Validates the input and returns early if the input is invalid.
    const result = schema.safeParse({
      author_id: Number(selectedAuthorId),
      book_id: Number(selectedBookId),
    });

    if (!result.success) {
      // Displays a toast message if the input is invalid
      toast({
        variant: "destructive",
        description: "Please select both an author and a book.",
      });
      return;
    }

    // Sends a request to add a new AuthorsBook record to the server action 'addAuthorsBook'
    const response = await addAuthorBook(result.data);

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
        description: "AuthorsBook record added! 🥳",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add AuthorsBook</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add AuthorsBook</DialogTitle>
          <DialogDescription>
            Select an author and a book to create a new AuthorsBook record.
          </DialogDescription>
        </DialogHeader>
        <div className={cn("grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <AuthorFK
              defaultValue={selectedAuthorId}
              selectedAuthorId={selectedAuthorId}
              setSelectedAuthorId={setSelectedAuthorId}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="book">Book</Label>
            <BookFK
              defaultValue={selectedBookId}
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
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
      {pending ? "Adding..." : "Add AuthorsBook"}
    </Button>
  );
}
