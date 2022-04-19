import { FC, useEffect } from "react";
import { TaskDto } from "./data/task";
import { StorageUtility } from "./utilities/storage";
import { TaskList } from "./components/layout/task-list";
import { TextBox } from "./components/layout/text-box";
import { DrinkReminder } from "./components/layout/drink-reminder";
import { TasksActions } from "./reducers/tasks/action-creators";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const App: FC = () => {

   useEffect(() => {
      const tasks = storage.get();
      if (tasks && tasks.length > 0) {
         TasksActions.setTasks(tasks);
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