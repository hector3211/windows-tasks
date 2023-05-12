import { getName } from "@tauri-apps/api/app";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import { createEffect, onCleanup } from "solid-js";
import {
  intervalId,
  min,
  setIntervalId,
  setMin,
  setStarted,
  setTime,
  setToast,
  started,
  time,
} from "../UserState";

export default function TheTimer() {
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
          sendNoti();
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
      onCleanup(() => clearInterval(id));
    }
  });

  async function sendNoti() {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    if (permissionGranted) {
      sendNotification({ title: "TaskApp", body: "TIMER HAS STOPPED!" });
    }
  }

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
    <div>
      <div class="m-2 flex justify-center text-4xl">
        <div>{time()}</div>
      </div>
      <select
        oninput={(e) => setMin(Number(e.currentTarget.value))}
        class="select select-bordered bg-base-300 w-full my-1 mb-2"
      >
        <option>30</option>
        <option>20</option>
        <option>5</option>
        <option>1</option>
      </select>
      <div class="flex flex-col justify-between items-center">
        <button
          class="m-1 btn btn-sm btn-accent w-full"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
        <button
          onClick={() => stopTimer()}
          class="m-1 btn btn-sm btn-primary w-full"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
