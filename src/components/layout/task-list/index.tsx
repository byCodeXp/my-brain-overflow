import { FC } from "react";
import { ListItem } from "./list-item";
import { useLogic } from "./logic";

export const TaskList: FC = () => {

   const { sortedTasks, setTaskStatus } = useLogic();

   return (
      <ol className="py-2 space-y-2 _list">
         {sortedTasks.map((item) => (
            <ListItem
               key={item.id}
               {...item}
               onClose={(id) => setTaskStatus(id, "closed")}
               onFinish={(id) => setTaskStatus(id, "finished")}
            />
         ))}
      </ol>
   );
};