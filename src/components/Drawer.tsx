import { createEffect, onCleanup } from "solid-js";
import { FaSolidCheck, FaSolidSquareXmark } from "solid-icons/fa";
import { IoPersonSharp } from "solid-icons/io";
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
  tasks,
  setTasks,
} from "../UserState";
import Toast from "./Toast";
import { Task } from "../types";

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

  function markAllDone() {
    let updatedList: Task[] = [];
    for (const task of tasks()) {
      if (!task.completed) {
        task.completed = true;
      }
      updatedList.push(task);
    }
    setTasks(updatedList);
  }

  function deleteAll() {
    let emptyTaskList: Task[] = [];
    setTasks(emptyTaskList);
  }

  return (
    <div class="drawer bg-base-300 w-1/3">
      {toast() && <Toast />}
      <div class="drawer-content"></div>
      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="h-full flex flex-col justify-between p-4 text-base-content">
          <li>
            <div class="m-2 flex justify-center text-6xl">
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
                class="m-1 btn btn-sm btn-primary w-full"
                onClick={() => setStarted(true)}
              >
                Start
              </button>
              <button
                onClick={() => stopTimer()}
                class="m-1 btn btn-sm btn-secondary w-full"
              >
                Reset
              </button>
            </div>
          </li>
          <li>
            <div class="w-full">
              <ul class="menu bg-base-100 p-2 rounded-box text-md">
                <li>
                  <a>
                    <IoPersonSharp />
                    Login
                  </a>
                </li>
                <li>
                  <a onClick={() => markAllDone()}>
                    <FaSolidCheck />
                    Mark All Done
                  </a>
                </li>
                <li>
                  <a onClick={() => deleteAll()}>
                    <FaSolidSquareXmark />
                    Delete All
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
