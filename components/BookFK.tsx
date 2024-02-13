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

const authorBookRelations = [
  { bookId: "1", bookTitle: "The Alchemist", authorName: "Paulo Coelho" },
  { bookId: "2", bookTitle: "Les Misérables", authorName: "Victor Hugo" },
  { bookId: "3", bookTitle: "To Kill a Mockingbird", authorName: "Harper Lee" },
  { bookId: "4", bookTitle: "The Great Gatsby", authorName: "F. Scott Fitzgerald" },
  { bookId: "5", bookTitle: "1984", authorName: "George Orwell" },
  { bookId: "6", bookTitle: "Pride and Prejudice", authorName: "Jane Austen" },
];

export function BookFK({ defaultValue }: { defaultValue?: string }) {
  const [open, setOpen] = React.useState(false);
  const [selectedBookId, setSelectedBookId] = React.useState("");

  React.useEffect(() => {
    // Update selectedMemberId if defaultValue changes
    setSelectedBookId(defaultValue || "");
  }, [defaultValue]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedBookId
            ? authorBookRelations.find((book) => book.bookId === selectedBookId)?.bookTitle
            : "Select book..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search book..." />
          <CommandEmpty>No book found.</CommandEmpty>
          <CommandGroup>
            {authorBookRelations.map((book) => (
              <CommandItem
                key={book.bookId}
                value={book.bookId}
                onSelect={(currentValue) => {
                  setSelectedBookId(currentValue === selectedBookId ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedBookId === book.bookId ? "opacity-100" : "opacity-0"
                  )}
                />
                {`${book.bookTitle} | id: ${book.bookId}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

