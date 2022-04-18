import { FC, useEffect, useRef, useState } from "react";
import { TaskDto, TaskStatus } from "./data/task";
import { v4 as uidV4 } from "uuid";
import { StorageUtility } from "./utilities/storage";
import { TaskList } from "./components/layout/task-list";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const App: FC = () => {

   const inputRef = useRef<HTMLInputElement>(null);

   const [tasks, setTasks] = useState<Array<TaskDto>>([]);

   const setTaskStatus = (taskId: string, status: TaskStatus) =>
      setTasks((tasks) => {
         const index = tasks.findIndex(t => t.id === taskId);
         if (index === -1) {
            return tasks;
         }

         const task = tasks[index];
         task.status = status;

         return [...tasks.slice(0, index), task, ...tasks.slice(index + 1)];
      });

   const addTask = (value: string) => {
      const task: TaskDto = {
         id: uidV4(),
         name: value,
         time: Date.now(),
         status: "active"
      };

      setTasks((prev) => [task, ...prev])
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      if (!inputRef.current?.value) {
         return;
      }

      addTask(inputRef.current.value);

      inputRef.current.value = "";
   }

   useEffect(() => {
      const tasks = storage.get();
      if (tasks) {
         setTasks(tasks);
      }
   }, []);

   useEffect(() => {
      tasks && tasks.length > 0 && storage.set(tasks);
   }, [tasks]);

   return (
      <div className="max-w-lg mx-auto px-8">
         <form onSubmit={handleSubmit}>
            <input
               ref={inputRef}
               type="text"
               className="w-full rounded mt-2 outline-none leading-10 border px-4 selection:bg-gray-100 font-mono placeholder:text-sm"
               placeholder="Type here to clear your mind"
               spellCheck={false}
               autoComplete="off"
            />
         </form>
         <TaskList
            items={tasks}
            onCloseTask={(id) => setTaskStatus(id, "closed")}
            onFinishTask={(id) => setTaskStatus(id, "finished")}
         />
      </div>
   );
};