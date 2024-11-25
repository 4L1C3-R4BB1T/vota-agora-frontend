import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

interface Props {
  name: string;
  onSelectionDate: (property: string, value: Date | undefined) => void;
}

function DatePickerForm({ name, onSelectionDate }: Props) {
    const [date, setDate] = React.useState<Date>()

    const onChange = (date: Date | undefined) => {
      setDate(date);
      onSelectionDate(name, date);
    }
 
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-80 text-brand-secondary py-5 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Escolha uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            className="w-full"
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
}


export default DatePickerForm;