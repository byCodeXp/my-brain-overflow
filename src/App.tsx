import { FC, useEffect } from "react";
import { TaskDto } from "./data/task";
import { StorageUtility } from "./utilities/storage";
import { TaskList } from "./components/layout/task-list";
import { TextBox } from "./components/layout/text-box";
import { DrinkReminder } from "./components/layout/drink-reminder";
import { useAppDispatch } from "./store/hooks";
import { tasksActions } from "./reducers/tasks";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const App: FC = () => {

   const dispatch = useAppDispatch();

   useEffect(() => {
      const tasks = storage.get();
      if (tasks && tasks.length > 0) {
         dispatch(tasksActions.setTasks(tasks));
      }
   }, []);

   return (
      <div className="max-w-lg mx-auto px-8">
         <TextBox />
         <DrinkReminder />
         <TaskList />
      </div>
   );
};