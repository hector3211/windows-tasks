import { createSignal, onCleanup } from "solid-js";
import moment from "moment";

type TaskTimerProps = {
  setDate: string;
};

export default function TaskTimer({ setDate }: TaskTimerProps) {
  const [remaingTime, setRemainingTime] = createSignal<string>("");
  const fomater = "YYYY-MM-DD hh:mm:ss A";
  const userNotFomat = moment(setDate);
  const curr = moment().format("ddd MMM DD YYYY HH:mm:ss");
  const diffInMs = moment(userNotFomat).diff(curr);
  // const diffDuration = moment.duration(diffInMs);
  console.log(`USERDATE NOT FORMAT---- ${userNotFomat}`);
  console.log(`COMPUTERDATE ---- ${curr}`);
  console.log(`DIFF ---- ${diffInMs}`);
  if (userNotFomat.isBefore(curr)) {
    console.log("YESSS");
  }
  function getRemainingTime() {
    const user = moment(setDate).format("YYYY-MM-DD hh:mm:ss ");
    const curr = moment().format("YYYY-MM-DD hh:mm:ss ");
    // fomat dates to be able to compare
    const userNotFomat = moment(setDate);
    const currFomat = moment().format("ddd MMM DD YYYY HH:mm:ss");

    const diffInMs = moment(user).diff(curr);
    const diffDuration = moment.duration(diffInMs);

    const days = diffDuration.days();
    const hours = diffDuration.hours();
    const minutes = diffDuration.minutes();
    if (userNotFomat.isBefore(currFomat)) {
      return "Past Due";
    } else {
      return `${days > 0 ? `${days} days` : ""} ${
        hours > 0 ? `${hours} hours` : ""
      } ${minutes > 0 ? `${minutes} minutes` : ""}`;
    }
  }

  const interval = setInterval(() => {
    setRemainingTime(getRemainingTime());
  }, 1000);

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <div>
      <p class="text-sm ">{remaingTime()}</p>
    </div>
  );
}
