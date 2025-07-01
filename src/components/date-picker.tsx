"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { parseDateValue } from "@/utils/date";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

type DatePickerFormProps = {
  name: string;
  label: string;
  defaultValue?: Date | string;
  error?: string[];
};

export function DatePickerForm({
  name = "",
  label = "",
  defaultValue,
  error,
}: DatePickerFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    return parseDateValue(defaultValue);
  });
  const dateToString = selectedDate ? selectedDate.toISOString() : "";

  return (
    <div className="flex flex-col gap-2">
      <Input type="hidden" id={name} name={name} value={dateToString} />
      <Label htmlFor={name}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              " pl-3 text-left font-normal",
              !selectedDate && "text-muted-foreground",
            )}
          >
            {selectedDate ? (
              dayjs(selectedDate).format("DD-MM-YYYY")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <p className="text-red-600 text-sm">{error?.at(0) || "\u00A0"}</p>
    </div>
  );
}
