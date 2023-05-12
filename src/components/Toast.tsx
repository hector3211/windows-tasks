import { TiWarningOutline } from "solid-icons/ti";

export default function ToastNoti() {
  return (
    <div class="absolute bottom-28 right-1/4 alert alert-info w-72 shadow-lg">
      <div class="flex justify-center text-xl">
        <TiWarningOutline />
        <span>Timer stopped</span>
      </div>
    </div>
  );
}
