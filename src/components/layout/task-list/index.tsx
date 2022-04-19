import { FC } from "react";
import { TaskStatus } from "../../../data/task";
import { TasksActions } from "../../../reducers/tasks/action-creators";
import { useAppSelector } from "../../../store/hooks";
import { ListItem } from "./list-item";

export const TaskList: FC = () => {

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

   return (
      <ol className="py-2 space-y-2 _list">
         {sortedTasks.map((item) => (
            <ListItem
               key={item.id}
               {...item}
               onClose={(id) => setTaskStatus(id, "closed")}
               onFinish={(id) => setTaskStatus(id, "finished")}
            />
         ))}
      </ol>
   );
};