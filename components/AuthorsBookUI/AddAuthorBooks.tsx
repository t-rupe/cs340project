/**
 * This is the AddAuthorsBook component. It provides a form for adding a new AuthorsBook record to the database.
 * The component uses the 'addAuthorBook' server action to add the new record.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Dialog, Label, and toast.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'useFormStatus' hook from React-DOM to track the form submission status.
 * 
 * The component uses the 'toast' function from the '@/components/ui/use-toast' module to display toast messages.
 * 
 * The component uses the 'z' function from the 'zod' library to validate the input.
 * 
 * The component uses the 'AuthorFK' and 'BookFK' components to select an author and a book.
 * 
 * The component uses the 'addAuthorBook' function from the '@/app/utils/AuthorBooks/addAuthorsBooks' module to send a request to the server to add the new AuthorsBook record.
 * 
 * The component uses the 'useState' hook from React to manage the state of the form.
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

    if (!selectedAuthorId || !selectedBookId) {
      toast({
        variant: "destructive",
        description: "Please select both an author and a book.",
      });
      return;
    }

    // Validates the input and returns early if the input is invalid.
    const result = schema.safeParse({
      author_id: Number(selectedAuthorId),
      book_id: Number(selectedBookId),
    });

    
    if (!result.success) {
      // Handle the parse error
      toast({
        variant: "destructive",
        description: "Invalid input.",
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
