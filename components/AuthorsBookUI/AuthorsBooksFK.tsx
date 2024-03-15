/**
 * AuthorsBooksFK Component
 * 
 * A custom foreign key selector for books and their FKs but specifically for the authorsbook page. Fetches and displays a list of books in a dropdown menu.
 * 
 * Props:
 * - defaultValue: Default selected book ID.
 * - selectedBookId: ID of the currently selected book.
 * - setSelectedBookId: Function to update the selectedBookId.
 * 
 * Uses the Popover and Command components to create the dropdown menu, and the getBooks action to fetch books.
 */
"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getBooks } from "@/app/utils/Books/getBooks";
import { Book } from "@/app/utils/Books/getBooks";

export function AuthorsBooksFK({
  defaultValue,
  selectedBookId,
  setSelectedBookId,
}: {
  defaultValue?: string;
  selectedBookId: string;
  setSelectedBookId: (bookId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    // Fetch books from the server using getBooks action
    const fetchBooks = async () => {
      const response = await getBooks();
      setBooks(response);
    };

    fetchBooks();
  }, []);

  React.useEffect(() => {
    // Update selectedBookId if defaultValue changes
    setSelectedBookId(defaultValue || "");
  }, [defaultValue, setSelectedBookId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="outline-red-700 justify-between"
          disabled={books.length === 0}
        >
          {books.length === 0
            ? "No Books Available"
            : selectedBookId
            ? books.find((book) => book.book_id === Number(selectedBookId))
                ?.title
            : "Select book..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search book..." />
          <CommandEmpty>No book found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              key="null"
              value=""
              onSelect={() => {
                setSelectedBookId("");
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedBookId === "" ? "opacity-100" : "opacity-0"
                )}
              />
              None
            </CommandItem>
            {books.map((book) => (
              <CommandItem
                key={book.book_id}
                value={book.book_id.toString()}
                onSelect={(currentValue) => {
                  setSelectedBookId(
                    currentValue === selectedBookId ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedBookId === book.book_id.toString()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {book.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
