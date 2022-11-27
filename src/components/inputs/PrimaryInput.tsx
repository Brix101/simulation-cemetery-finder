import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

type Props = InputProps & {
  isLoading?: boolean;
  isSmall?: boolean;
  register?: UseFormRegisterReturn<string>;
};

const PrimaryInput: FC<Props> = (props) => {
  const { isSmall, register, ...rest } = props;
  return (
    <input
      className={`w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
      focus:border-light-blue disabled:border-gray-200
      ${isSmall ? "h-10" : "h-12 "}`}
      placeholder={props.placeholder ?? "Input field"}
      {...rest}
      {...register}
    />
  );
};

export default PrimaryInput;
