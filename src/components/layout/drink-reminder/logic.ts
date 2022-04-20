import { useState, useEffect } from "react";
import { StorageUtility } from "../../../utilities/storage";

const storage = new StorageUtility<number>("WATER_TIME");

const ONE_MINUTE = 60_000;
const ONE_HOUR = 3_600_000;

export const useLogic = () => {
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

   return { remind, click };
};