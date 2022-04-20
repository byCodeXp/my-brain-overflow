import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { useLogic } from "./logic";

const DrinkReminder: FC = () => {

   const { remind, click } = useLogic();

   if (!remind) {
      return <></>;
   };

   return (
      <div className="flex justify-between mt-2">
         <span className="text-slate-500 leading-8 text-xs">It's water time {":)"}</span>
         <button onClick={click} className="bg-sky-50 border-sky-400 border w-8 h-8 rounded">
            <FontAwesomeIcon icon={faDroplet} className="animate-scale text-blue-400" />
         </button>
      </div>
   );
};

export default DrinkReminder;