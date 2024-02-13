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

const members = [
  {
    member_id: 1,
    member_first_name: "John",
    member_last_name: "Doe",
    phone_1: "123-456-7890",
    phone_2: "",
    street_1: "123 Main St",
    street_2: "",
    city: "Anytown",
    state: "AN",
    country: "USA",
    zip_code: "12345",
    created_date: "2023-01-01",
    changed_date: "2023-01-02",
  },
  // Add more member objects here
];

export function MemberFK({ defaultValue }: { defaultValue?: string }) {
    const [open, setOpen] = React.useState(false);
  const [selectedMemberId, setSelectedMemberId] = React.useState("");


  React.useEffect(() => {
    // Update selectedMemberId if defaultValue changes
    setSelectedMemberId(defaultValue || "");
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
          {selectedMemberId
            ? members.find((member) => member.member_id.toString() === selectedMemberId)?.member_first_name + " " + members.find((member) => member.member_id.toString() === selectedMemberId)?.member_last_name
            : "Select member..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search member..." />
          {members.length > 0 ? (
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.member_id}
                  value={member.member_id.toString()}
                  onSelect={() => {
                    setSelectedMemberId(member.member_id.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedMemberId === member.member_id.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {`${member.member_first_name} ${member.member_last_name} | id: ${member.member_id}`}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>No member found.</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
