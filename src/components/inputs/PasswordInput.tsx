import React, { FC, useState } from "react";
import { Eye, EyeOff } from "react-feather";
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

const PasswordInput: FC<Props> = (props) => {
  const { isSmall, register, ...rest } = props;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative flex h-fit w-full items-center overflow-hidden">
      <input
        type={open ? "text" : "password"}
        className={`pr-30 w-full rounded-lg border-2 border-light-blue bg-white pl-4 pr-10 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400
        hover:border-light-blue focus:border-light-blue 
        ${isSmall ? "h-10" : "h-12 "}`}
        placeholder={props.placeholder ?? "Password field"}
        {...rest}
        {...register}
      />
      <button
        type="button"
        className="absolute right-2 z-10 h-fit  text-gray-500 hover:text-light-blue"
        onClick={() => setOpen(!open)}
      >
        {open ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

export default PasswordInput;
