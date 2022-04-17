import { FC, ReactNode } from "react";

interface Props {
   condition: boolean;
   children?: ReactNode;
}

export const RenderIf: FC<Props> = ({ children, condition }) => {
   if (!condition) {
      return <></>;
   }
   return <>{children}</>;
}