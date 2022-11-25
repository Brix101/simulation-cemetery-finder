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
const DistructiveButton: FC<Props> = (props) => {
  const { isSmall, ...rest } = props;
  return (
    <button
      className={`flex h-12 w-full items-center justify-center rounded-lg  border-2 border-transparent bg-ruby-red hover:bg-ruby-red-2 active:border-red-400 disabled:cursor-default disabled:bg-gray-600
      ${isSmall ? "h-10" : "h-12"}`}
      {...rest}
    >
      <span className="font-sans text-base font-bold capitalize text-white">
        {rest.children ?? "Destructive Button"}
      </span>
    </button>
  );
};

export default DistructiveButton;
