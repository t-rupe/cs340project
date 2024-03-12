'use client';
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
}: {
  defaultValue?: string;
  selectedAuthorId: string;
  setSelectedAuthorId: (authorId: string) => void;
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
            ? authors.find((author) => author.author_id === Number(selectedAuthorId))
                ?.first_name + " " + authors.find((author) => author.author_id === Number(selectedAuthorId))
                ?.last_name
            : "Select author..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search author..." />
          <CommandEmpty>No author found.</CommandEmpty>
          <CommandGroup>
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