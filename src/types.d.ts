export type Task = {
  content: string;
  date: string | undefined;
  tag: Importance | undefined;
  completed: boolean;
};

export type ThemeOptions = "dark" | "light" | "dracula" | "pastel";
export type Importance = "high" | "medium" | "low";
