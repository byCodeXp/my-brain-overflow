import { TaskStatus } from "../../../data/task";
import { TasksActions } from "../../../reducers/tasks/action-creators";
import { useAppSelector } from "../../../store/hooks";

export const useLogic = () => {

   const tasks = useAppSelector(state => state.tasksReducer.tasks);

   const setTaskStatus = (id: string, status: TaskStatus) => {

      const index = tasks.findIndex(t => t.id === id);

      if (index === -1) return;

      const task = tasks[index];

      TasksActions.changeTask({ ...task, status });
   };

   const sortedTasks = [
      ...tasks.filter(i => i.status === "active").sort((a, b) => b.time - a.time),
      ...tasks.filter(i => i.status !== "active").sort((a, b) => b.time - a.time)
   ];

   return { sortedTasks, setTaskStatus };
};