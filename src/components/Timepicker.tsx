import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import moment from "moment";
import { createEffect, onMount } from "solid-js";
import { calendarRes, setCalendarRes, theme } from "../UserState";
export default function Picker() {
  let flatpick: flatpickr.Instance;
  onMount(() => {
    flatpick = flatpickr("#dateRange", {}) as flatpickr.Instance;
  });

  createEffect(() => {
    console.log(calendarRes());
    flatpick.setDate(calendarRes());
  });
  return (
    <div class="">
      <input
        type="text"
        placeholder="+ Due date"
        class={`${
          theme() === "light" || theme() === "pastel"
            ? "text-gray-300 border-gray-400"
            : "text-gray-300 border-gray-400"
        } input  w-32 bg-transparent backdrop-blur shadow-2xl input-bordered mr-1 `}
        id="dateRange"
        onChange={(e) => setCalendarRes(e.currentTarget.value)}
      />
    </div>
  );
}
