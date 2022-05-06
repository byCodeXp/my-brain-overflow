import { FC, memo } from "react";
import { TaskObject } from "../../../../data/task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props extends TaskObject {
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
                  <FontAwesomeIcon className={`_icon ${status === "finished" && "_finished"}`} icon={faCheck} />
               </div>
            )}
            {status !== "finished" && (
               <div onClick={() => onClose(id)} className={`_button ${status === "active" && "_active"}`}>
                  <FontAwesomeIcon className={`_icon ${status === "closed" && "_closed"}`} icon={faXmark} />
               </div>
            )}
         </div>
      </li>
   );
}, (prevProps, nextProps) => prevProps.id === nextProps.id && prevProps.status === nextProps.status);
