import { PropsWithChildren } from "solid-js";
import { theme } from "./UserState";

export default function MainLayout(props: PropsWithChildren) {
  const children = props.children;

  return (
    <div
      data-theme={theme()}
      class="max-h-screen max-w-full relative bg-[url('/leafsthree.jpg')] bg-left "
    >
      {children}
    </div>
  );
}
