import { FC, useEffect, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { TaskDto } from "./data/task";
import { v4 as uidV4 } from "uuid";
import { RenderIf } from "./components/base/render-if";
import { StorageUtility } from "./utilities/storage";

const storage = new StorageUtility<TaskDto[]>("TASK_STORAGE");

export const App: FC = () => {

   const [list, setList] = useState<Array<TaskDto>>([]);

   const sortList = () => {
      const activeTasks = list.filter(t => t.status === "active");
      const completedTasks = list.filter(t => t.status !== "active"); 
      return [
         ...activeTasks.sort((a, b) => b.time - a.time),
         ...completedTasks.sort((a, b) => b.time - a.time)
      ];
   }

   const addTask = (value: string) => {
      const task: TaskDto = {
         id: uidV4(),
         name: value,
         time: Date.now(),
         status: "active"
      };

      const prepare = [task, ...list];

      storage.set(prepare);

      setList(prepare);
   };

   const handleKeyDown = ({ code, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {

      const { value } = currentTarget;

      if (code === "Enter") {

         if (!value) return;

         addTask(value);

         currentTarget.value = "";
      }
   };

   const finishTask = (id: string) => {
      const index = list.findIndex(t => t.id === id);
      if (index === -1) {
         return;
      }

      const task = list[index];
      task.status = "finished";

      const prepare = [...list.slice(0, index), task, ...list.slice(index + 1)];

      storage.set(prepare);

      setList(prepare);
   }

   const closeTask = (id: string) => {
      const index = list.findIndex(t => t.id === id);
      if (index === -1) {
         return;
      }

      const task = list[index];

      task.status = "closed";

      const prepare = [...list.slice(0, index), task, ...list.slice(index + 1)];

      storage.set(prepare);

      setList(prepare);
   }

   useEffect(() => {
      const tasks = storage.get();
      if (tasks) {
         setList(tasks);
      }
   }, []);

   return (
      <div className="max-w-lg mx-auto px-8">
         <input
            onKeyDown={handleKeyDown}
            type="text"
            className="w-full rounded mt-2 outline-none leading-10 border px-4 selection:bg-gray-100 font-mono placeholder:text-sm"
            placeholder="Type here to clear your mind"
            spellCheck={false}
            autoComplete="off"
         />
         <ol className="py-2 space-y-2">
            {sortList().map((item, index) => (
               <li key={index} className="flex justify-between gap-x-8">
                  <span className="text-sm leading-8 font-medium text-gray-700">{item.name}</span>
                  <div className="flex gap-x-1">
                     <RenderIf condition={item.status !== "closed"}>
                        <div
                           onClick={() => finishTask(item.id)}
                           className={
                              "w-8 h-8 flex rounded cursor-pointer " +
                              (item.status === "finished" ? "bg-transparent" : "border bg-gray-50 hover:bg-gray-100")
                           }
                        >
                           <CheckIcon
                              className={"m-auto h-3 w-3 " + (item.status === "finished" ? "text-cyan-500" : "text-gray-300")}
                              strokeWidth={4}
                           />
                        </div>
                     </RenderIf>
                     <RenderIf condition={item.status !== "finished"}>
                        <div
                           onClick={() => closeTask(item.id)}
                           className={
                              "w-8 h-8 flex rounded cursor-pointer " +
                              (item.status === "closed" ? "bg-transparent" : "border bg-gray-50 hover:bg-gray-100")
                           }
                        >
                           <XIcon
                              className={"m-auto h-3 w-3 " + (item.status === "closed" ? "text-red-500" : "text-gray-300")}
                              strokeWidth={4}
                           />
                        </div>
                     </RenderIf>
                  </div>
               </li>
            ))}
         </ol>
      </div>
   );
};