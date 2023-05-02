import { DateTimePicker } from "date-time-picker-solid";
import moment from "moment";
import { createEffect } from "solid-js";
import { calendarRes, setCalendarRes } from "../UserState";
export default function Picker() {
  createEffect(() => {
    console.log(calendarRes());
  });

  return (
    <div class="w-min">
      <DateTimePicker
        calendarResponse={(e) => setCalendarRes(e.date)}
        currentDate={moment().toDate()}
        enableSelectedDate={false}
        calendarWidth={10}
        customizeCalendarBody={"calendarbody"}
      />
    </div>
  );
}
