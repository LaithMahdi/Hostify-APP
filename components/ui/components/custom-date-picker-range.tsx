"use client";

import { useState } from "react";
import { addDays, isAfter, isBefore, isSameDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface DateRangePickerProps {
  initialRange?: DateRange;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabledDates?: Date[];
  onDateChange?: (range: DateRange | undefined) => void;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
}

export function DateRangePicker({
  initialRange,
  minDate,
  maxDate,
  className = "",
  disabledDates = [],
  onDateChange,
  numberOfMonths = 1,
  showOutsideDays = true,
  fixedWeeks = false,
}: DateRangePickerProps) {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>(
    initialRange ?? {
      from: today,
      to: addDays(today, 3),
    }
  );

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (onDateChange) {
      onDateChange(range);
    }
  };

  const isDateDisabled = (day: Date) => {
    // Check against min/max dates
    if (minDate && isBefore(day, minDate)) return true;
    if (maxDate && isAfter(day, maxDate)) return true;

    // Check against disabled dates
    return disabledDates.some((disabledDate) => isSameDay(day, disabledDate));
  };

  return (
    <div className={className}>
      <Calendar
        mode="range"
        selected={date}
        onSelect={handleSelect}
        disabled={isDateDisabled}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
        fixedWeeks={fixedWeeks}
        className="rounded-md border p-2"
      />
    </div>
  );
}
