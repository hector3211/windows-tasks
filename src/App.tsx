import { FaSolidSquareXmark } from "solid-icons/fa";

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
  importanceTag,
  setStarCliked,
  starClicked,
} from "./UserState";
import { Importance, Task } from "./types";
import ThemeButton from "./components/Theme";
import MainLayout from "./Layout";
import Drawer from "./components/Drawer";
import { createEffect } from "solid-js";
import Calendar from "./components/Timepicker";
import { AiOutlineStar } from "solid-icons/ai";

function App() {
  createEffect(() => {
    async function readTasks() {
      try {
        const fileContens = await readTextFile("task.json", {
          dir: BaseDirectory.AppLocalData,
        });
        const parsedTasks: Task[] = JSON.parse(fileContens);
        setTasks([...tasks(), ...parsedTasks]);
      } catch (error) {
        console.log(error);
      }
    }

    readTasks();
  });
  async function preWindowClose() {
    await appWindow.onCloseRequested(async () => {
      const parsed = JSON.stringify(tasks());
      await writeTextFile("task.json", parsed, {
        dir: BaseDirectory.AppLocalData,
      });
    });
  }

  preWindowClose();

  async function addTask(
    contentOfTask: string,
    dateOfTask: string | undefined,
    tagOfTask: Importance | undefined = "low",
    completedOfTask: boolean
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

  async function deleteTask(contentOfTask: string) {
    let newList: Task[] = tasks().filter(
      (task) => task.content !== contentOfTask
    );
    setTasks(newList);
  }

  async function updateTask(contents: string, isComplete: boolean) {
    let updatedList: Task[] = [];
    for (const task of tasks()) {
      if (task.content === contents) {
        task.completed = isComplete;
      }
      updatedList.push(task);
    }

    setTasks(updatedList);
  }

  return (
    <MainLayout>
      <div class="flex">
        <Drawer />
        <ThemeButton />
        <div class="flex flex-col w-full justify-start items-end pt-9 h-screen px-8 overflow-y-auto">
          {tasks().map((task: Task) => (
            <div class="flex justify-between w-full bg-base-300 text-xl items-center my-1 py-3 rounded-md">
              <div class="flex justify-center items-center ml-5 ">
                {task.completed ? (
                  <input
                    onclick={() => updateTask(task.content, !task.completed)}
                    type="checkbox"
                    checked
                    class="checkbox mr-3"
                  />
                ) : (
                  <input
                    onclick={() => updateTask(task.content, !task.completed)}
                    type="checkbox"
                    class="checkbox mr-3"
                  />
                )}
                <input
                  type="text"
                  value={task.content}
                  class="w-full bg-transparent focus:outline-none"
                  onChange={(e) => (task.content = e.currentTarget.value)}
                />
                <p class="text-sm w-5/12">{task?.date}</p>
                {task.tag === "high" && (
                  <span class="badge badge-primary">{task.tag}</span>
                )}
                {task.tag === "low" && <span class="badge">{task.tag}</span>}
              </div>
              <FaSolidSquareXmark
                onClick={() => deleteTask(task.content)}
                class="mr-5 hover:cursor-pointer hover:scale-110"
              />
            </div>
          ))}
          <div class="container absolute bottom-0  pb-8">
            <div class=" flex justify-end items-center">
              <input
                class={`input w-1/3 bg-transparent backdrop-blur shadow-2xl input-bordered mr-1 ${
                  theme() === "light" || theme() === "pastel"
                    ? "border-white"
                    : "border-white"
                }`}
                id="greet-input"
                onChange={(e) => setNewTask(e.currentTarget.value)}
                placeholder="+  Add a task"
                value={newTask()}
              />
              <Calendar />
              <button
                class={`mr-1 btn btn-outline hover:text-white text-white ${
                  starClicked() ? "bg-primary hover:bg-primary" : ""
                }`}
                onClick={() => {
                  setImportanceTag("high");
                  setStarCliked((prev) => !prev);
                }}
              >
                <AiOutlineStar class="text-xl" />
              </button>
              <button
                onClick={() =>
                  addTask(newTask(), calendarRes(), importanceTag(), false)
                }
                class={` btn btn-outline backdrop-blur ${
                  theme() === "light" || theme() === "pastel"
                    ? "text-white border-white"
                    : "text-white border-white"
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
