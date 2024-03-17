/**
 * This is the AuthorFK component. It provides a dropdown for selecting an author.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, and PopoverTrigger.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'getAuthors' function to fetch authors from the server. The 'getAuthors' function returns an array of authors, each with an 'author_id', 'first_name', and 'last_name'.
 * 
 * The component receives a 'defaultValue', 'selectedAuthorId', and 'setSelectedAuthorId' props. The 'defaultValue' is the default selected author id. The 'selectedAuthorId' is the currently selected author id. The 'setSelectedAuthorId' is a function to set the selected author id.
 * 
 * The component maintains an 'authors' state, which is an array of authors fetched from the server. It also maintains an 'open' state, which is a boolean indicating whether the dropdown is open.
 * 
 * The component maps over the 'authors' array and creates a CommandItem for each author. The CommandItem displays the author's first name, last name, and id. If the author's id matches the 'selectedAuthorId', it displays a Check icon.
 * 
 * The component uses a Popover to display the dropdown. The PopoverTrigger is a Button that displays the selected author's first name and last name, or "Select author..." if no author is selected. The PopoverContent is a Command that contains the CommandItems.
 * 
 * The component uses the 'setSelectedAuthorId' function to update the 'selectedAuthorId' when a CommandItem is selected. If the selected author id is the same as the 'selectedAuthorId', it sets the 'selectedAuthorId' to an empty string. Otherwise, it sets the 'selectedAuthorId' to the selected author id.
 * 
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

export function AuthorFK({
  defaultValue,
  selectedAuthorId,
  setSelectedAuthorId,
  children,
}: {
  defaultValue?: string;
  selectedAuthorId: string;
  setSelectedAuthorId: (authorId: string) => void;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [authors, setAuthors] = React.useState<Author[]>([]);

  React.useEffect(() => {
    // Fetch authors from the server using getAuthors action constantly
    const fetchAuthors = async () => {
      const response = await getAuthors();

      setAuthors(response);
    };

    fetchAuthors();
  }, []);

  React.useEffect(() => {
    // Update selectedAuthorId if defaultValue changes
    setSelectedAuthorId(defaultValue || "");
  }, [defaultValue, setSelectedAuthorId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={authors.length === 0}
        >
          {authors.length === 0
            ? "No Authors Available"
            : selectedAuthorId
            ? authors.find(
                (author) => author.author_id === Number(selectedAuthorId)
              )?.first_name +
              " " +
              authors.find(
                (author) => author.author_id === Number(selectedAuthorId)
              )?.last_name
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
              value=""
              onSelect={() => {
                setSelectedAuthorId("");
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedAuthorId === "" ? "opacity-100" : "opacity-0"
                )}
              />
              None
            </CommandItem>

            {authors.map((author) => (
              <CommandItem
                key={author.author_id}
                value={author.author_id.toString()}
                onSelect={(currentValue) => {
                  setSelectedAuthorId(
                    currentValue === selectedAuthorId ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedAuthorId === author.author_id.toString()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {`${author.first_name} ${author.last_name} | id: ${author.author_id}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
