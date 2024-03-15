/**
 * This is the DatePicker component. It provides a date picker input field.
 * 
 * The component uses several components from the ShadCN UI library, including Button, Popover, PopoverTrigger, and PopoverContent.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component uses the 'Calendar' component from '@/components/ui/calendar' to provide a calendar for picking a date.
 * 
 * The component uses the 'format' function from 'date-fns' to format the selected date.
 * 
 * The component receives two props: 'selected' and 'onSelect'. 'selected' is the currently selected date, and 'onSelect' is a function that is called when a date is selected.
 * 
 * The component uses a Popover to display the calendar. The PopoverTrigger is a Button that displays the selected date or 'Pick a date' if no date is selected. The PopoverContent is the Calendar.
 * 
 */
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export default function DatePicker({
  selected,
  onSelect,
}: {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
