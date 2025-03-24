import { ReactNode } from "react";

type Props = { children: ReactNode}

export const Box = ({ children }: Props) => <div className="p-5 w-[450px]">{children}</div>;
