import { FC, lazy, Suspense, useEffect } from "react";
import { TaskObject } from "./data/task";
import { StorageUtility } from "./utilities/storage";
import { TaskList } from "./components/layout/task-list";
import { TextBox } from "./components/layout/text-box";
import { TasksActions } from "./reducers/tasks/action-creators";

const DrinkReminder = lazy(() => import("./components/layout/drink-reminder"));

const storage = new StorageUtility<TaskObject[]>("YOUR_MIND_STORAGE");

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
         <Suspense>
            <DrinkReminder />
         </Suspense>
         <TaskList />
      </div>
   );
};