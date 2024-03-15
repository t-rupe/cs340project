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