import { DateRangePicker } from "@/components/ui/components/custom-date-picker-range";
import { Item } from "@/app/(public)/_components/rooms-section";
import { addDays, differenceInDays, format } from "date-fns";
import { BedDouble, CircleDollarSign } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { z } from "zod";
import { Reservation } from "./types";

interface Props {
  data: Item;
  formData: Reservation;
  updateForm: (path: string, value: any) => void;
  errors: z.ZodIssue[];
}

const BookingAppointment = ({ data, formData, updateForm, errors }: Props) => {
  const [total, setTotal] = useState<number>(data.pricePerNight);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);

    if (range?.from && range?.to) {
      const days = differenceInDays(addDays(range.to, 2), range.from);
      const calculatedTotal = days * data.pricePerNight;
      setTotal(calculatedTotal);
      updateForm("totalPrice", calculatedTotal);
    } else {
      setTotal(0);
    }
    updateForm("checkIn", range?.from ? format(range.from, "yyyy-MM-dd") : "");
    updateForm("checkOut", range?.to ? format(range.to, "yyyy-MM-dd") : "");
  };

  return (
    <div className="flex flex-col bg-white w-full text-justify rounded-lg shadow-lg">
      <div className="flex items-center gap-2 bg-mainColor p-[18px] rounded-t-lg">
        <CircleDollarSign className="text-white size-7" />
        <p className="text-white text-lg font-medium">
          Booking Appointment Information
        </p>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-2.5 w-full p-2 bg-mainColor/10 rounded-lg">
          <div className="p-2.5 bg-mainColor rounded-lg ">
            <BedDouble className="text-white size-6" />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-medium">
              <span className="font-normal">Room Number : </span>
              {data.capacity}
            </p>
            <p className="text-base font-medium">
              <span className="font-normal">Guest House : </span>
              {data.guestHouse.name}
            </p>
          </div>
        </div>

        <label className="text-sm font-medium">Check In - Check Out</label>
        <DateRangePicker
          initialRange={selectedRange}
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)}
          onDateChange={handleDateChange}
          className="w-fit"
          numberOfMonths={2}
        />

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Price per night:</span>
            <span className="font-semibold">
              ${data.pricePerNight.toFixed(2)}
            </span>
          </div>

          {selectedRange?.from && selectedRange?.to && (
            <>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Number of nights:</span>
                <span className="font-semibold">
                  {differenceInDays(
                    addDays(selectedRange.to, 2),
                    selectedRange.from
                  )}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="text-base font-bold">Total:</span>
                <span className="text-xl font-bold text-mainColor">
                  ${total.toFixed(3)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingAppointment;
