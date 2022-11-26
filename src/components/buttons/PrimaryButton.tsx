import React, { FC } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

type Props = ButtonProps & {
  isLoading?: boolean;
  isSmall?: boolean;
};

const PrimaryButton: FC<Props> = (props) => {
  const { isLoading, isSmall, ...rest } = props;
  return (
    <button
      className={`flex w-full items-center justify-center rounded-lg  border-2 border-transparent
      px-2  hover:bg-dark-blue disabled:cursor-default disabled:bg-gray-600
      ${
        isLoading
          ? "cursor-default bg-dark-blue"
          : "bg-medium-blue active:border-light-blue"
      }
      ${isSmall ? "h-10" : "h-12"}
      `}
      {...rest}
    >
      {isLoading ? (
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-b-4 border-white/[.50] border-b-white" />
      ) : (
        <span
          className={`font-sans  font-bold capitalize text-white
        ${isSmall ? "text-sm" : "text-base"}`}
        >
          {rest.children ?? "Primary Button"}
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
