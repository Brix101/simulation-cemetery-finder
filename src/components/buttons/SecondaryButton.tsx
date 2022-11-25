import React, { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const SecondaryButton: FC<ButtonProps> = (props) => {
  return (
    <button
      className="flex h-12 w-full items-center justify-center rounded-lg  border
      border-green-500 bg-white hover:border-green-700 active:border-2 disabled:cursor-default disabled:bg-gray-600"
      {...props}
    >
      <span className="font-sans text-base font-bold text-gray-900">
        {props.children ?? "Secondary Button"}
      </span>
    </button>
  );
};

export default SecondaryButton;
