import { FC, useRef } from "react";
import { v4 as uidV4 } from "uuid";
import { TaskDto } from "../../../data/task";
import { TasksActions } from "../../../reducers/tasks/action-creators";

export const TextBox: FC = () => {

   const ref = useRef<HTMLInputElement>(null);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      if (!ref.current?.value) {
         return;
      }

      const task: TaskDto = {
         id: uidV4(),
         name: ref.current.value,
         time: Date.now(),
         status: "active"
      };

      TasksActions.addTask(task);

      ref.current.value = "";
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            ref={ref}
            type="text"
            className="w-full rounded mt-2 outline-none leading-10 border px-4 selection:bg-gray-100 font-mono placeholder:text-sm"
            placeholder="Type here to clear your mind"
            spellCheck={false}
            autoComplete="off"
         />
      </form>
   );
};