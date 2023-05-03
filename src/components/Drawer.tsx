import { createEffect, onCleanup } from "solid-js";
import {
  intervalId,
  min,
  setIntervalId,
  setMin,
  setTime,
  time,
  started,
  setStarted,
  setToast,
  toast,
} from "../UserState";
import Toast from "./Toast";

export default function Draw() {
  createEffect(() => {
    if (started()) {
      const totalSec = min() * 60;
      let secondsLeft = totalSec;
      const id = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
          clearInterval(id);
          setIntervalId(undefined);
          setStarted(false);
          setTime("00:00");
          setToast(true);

          const timeout = setTimeout(() => setToast(false), 3000);
          return () => clearTimeout(timeout);
        }

        setTime(
          `${Math.floor(secondsLeft / 60)
            .toString()
            .padStart(2, "0")}: ${Math.floor(secondsLeft % 60)
            .toString()
            .padStart(2, "0")}`
        );
      }, 1000);
      setIntervalId(Number(id));
    }
  });

  function stopTimer() {
    if (intervalId()) {
      clearInterval(intervalId());
      setIntervalId(undefined);
      setStarted(false);
      setTime("00:00");
    }
  }

  onCleanup(() => stopTimer());

  return (
    <div class="drawer bg-base-300 w-1/3">
      {toast() && <Toast />}
      <div class="drawer-content"></div>
      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="h-full flex flex-col justify-between p-4 text-base-content">
          <li>
            <div class="m-2 flex justify-center text-4xl">
              <div>{time()}</div>
            </div>
            <select
              oninput={(e) => setMin(Number(e.currentTarget.value))}
              class="select select-bordered bg-base-300 w-full max-w-xs my-1"
            >
              <option>30</option>
              <option>20</option>
              <option>5</option>
              <option>2</option>
            </select>
            <div class="flex justify-between items-center">
              <button
                class="m-1 btn btn-sm btn-primary"
                onClick={() => setStarted(true)}
              >
                Start
              </button>
              <button
                onClick={() => stopTimer()}
                class="m-1 btn btn-sm btn-secondary"
              >
                Reset
              </button>
            </div>
          </li>
          <li>
            <div class="tabs tabs-boxed w-full">
              <a class="tab tab-xs">Tab 1</a>
              <a class="tab tab-xs tab-active">Tab 1</a>
              <a class="tab tab-xs">Tab 1</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
