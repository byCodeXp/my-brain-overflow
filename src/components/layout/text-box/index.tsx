import { FC } from "react";
import { useLogic } from "./logic";

export const TextBox: FC = () => {

   const { ref, handleSubmit } = useLogic();

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