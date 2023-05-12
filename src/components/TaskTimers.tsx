import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import moment from "moment";
import { theme } from "../UserState";

type TaskTimerProps = {
  setDate: string | undefined;
};

export default function TaskTimer({ setDate }: TaskTimerProps) {
  const [remaingTime, setRemainingTime] = createSignal<string>("");
  // const user = moment(setDate).format("DD-MM-YYYY hh:mm:ss A");
  // const curr = moment().format("MM-DD-YYYY hh:mm:ss A");
  // // const diffDuration = moment.duration(diffInMs);
  // const diffInMs = moment(user).diff(curr);
  // const diffDuration = moment.duration(diffInMs);
  //
  // const days = diffDuration.days();
  // const hours = diffDuration.hours();
  // const minutes = diffDuration.minutes() + 1;
  // console.log(`USERDATE ---- ${user}`);
  // console.log(`COMPUTERDATE ---- ${curr}`);
  // console.log(`DIFF ---- ${diffInMs}`);
  // if (days <= 0 && hours <= 0 && minutes <= 0) {
  //   console.log("Past Due");
  // }
  onMount(() => {
    if (!setDate) {
      return setRemainingTime("No Date Specified");
    }
    const interval = setInterval(() => {
      const user = moment(setDate).format("DD-MM-YYYY hh:mm:ss A");
      const curr = moment().format("MM-DD-YYYY hh:mm:ss A");
      // fomat dates to be able to compare

      const diffInMs = moment(user).diff(curr);
      const diffDuration = moment.duration(diffInMs);

      const days = diffDuration.days();
      const hours = diffDuration.hours();
      const minutes = diffDuration.minutes() + 1;
      if (days <= 0 && hours <= 0 && minutes <= 0) {
        setRemainingTime("Past Due");
      } else {
        setRemainingTime(
          `${days > 0 ? `${days} days` : ""} ${
            hours > 0 ? `${hours} hours` : ""
          } ${minutes > 0 ? `${minutes} minutes` : ""}`
        );
      }
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <div>
      <Show
        when={remaingTime() === "Past Due"}
        fallback={
          <p
            class={`text-sm  ${
              theme() === "pastel" ? "text-teal-500" : "text-accent"
            }`}
          >
            {remaingTime()}
          </p>
        }
      >
        <p class="text-rose-400 z-0">Past Due</p>
      </Show>
    </div>
  );
}
