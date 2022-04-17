import { FC, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { TaskDto } from "./data/task";
import { v4 as uidV4 } from "uuid";
import { RenderIf } from "./components/base/render-if";

export const App: FC = () => {

   const [list, setList] = useState<Array<TaskDto>>([]);

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

      const { code, currentTarget: { value } } = event;

      if (code === "Enter") {

         if (!value) {
            return;
         }

         const task: TaskDto = {
            id: uidV4(),
            name: value,
            time: Date.now(),
            status: "active"
         };

         setList([task, ...list]);
         event.currentTarget.value = "";
      }
   };

   const finishTask = (id: string) => {
      const index = list.findIndex(t => t.id === id);
      if (index === -1) {
         return;
      }

      const task = list[index];

      task.status = "finished";

      setList([...list.slice(0, index), task, ...list.slice(index + 1)]);
   }

   const closeTask = (id: string) => {
      const index = list.findIndex(t => t.id === id);
      if (index === -1) {
         return;
      }

      const task = list[index];

      task.status = "closed";

      setList([...list.slice(0, index), task, ...list.slice(index + 1)]);
   }

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
            {list.map((item, index) => (
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