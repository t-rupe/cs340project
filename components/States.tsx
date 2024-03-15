/**
 * This component is a dropdown list of U.S. states, implemented with a popover.
 * Each state is an item in the dropdown list, and when an item is selected,
 * the selected state is displayed on the button that triggers the dropdown.
 * The selected state is also passed to a callback function provided via props.
 * 
 * This component uses the following libraries/components:
 * - lucide-react for icons
 * - A custom Button component
 * - A custom Command component for the dropdown list
 * - A custom Popover component for the dropdown
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

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

interface StatesProps {
  value: string;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function States({ value, onChange, defaultValue }: StatesProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
  
    React.useEffect(() => {
      setSelectedValue(value);
    }, [value]);
  
    const handleSelect = (newValue: string) => {
      onChange(newValue);
      setSelectedValue(newValue);
      setOpen(false);
    };
  
    const displayLabel = states.find(state => state.value === selectedValue)?.label || "Select state...";
  
    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {displayLabel}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search state..." />
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    value={state.value}
                    onSelect={() => handleSelect(state.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === state.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {state.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }
    