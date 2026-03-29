export type TaskStatus = "Todo" | "In Progress" | "Done";
export type TaskIcon = {
  name: string;
  backgroundColor: string;
};

export type Task = {
  id: string;
  category: string;
  title: string;
  time: string;
  status: TaskStatus;
  icon: TaskIcon;
};

export const TASKS: Task[] = [
  {
    id: "1",
    category: "Grocery shopping app design",
    title: "Market Reasearch",
    time: "10:00 AM",
    status: "Done",
    icon: { name: "grid", backgroundColor: "#ff6bba" },
  },
  {
    id: "2",
    category: "Personal Project",
    title: "Code Review",
    time: "11:30 AM",
    status: "In Progress",
    icon: { name: "code", backgroundColor: "#4ade80" },
  },
  {
    id: "3",
    category: "Fitness",
    title: "Gym Session",
    time: "05:00 PM",
    status: "Todo",
    icon: { name: "fitness", backgroundColor: "#38bdf8" },
  },
  {
    id: "4",
    category: "Work",
    title: "Client Meeting",
    time: "02:00 PM",
    status: "Todo",
    icon: { name: "people", backgroundColor: "#f59e0b" },
  },
  {
    id: "5",
    category: "Learning",
    title: "React Native Tutorial",
    time: "08:00 PM",
    status: "Done",
    icon: { name: "book", backgroundColor: "#a855f7" },
  },
];
