import React, { FC } from "react";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

type Props = InputProps & {
  isLoading?: boolean;
  isSmall?: boolean;
};

const PrimaryInput: FC<Props> = (props) => {
  const { isSmall, ...rest } = props;
  return (
    <input
      className={`w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
      focus:border-light-blue disabled:border-transparent
      ${isSmall ? "h-10" : "h-12 "}`}
      placeholder={props.placeholder ?? "Input field"}
      {...rest}
    />
  );
};

export default PrimaryInput;
