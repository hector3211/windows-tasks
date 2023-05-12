import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { onMount } from "solid-js";
import { calendarRes, setCalendarRes, theme } from "../UserState";
export default function Picker() {
  let flatpick: flatpickr.Instance;
  onMount(() => {
    flatpick = flatpickr("#dateRange", {
      enableTime: true,
      minDate: "today",
      dateFormat: "d-m-y h:i K",
      time_24hr: false,
    }) as flatpickr.Instance;
  });

  return (
    <div>
      <input
        type="text"
        value={calendarRes()}
        placeholder="+ Due date"
        class={`${
          theme() === "light" || theme() === "pastel"
            ? "text-gray-200 border-accent"
            : "text-gray-200 border-accent"
        } input  w-32 bg-transparent backdrop-blur shadow-2xl input-bordered mr-1 `}
        id="dateRange"
        onChange={(e) => setCalendarRes(e.currentTarget.value)}
      />
    </div>
  );
}
