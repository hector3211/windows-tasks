import { FaSolidCheck, FaSolidSquareXmark } from "solid-icons/fa";
import { FaSolidSortUp } from "solid-icons/fa";
import { toast, setTasks, tasks } from "../UserState";
import Toast from "./Toast";
import { Task } from "../types";
import ProgressStatus from "./Progress";
import Timer from "./DrawTimer";

export default function Draw() {
  function sortTasks() {
    const highTag = tasks().filter((task) => task.tag === "high");
    const lowTag = tasks().filter((task) => task.tag === "low");

    return [...highTag, ...lowTag];
  }

  function toggleAll() {
    setTasks(
      tasks().map((task) => {
        if (!task.completed) {
          task.completed = true;
        }
        return { ...task };
      })
    );
  }

  function deleteAll() {
    let emptyTaskList: Task[] = [];
    setTasks(emptyTaskList);
  }

  return (
    <div class="drawer bg-base-300 w-1/3">
      {toast() && <Toast />}
      <div class="drawer-content h-full"></div>
      <div class="drawer-side ">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="h-full flex flex-col justify-between  p-3 text-base-content">
          <li>
            <ProgressStatus />
          </li>
          <li>
            <Timer />
          </li>
          <li>
            <div class="w-full">
              <ul class="menu bg-base-100 p-2 rounded-box text-md">
                <li>
                  <a onClick={() => setTasks(sortTasks())}>
                    <FaSolidSortUp class="mt-3" />
                    Sort
                  </a>
                </li>
                <li>
                  <a onClick={() => toggleAll()}>
                    <FaSolidCheck />
                    Toggle All
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
