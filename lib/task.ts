export type Task = {
  id: number;
  text: string;
  category: string;
  done: boolean;
  deadline?: string;
};

type TasksMap = {
  [user: string]: Task[];
};

const isBrowser = typeof window !== "undefined";

const getAllTasks = (): TasksMap => {
  if (!isBrowser) {
    return {};
  }

  return JSON.parse(localStorage.getItem("tasks") || "{}");
};

const saveAllTasks = (tasks: TasksMap) => {
  if (!isBrowser) {
    return;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getTasks = (user: string): Task[] => {
  const allTasks = getAllTasks();

  return allTasks[user] || [];
};

export const addTask = (user: string, task: Task): Task[] => {
  const allTasks = getAllTasks();

  if (!allTasks[user]) {
    allTasks[user] = [];
  }

  allTasks[user].push(task);
  saveAllTasks(allTasks);

  return allTasks[user];
};

export const deleteTask = (user: string, id: number): Task[] => {
  const allTasks = getAllTasks();

  const updated = (allTasks[user] || []).filter((task) => task.id !== id);

  allTasks[user] = updated;
  saveAllTasks(allTasks);

  return updated;
};

export const toggleTask = (user: string, id: number): Task[] => {
  const allTasks = getAllTasks();

  const updated = (allTasks[user] || []).map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
  );

  allTasks[user] = updated;
  saveAllTasks(allTasks);

  return updated;
};