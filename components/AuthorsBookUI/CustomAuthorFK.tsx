/**
 * CustomFK Component
 * 
 * A custom foreign key selector for authorsbooks page. Fetches and displays a list of authors in a dropdown menu.
 * 
 * Props:
 * - selectedAuthorId: ID of the currently selected author.
 * - setSelectedAuthorId: Function to update the selectedAuthorId.
 * 
 * Uses the Popover and Command components to create the dropdown menu, and the getAuthors action to fetch authors.
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
import { getAuthors } from "@/app/utils/Authors/getAuthors";
import { Author } from "@/app/utils/Authors/getAuthors";

export function CustomFK({
  selectedAuthorId,
  setSelectedAuthorId,
}: {
  selectedAuthorId: number | null;
  setSelectedAuthorId: (authorId: number | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [authors, setAuthors] = React.useState<Author[]>([]);

  React.useEffect(() => {
    // Fetch authors from the server using getAuthors action
    const fetchAuthors = async () => {
      const response = await getAuthors();
      setAuthors(response);
    };

    fetchAuthors();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedAuthorId
            ? (authors.find((author) => author.author_id === selectedAuthorId)
                ?.first_name ?? "") +
              " " +
              (authors.find((author) => author.author_id === selectedAuthorId)
                ?.last_name ?? "")
            : "Select author..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search author..." />
          <CommandEmpty>No author found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              key="null"
              onSelect={() => {
                setSelectedAuthorId(null);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedAuthorId === null ? "opacity-100" : "opacity-0"
                )}
              />
              None
            </CommandItem>
            {authors.map((author) => (
              <CommandItem
                key={author.author_id}
                onSelect={() => {
                  setSelectedAuthorId(author.author_id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedAuthorId === author.author_id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {`${author.first_name} ${author.last_name}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
