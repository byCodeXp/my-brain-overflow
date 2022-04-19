import { FC, useEffect, useRef } from "react";
import { v4 as uidV4 } from "uuid";
import { TaskDto } from "../../../data/task";
import { tasksActions } from "../../../reducers/tasks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { StorageUtility } from "../../../utilities/storage";

const storage = new StorageUtility<TaskDto[]>("YOUR_MIND_STORAGE");

export const TextBox: FC = () => {

   const dispatch = useAppDispatch();

   const tasks = useAppSelector(state => state.tasksReducer.tasks);

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

      dispatch(tasksActions.addTask(task));

      ref.current.value = "";
   };

   useEffect(() => {
      tasks && tasks.length > 0 && storage.set(tasks);
   }, [tasks]);

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