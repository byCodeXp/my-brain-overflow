import { FC, useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { TaskDto } from "./data/task";
import { v4 as uidV4 } from "uuid";

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
            time: Date.now()
         };

         setList([task, ...list]);
         event.currentTarget.value = "";
      }
   }

   return (
      <div className="max-w-lg mx-auto">
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
                     <div className="w-8 h-8 flex rounded border bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        <CheckIcon className="m-auto h-3 w-3 text-gray-300" strokeWidth={4} />
                     </div>
                     <div className="w-8 h-8 flex rounded border bg-gray-50 hover:bg-gray-100 cursor-pointer">
                        <XIcon className="m-auto h-3 w-3 text-gray-300" strokeWidth={4} />
                     </div>
                  </div>
               </li>
            ))}
         </ol>
      </div>
   )
}