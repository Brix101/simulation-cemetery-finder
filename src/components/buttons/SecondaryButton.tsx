import React, { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

type Props = ButtonProps & {
  isSmall?: boolean;
};
const SecondaryButton: FC<Props> = (props) => {
  const { isSmall, ...rest } = props;
  return (
    <button
      className={`flex w-full items-center justify-center rounded-lg  border border-gray-400
      bg-white px-2 hover:border-light-blue active:border-2 active:border-light-blue-2 disabled:cursor-default disabled:bg-gray-600 
      ${isSmall ? "h-10" : "h-12"}`}
      {...rest}
    >
      <span
        className={`font-sans  font-bold capitalize text-dark-blue
        ${isSmall ? "text-sm" : "text-base"}`}
      >
        {rest.children ?? "Secondary Button"}
      </span>
    </button>
  );
};

export default SecondaryButton;
