import React, { FC } from "react";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

const PrimaryInput: FC<InputProps> = (props) => {
  return (
    <input
      className="h-12 w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400
      hover:border-light-blue focus:border-light-blue"
      placeholder={props.placeholder ?? "Input field"}
      {...props}
    />
  );
};

export default PrimaryInput;
