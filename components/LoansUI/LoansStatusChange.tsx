/**
 * This is the loan status change combobox component. It provides a dropdown for changing the loan status.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Popover, PopoverTrigger, PopoverContent, Command, CommandInput, CommandItem, CommandList, and CommandGroup.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component defines a 'Status' type, which has a 'value' and 'label'. It also defines a 'statuses' array, which contains the possible statuses.
 * 
 * The component receives a 'defaultValue' prop, which is the default selected status.
 * 
 * The component uses a Popover to display the status list. The PopoverTrigger is a Button that displays the selected status or '+ Set status' if no status is selected. The PopoverContent is the StatusList.
 * 
 * The StatusList component maps over the 'statuses' array and creates a CommandItem for each status. When a CommandItem is selected, it sets the selected status and closes the Popover.
 * 
 */
"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
  value: string
  label: string
}

const statuses: Status[] = [
  {
    value: "returned",
    label: "Returned",
  },
  {
    value: "checked-out",
    label: "Checked Out",
  },
  {
    value: "overdue",
    label: "Overdue",
  },
  
]

export function ComboBoxResponsive({ defaultValue }: { defaultValue?: string }) {
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
      statuses.find((status) => status.value === defaultValue) || null
    );
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
      </PopoverContent>
    </Popover>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
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
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
