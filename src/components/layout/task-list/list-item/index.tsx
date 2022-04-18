import { FC, memo } from "react";
import { TaskDto } from "../../../../data/task";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

interface Props extends TaskDto {
   onFinish: (id: string) => void;
   onClose: (id: string) => void;
}

const Text: FC<{ text: string }> = memo(({ text }) => {
   return (
      <span className="text-sm leading-8 font-medium text-gray-700">{text}</span>
   );
}, () => true);

export const ListItem: FC<Props> = memo(({ id, name, status, onClose, onFinish }) => {
   return (
      <li key={id} className="_item flex justify-between gap-x-8">
         <Text text={name} />
         <div className="flex gap-x-1">
            {status !== "closed" && (
               <div onClick={() => onFinish(id)} className={`_button ${status === "active" && "_active"}`} >
                  <CheckIcon className={`_icon ${status === "finished" && "_finished"}`} strokeWidth={4} />
               </div>
            )}
            {status !== "finished" && (
               <div onClick={() => onClose(id)} className={`_button ${status === "active" && "_active"}`}>
                  <XIcon className={`_icon ${status === "closed" && "_closed"}`} strokeWidth={4} />
               </div>
            )}
         </div>
      </li>
   );
}, (prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.status === nextProps.status);
