import { FC } from "react";
import { TaskDto } from "../../../data/task";
import { ListItem } from "./list-item";

interface Props {
   items: Array<TaskDto>;
   onCloseTask: (id: string) => void;
   onFinishTask: (id: string) => void;
}

export const TaskList: FC<Props> = ({ items, onCloseTask, onFinishTask }) => {

   const sortedItems = [
      ...items.filter(i => i.status === "active").sort((a, b) => b.time - a.time),
      ...items.filter(i => i.status !== "active").sort((a, b) => b.time - a.time)
   ];

   return (
      <ol className="py-2 space-y-2 _list">
         {sortedItems.map((item) => (
            <ListItem key={item.id} {...item} onClose={onCloseTask} onFinish={onFinishTask} />
         ))}
      </ol>
   );
};