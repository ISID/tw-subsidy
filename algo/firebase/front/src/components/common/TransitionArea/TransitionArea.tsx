import { ReactNode } from "react";

export type TransitionAreaParams = {
    children: ReactNode;
};

const TransitionArea = ({ children }: TransitionAreaParams) => {
    return (
        <div className={"mx-auto mt-19 flex w-full"}>
            {children}
        </div>
    )
};

export default TransitionArea;