import { createEffect } from "solid-js";
import { setToast } from "../UserState";

export default function ToastNoti() {
  return (
    <div class="toast toast-top toast-start ml-2">
      <div class="alert alert-info w-52 drop-shadow-2xl">
        <div>
          <span>Timer Stoped!</span>
        </div>
      </div>
    </div>
  );
}
