import { FC, useEffect, useState } from "react";
import { StorageUtility } from "../../../utilities/storage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

const storage = new StorageUtility<number>("WATER_TIME");

const ONE_MINUTE = 60_000;
const ONE_HOUR = 3_600_000;

const DrinkReminder: FC = () => {

   const [remind, setRemind] = useState(false);

   const click = () => {
      storage.set(Date.now());
      setRemind(false);
   };

   const check = () => {
      const now = Date.now();
      const lastTime = storage.get();

      if (lastTime) {
         const diff = now - lastTime;
         if (diff > ONE_HOUR) {
            setRemind(true);
         }
      } else {
         storage.set(now - ONE_HOUR);
         setRemind(true);
      }
   };

   useEffect(() => {
      check();

      const interval = setInterval(check, ONE_MINUTE);
      return () => {
         clearInterval(interval);
      };

   }, []);

   if (!remind) {
      return <></>;
   };

   return (
      <div className="flex justify-between mt-2">
         <span className="text-slate-500 leading-8 text-xs">It's water time {":)"}</span>
         <button onClick={click} className="bg-sky-50 border-sky-400 border w-8 h-8 rounded">
            <FontAwesomeIcon icon={faDroplet} className="text-blue-400" />
         </button>
      </div>
   );
};

export default DrinkReminder;