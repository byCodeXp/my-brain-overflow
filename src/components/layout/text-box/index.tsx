import { FC, memo, useRef } from "react";

interface Props {
   onSubmit: (value: string) => void;
}

export const TextBox: FC<Props> = memo(({ onSubmit }) => {

   const ref = useRef<HTMLInputElement>(null);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

      event.preventDefault();

      if (!ref.current?.value) {
         return;
      }

      onSubmit(ref.current.value);

      ref.current.value = "";
   };

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
}, () => true);