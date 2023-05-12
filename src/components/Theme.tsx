import { setTheme, theme } from "../UserState";
import { BsThreeDots } from "solid-icons/bs";

export default function ThemeButton() {
  return (
    <div
      class={`dropdown dropdown-bottom dropdown-start fixed left-5 top-3 ${
        theme() === "light" || theme() === "pastel"
          ? "text-black"
          : "text-gray-300"
      }`}
    >
      <label tabIndex={0} class="">
        <BsThreeDots
          class={`text-2xl text-base-100 hover:cursor-pointer hover:scale-110`}
        />
      </label>
      <ul
        tabIndex={0}
        class={`dropdown-content menu p-2 shadow-2xl bg-base-300 rounded-box w-52 z-50 ${
          theme() === "light" || theme() === "pastel"
            ? "text-black"
            : "text-white"
        }`}
      >
        <li>
          <a onClick={() => setTheme("dark")}>Dark</a>
        </li>
        <li>
          <a onClick={() => setTheme("light")}>Light</a>
        </li>
        <li>
          <a onClick={() => setTheme("dracula")}>Dracula</a>
        </li>
        <li>
          <a onClick={() => setTheme("pastel")}>Pastel</a>
        </li>
      </ul>
    </div>
  );
}
