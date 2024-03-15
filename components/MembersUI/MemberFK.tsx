/**
 * This is the MemberFK component. It provides a dropdown for selecting a member.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, and PopoverTrigger.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'getMembers' function to fetch members from the server. The 'getMembers' function returns an array of members, each with a 'member_id', 'member_first_name', and 'member_last_name'.
 * 
 * The component receives a 'defaultValue', 'selectedMemberId', and 'setSelectedMemberId' props. The 'defaultValue' is the default selected member id. The 'selectedMemberId' is the currently selected member id. The 'setSelectedMemberId' is a function to set the selected member id.
 * 
 * The component maintains a 'members' state, which is an array of members fetched from the server. It also maintains an 'open' state, which is a boolean indicating whether the dropdown is open.
 * 
 * The component maps over the 'members' array and creates a CommandItem for each member. The CommandItem displays the member's first name, last name, and id. If the member's id matches the 'selectedMemberId', it displays a Check icon.
 * 
 * The component uses a Popover to display the dropdown. The PopoverTrigger is a Button that displays the selected member's first name and last name, or "Select member..." if no member is selected. The PopoverContent is a Command that contains the CommandItems.
 * 
 * The component uses the 'setSelectedMemberId' function to update the 'selectedMemberId' when a CommandItem is selected. If the selected member id is the same as the 'selectedMemberId', it sets the 'selectedMemberId' to an empty string. Otherwise, it sets the 'selectedMemberId' to the selected member id.
 */
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
import { getMembers } from "@/app/utils/Members/getMembers";
import { Member } from "@/app/utils/Members/getMembers";

export function MemberFK({
  defaultValue,
  selectedMemberId,
  setSelectedMemberId,
}: {
  defaultValue?: string;
  selectedMemberId: string;
  setSelectedMemberId: (memberId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState<Member[]>([]);

  React.useEffect(() => {
    // Fetch members from the server using getMembers action
    const fetchMembers = async () => {
      const response = await getMembers();
      setMembers(response);
    };

    fetchMembers();
  }, []);

  React.useEffect(() => {
    // Update selectedMemberId if defaultValue changes
    setSelectedMemberId(defaultValue || "");
  }, [defaultValue, setSelectedMemberId]);

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
            ? `${
                members.find(
                  (member) => member.member_id.toString() === selectedMemberId
                )?.member_first_name
              } ${
                members.find(
                  (member) => member.member_id.toString() === selectedMemberId
                )?.member_last_name
              }`
            : "Select member..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search member..." />
          <CommandEmpty>No member found.</CommandEmpty>
          <CommandGroup>
            {members.map((member) => (
              <CommandItem
                key={member.member_id}
                value={member.member_id.toString()}
                onSelect={(currentValue) => {
                  setSelectedMemberId(
                    currentValue === selectedMemberId ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedMemberId === member.member_id.toString()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {`${member.member_first_name} ${member.member_last_name} | id: ${member.member_id}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}