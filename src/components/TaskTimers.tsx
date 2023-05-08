import { createSignal, onCleanup, Show } from "solid-js";
import moment from "moment";

type TaskTimerProps = {
  setDate: string;
};

export default function TaskTimer({ setDate }: TaskTimerProps) {
  const [remaingTime, setRemainingTime] = createSignal<string>("");
  function getRemainingTime() {
    const user = moment(setDate, "YYYY-MM-DD hh:mm:ss ");
    const curr = moment().format("YYYY-MM-DD hh:mm:ss ");
    const diffInMs = moment(user).diff(curr);
    const diffDuration = moment.duration(diffInMs);

    const days = diffDuration.days();
    const hours = diffDuration.hours();
    const minutes = diffDuration.minutes();

    return `${days > 0 ? `${days} days` : ""} ${
      hours > 0 ? `${hours} hours` : ""
    } ${minutes > 0 ? `${minutes} minutes` : ""}`;
  }

  const interval = setInterval(() => {
    setRemainingTime(getRemainingTime());
  }, 1000);

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <div>
      <p class="text-sm text-red-500 w-full">{remaingTime()}</p>
    </div>
  );
}
