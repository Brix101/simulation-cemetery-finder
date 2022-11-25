import React, { FC, useState } from "react";
import { Eye, EyeOff } from "react-feather";

export interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

const PasswordInput: FC<InputProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative flex h-fit w-full items-center overflow-hidden">
      <input
        type={open ? "text" : "password"}
        className="pr-30 h-10 w-full rounded-lg border-2 border-light-blue bg-white pl-4 pr-10 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400
    hover:border-light-blue focus:border-light-blue"
        placeholder={props.placeholder ?? "Password field"}
        {...props}
      />
      <button
        className="absolute right-2 z-10 h-fit bg-white text-gray-500 hover:text-light-blue"
        onClick={() => setOpen(!open)}
      >
        {open ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

export default PasswordInput;
