import { useRef } from "react";
import { v4 as uidV4 } from "uuid";
import { TaskObject } from "../../../data/task";
import { TasksActions } from "../../../reducers/tasks/action-creators";

export const useLogic = () => {
   const ref = useRef<HTMLInputElement>(null);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      if (!ref.current?.value) {
         return;
      }

      const task: TaskObject = {
         id: uidV4(),
         name: ref.current.value,
         time: Date.now(),
         status: "active"
      };

      TasksActions.addTask(task);

      ref.current.value = "";
   };

   return { ref, handleSubmit };
}