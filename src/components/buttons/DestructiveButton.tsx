import React, { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const DistructiveButton: FC<ButtonProps> = (props) => {
  return (
    <button
      className="flex h-12 w-full items-center justify-center rounded-lg  border-2 border-transparent bg-red-600 hover:bg-red-800 active:border-red-400 disabled:cursor-default disabled:bg-gray-600
    "
      {...props}
    >
      <span className="font-sans text-base font-bold capitalize text-white">
        {props.children ?? "Secondary Button"}
      </span>
    </button>
  );
};

export default DistructiveButton;
