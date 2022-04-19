import { FC, useEffect, useState } from "react";
import { StorageUtility } from "../../../utilities/storage";

const storage = new StorageUtility<number>("WATER_TIME");

export const DrinkReminder: FC = () => {

   const [remind, setRemind] = useState(false);

   const click = () => {
      storage.set(Date.now());
      setRemind(false);
   };

   useEffect(() => {

      const interval = setInterval(() => {

         const now = Date.now();
         const lastTime = storage.get();

         if (lastTime) {
            const diff = now - lastTime;
            if (diff > 10000) {
               setRemind(true);
            }
         } else {
            storage.set(now);
         }

      }, 1000);

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
         <button onClick={click} className="bg-sky-50 border-sky-400 border w-8 h-8 rounded font-medium text-blue-50">
            <svg className="w-4 h-4 m-auto text-sky-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
               <path d="M16 319.1C16 245.9 118.3 89.43 166.9 19.3C179.2 1.585 204.8 1.585 217.1 19.3C265.7 89.43 368 245.9 368 319.1C368 417.2 289.2 496 192 496C94.8 496 16 417.2 16 319.1zM112 319.1C112 311.2 104.8 303.1 96 303.1C87.16 303.1 80 311.2 80 319.1C80 381.9 130.1 432 192 432C200.8 432 208 424.8 208 416C208 407.2 200.8 400 192 400C147.8 400 112 364.2 112 319.1z" />
            </svg>
         </button>
      </div>
   );
};