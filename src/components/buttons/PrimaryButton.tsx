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
      className={`flex  w-full items-center justify-center rounded-lg  border-2
      border-transparent  hover:bg-dark-blue disabled:cursor-default disabled:bg-gray-600
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
        <div className="h-8 w-8 animate-spin rounded-full border border-b-2  border-gray-300 border-b-white border-l-white"></div>
      ) : (
        <span className="font-sans text-base font-bold capitalize text-white">
          {rest.children ?? "Primary Button"}
        </span>
      )}
    </button>
  );
};

export default PrimaryButton;
