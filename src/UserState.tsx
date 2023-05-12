import { createSignal } from "solid-js";
import { Importance, Task, ThemeOptions } from "./types";

export const [tasks, setTasks] = createSignal<Task[]>([]);
export const [newTask, setNewTask] = createSignal("");
export const [selectedTask, setSelectedTask] = createSignal("");
export const [theme, setTheme] = createSignal<ThemeOptions>("dark");
export const [time, setTime] = createSignal("00:00");
export const [min, setMin] = createSignal<number>(0);
export const [intervalId, setIntervalId] = createSignal<number | undefined>(
  undefined
);
export const [started, setStarted] = createSignal(false);
export const [calendarRes, setCalendarRes] = createSignal("");
export const [toast, setToast] = createSignal<true | false>(false);
export const [importanceTag, setImportanceTag] = createSignal<
  Importance | undefined
>(undefined);
export const [starClicked, setStarCliked] = createSignal<true | false>(false);
export const [tasksCompleted, setTasksCompleted] = createSignal<
  number | undefined
>(undefined);
