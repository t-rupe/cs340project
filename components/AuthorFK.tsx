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

const authors = [
  { author_id: "1", author_first_name: "Paulo", author_last_name: "Coelho" },
  { author_id: "2", author_first_name: "Victor", author_last_name: "Hugo" },
  { author_id: "3", author_first_name: "Jean", author_last_name: "Valjean" },
  { author_id: "4", author_first_name: "Harper", author_last_name: "Lee" },
  { author_id: "5", author_first_name: "F. Scott", author_last_name: "Fitzgerald" },
  { author_id: "6", author_first_name: "George", author_last_name: "Orwell" },
  { author_id: "7", author_first_name: "Jane", author_last_name: "Austen" },
  // Add more author objects here
];

export function AuthorFK({ defaultValue }: { defaultValue?: string }) {
  const [open, setOpen] = React.useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = React.useState("");

  React.useEffect(() => {
    // Update selectedAuthorId if defaultValue changes
    setSelectedAuthorId(defaultValue || "");
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
          {selectedAuthorId
            ? authors.find((author) => author.author_id.toString() === selectedAuthorId)?.author_first_name + " " + authors.find((author) => author.author_id.toString() === selectedAuthorId)?.author_last_name
            : "Select author..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search author..." />
          {authors.length > 0 ? (
            <CommandGroup>
              {authors.map((author) => (
                <CommandItem
                  key={author.author_id}
                  value={author.author_id.toString()}
                  onSelect={() => {
                    setSelectedAuthorId(author.author_id.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAuthorId === author.author_id.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {`${author.author_first_name} ${author.author_last_name} | id: ${author.author_id}`}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No author found.</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
