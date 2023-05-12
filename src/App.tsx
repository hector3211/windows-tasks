import { FaRegularStar, FaSolidSquareXmark, FaSolidStar } from "solid-icons/fa";

import { appWindow } from "@tauri-apps/api/window";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/api/fs";
import {
  tasks,
  setTasks,
  newTask,
  setNewTask,
  theme,
  calendarRes,
  setImportanceTag,
  setStarCliked,
} from "./UserState";
import { Importance, Task } from "./types";
import ThemeButton from "./components/Theme";
import MainLayout from "./Layout";
import Drawer from "./components/Drawer";
import { For, onMount, Show } from "solid-js";
import Calendar from "./components/Timepicker";
import TaskTimer from "./components/TaskTimers";

function App() {
  onMount(() => {
    async function readTasks() {
      try {
        const fileContens = await readTextFile("task.json", {
          dir: BaseDirectory.AppLocalData,
        });
        const parsedTasks: Task[] = JSON.parse(fileContens);
        setTasks(parsedTasks);
      } catch (error) {
        console.log(error);
      }
    }

    readTasks();
  });
  async function preWindowClose() {
    await appWindow.onCloseRequested(async () => {
      const updatedList = tasks().filter((task) => task.completed !== true);
      const parsed = JSON.stringify(updatedList);
      await writeTextFile("task.json", parsed, {
        dir: BaseDirectory.AppLocalData,
      });
    });
  }

  preWindowClose();

  function addTask(
    contentOfTask: string,
    dateOfTask: string | undefined,
    completedOfTask: boolean,
    tagOfTask: Importance | undefined = "low"
  ) {
    const task: Task = {
      content: contentOfTask,
      date: dateOfTask,
      tag: tagOfTask,
      completed: completedOfTask,
    };
    setTasks([...tasks(), task]);
    setNewTask("");
    setImportanceTag(undefined);
    setStarCliked(false);
  }

  function deleteTask(contentOfTask: string) {
    const newTasks = tasks().filter((task) => task.content !== contentOfTask);
    setTasks(newTasks);
  }

  function updateTask(contents: string, isComplete: boolean) {
    setTasks(
      tasks().map((task) => {
        if (task.content === contents) {
          task.completed = isComplete;
        }
        return task;
      })
    );
  }

  function updateTag(contents: string) {
    console.log("update tag button clicked!");
    setTasks(
      tasks().map((task) => {
        if (task.content === contents) {
          if (task.tag === "high") {
            task.tag = "low";
          } else {
            task.tag = "high";
          }
        }
        return { ...task };
      })
    );
  }

  return (
    <MainLayout>
      <div class="flex">
        <Drawer />
        <ThemeButton />
        <div class=" flex flex-col w-full justify-start items-start pt-10 h-screen px-8 overflow-y-auto">
          <For each={tasks()}>
            {(task) => (
              <div class=" flex justify-between w-full min-h-16 max-h-16 bg-base-300 text-lg items-center my-2 py-3 px-2 rounded-lg">
                <div class="flex items-center w-1/2">
                  <Show
                    when={task.completed}
                    fallback={
                      <input
                        onClick={() =>
                          updateTask(task.content, !task.completed)
                        }
                        type="checkbox"
                        class="checkbox rounded-full mr-3"
                      />
                    }
                  >
                    <input
                      onClick={() => updateTask(task.content, !task.completed)}
                      type="checkbox"
                      checked
                      class="checkbox rounded-full mr-3"
                    />
                  </Show>
                  <input
                    type="text "
                    value={task.content}
                    class="flex flex-wrap  bg-transparent focus:outline-none"
                    onChange={(e) => (task.content = e.currentTarget.value)}
                  />
                </div>
                <Show when={task.date}>
                  <div class="flex flex-col items-center text-sm p-2">
                    <div class="grid  card bg-base-300 rounded-box place-items-center">
                      <div class="flex">
                        <p>{task.date}</p>
                      </div>
                    </div>
                    <div class="divider w-full my-0.5">Time Remaining</div>
                    <div class="grid card bg-base-300 rounded-box place-items-center">
                      <TaskTimer setDate={task.date} />
                    </div>
                  </div>
                </Show>
                <Show
                  when={task.tag === "high"}
                  fallback={
                    <FaRegularStar
                      class="hover:scale-110 hover:cursor-pointer"
                      onClick={[updateTag, task.content]}
                    />
                  }
                >
                  <div
                    class="badge badge-primary hover:scale-110 hover:cursor-pointer"
                    typeof="button"
                    onClick={[updateTag, task.content]}
                  >
                    {task.tag}
                  </div>
                </Show>
                <FaSolidSquareXmark
                  onClick={[deleteTask, task.content]}
                  class="mr-5 hover:cursor-pointer hover:scale-110"
                />
              </div>
            )}
          </For>
          <div class="container absolute bottom-0 right-0 pb-8">
            <div class=" flex justify-center items-center">
              <input
                class={`input w-1/2 bg-transparent backdrop-blur shadow-2xl input-bordered mr-1 ${
                  theme() === "light" || theme() === "pastel"
                    ? "border-accent"
                    : "border-accent"
                }`}
                id="greet-input"
                onChange={(e) => setNewTask(e.currentTarget.value)}
                placeholder="+  Add a task"
                value={newTask()}
              />
              <Calendar />
              <button
                onClick={() => addTask(newTask(), calendarRes(), false)}
                class={` btn btn-outline backdrop-blur bg-transparent lowercase ${
                  theme() === "light" || theme() === "pastel"
                    ? "text-gray-200 border-accent"
                    : "text-gray-200 border-accent"
                }`}
                type="button"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
