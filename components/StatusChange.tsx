/**
 * This is a ComboBoxResponsive component that allows users to select a status from a dropdown list.
 * The dropdown list is implemented with a popover and contains a list of statuses.
 * Each status is an item in the dropdown list, and when an item is selected, the selected status is displayed on the button that triggers the dropdown.
 * The selected status is also passed to a callback function provided via props.
 * 
 * The component uses the following components:
 * - A custom Button component
 * - A custom Command component for the dropdown list
 * - A custom Popover component for the dropdown
 * 
 */
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "returned", label: "Returned" },
];

export function ComboBoxResponsive({
  defaultValue,
  selectedStatus,
  setSelectedStatus,
}: {
  defaultValue?: string;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus}</> : <>+ Set status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
      </PopoverContent>
    </Popover>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: string) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(value);
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}