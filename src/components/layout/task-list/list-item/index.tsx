import { FC, memo } from "react";
import { TaskDto } from "../../../../data/task";
import { RenderIf } from "../../../base/render-if";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

interface Props extends TaskDto {
   onFinish: (id: string) => void;
   onClose: (id: string) => void;
}

export const ListItem: FC<Props> = memo(({ id, name, status, onClose, onFinish }) => {
   return (
      <li key={id} className="_item flex justify-between gap-x-8">
         <span className="text-sm leading-8 font-medium text-gray-700">{name}</span>
         <div className="flex gap-x-1">
            <RenderIf condition={status !== "closed"}>
               <div onClick={() => onFinish(id)} className={`_button ${status === "active" && "_active"}`} >
                  <CheckIcon className={`_icon ${status === "finished" && "_finished"}`} strokeWidth={4} />
               </div>
            </RenderIf>
            <RenderIf condition={status !== "finished"}>
               <div onClick={() => onClose(id)} className={`_button ${status === "active" && "_active"}`}>
                  <XIcon className={`_icon ${status === "closed" && "_closed"}`} strokeWidth={4} />
               </div>
            </RenderIf>
         </div>
      </li>
   );
}, (a, b) => a.id === b.id && a.status === b.status);
