import { FaSolidCheck } from "solid-icons/fa";
import { Task } from "../types";
import { completedTasks, theme } from "../UserState";
export default function CompTaskList() {
  return (
    <div>
      {completedTasks().length > 0 && (
        <div class="dropdown dropdown-bottom">
          <label
            tabIndex={0}
            class={` btn bg-transparent backdrop-blur-lg ${
              theme() === "light" || theme() === "pastel"
                ? "text-white border-white"
                : "text-white border-white"
            }`}
          >
            <FaSolidCheck class="mr-1" />
            Completed
          </label>
          <ul
            tabIndex={0}
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            {completedTasks().map((task: Task) => (
              <li>
                <a>{task.content}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
