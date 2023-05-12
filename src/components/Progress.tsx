import { createEffect, createSignal } from "solid-js";
import { setTasksCompleted, tasks, tasksCompleted } from "../UserState";

export default function ProgressBar() {
  const [tasksInList, setTasksInList] = createSignal<number>(0);
  const [tasksDone, setTasksDone] = createSignal<number>(0);
  createEffect(() => {
    let numOfTasksCompleted = 0;
    let numOfTasks = 0;
    for (const task of tasks()) {
      if (task.completed) {
        numOfTasksCompleted += 1;
      }
      numOfTasks += 1;
    }

    setTasksInList(numOfTasks);
    setTasksDone(numOfTasksCompleted);
    setTasksCompleted((numOfTasksCompleted / numOfTasks) * 100);
  });
  return (
    <div class="flex flex-col items-center z-50">
      {tasksDone() > 0 ? (
        <div class="container ">
          <p class="mb-3 flex justify-center text-xl font-bold">{`${tasksDone()}/${tasksInList()} Completed`}</p>
          <progress
            class="progress progress-accent"
            value={`${tasksCompleted() ? tasksCompleted() : 0}`}
            max="100"
          ></progress>
        </div>
      ) : (
        <div class="container ">
          <p class="mb-3 flex justify-center text-xl font-bold">{`${tasksDone()}/${tasksInList()} Completed`}</p>
          <progress class="progress progress-primary"></progress>
        </div>
      )}
    </div>
  );
}
