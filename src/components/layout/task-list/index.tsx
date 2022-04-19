import { FC, useEffect } from "react";
import { TaskDto, TaskStatus } from "../../../data/task";
import { tasksActions } from "../../../reducers/tasks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { StorageUtility } from "../../../utilities/storage";
import { ListItem } from "./list-item";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const TaskList: FC = () => {

   const dispatch = useAppDispatch();

   const tasks = useAppSelector(state => state.tasksReducer.tasks);

   const setTaskStatus = (id: string, status: TaskStatus) => {

      const index = tasks.findIndex(t => t.id === id);

      if (index === -1) return;

      const task = tasks[index];

      dispatch(tasksActions.changeTask({ ...task, status }));
   };

   const sortedTasks = [
      ...tasks.filter(i => i.status === "active").sort((a, b) => b.time - a.time),
      ...tasks.filter(i => i.status !== "active").sort((a, b) => b.time - a.time)
   ];

   useEffect(() => {
      tasks && tasks.length > 0 && storage.set(tasks);
   }, [tasks]);

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