import { FC, useEffect, useRef, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { TaskDto } from "./data/task";
import { v4 as uidV4 } from "uuid";
import { RenderIf } from "./components/base/render-if";
import { StorageUtility } from "./utilities/storage";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const App: FC = () => {

   const inputRef = useRef<HTMLInputElement>(null);

   const [list, setList] = useState<Array<TaskDto>>([]);

   const sortedList = [
      ...list.filter(t => t.status === "active").sort((a, b) => b.time - a.time),
      ...list.filter(t => t.status !== "active").sort((a, b) => b.time - a.time)
   ];

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

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      if (!inputRef.current?.value) {
         return;
      }

      addTask(inputRef.current.value);

      inputRef.current.value = "";
   }

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
         <ol className="py-2 space-y-2 _list">
            {sortedList.map((item, index) => (
               <li key={index} className="_item flex justify-between gap-x-8">
                  <span className="text-sm leading-8 font-medium text-gray-700">{item.name}</span>
                  <div className="flex gap-x-1">
                     <RenderIf condition={item.status !== "closed"}>
                        <div
                           onClick={() => finishTask(item.id)}
                           className={`_button ${item.status === "active" && "_active"}`}
                        >
                           <CheckIcon
                              className={`_icon ${item.status === "finished" && "_finished"}`}
                              strokeWidth={4}
                           />
                        </div>
                     </RenderIf>
                     <RenderIf condition={item.status !== "finished"}>
                        <div
                           onClick={() => closeTask(item.id)}
                           className={`_button ${item.status === "active" && "_active"}`}
                        >
                           <XIcon
                              className={`_icon ${item.status === "closed" && "_closed"}`}
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