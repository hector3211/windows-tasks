import { setImageUrl, imageUrl, pop, setTheme } from "../UserState";
import { BsThreeDots } from "solid-icons/bs";

export default function ThemeButton() {
  return (
    <div class="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} class="">
        <BsThreeDots class="text-xl lg:text-3xl hover:cursor-pointer hover:scale-110 " />
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content menu p-2 shadow-2xl bg-base-300 rounded-box w-52"
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
