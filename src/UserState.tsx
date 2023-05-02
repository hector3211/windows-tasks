import { createSignal } from "solid-js";
import { Task, ThemeOptions } from "./types";

export const [tasks, setTasks] = createSignal<Task[]>([]);
export const [newTask, setNewTask] = createSignal("");
export const [selectedTask, setSelectedTask] = createSignal("");
export const [pop, setPop] = createSignal<true | false>(false);
export const [theme, setTheme] = createSignal<ThemeOptions>("dark");
export const [time, setTime] = createSignal("00:00");
export const [min, setMin] = createSignal<number>(0);
export const [intervalId, setIntervalId] = createSignal<number | undefined>(
  undefined
);
export const [started, setStarted] = createSignal(false);
export const [path, setPath] = createSignal("");
export const [calendarRes, setCalendarRes] = createSignal("");
export const [toast, setToast] = createSignal<true | false>(true);
