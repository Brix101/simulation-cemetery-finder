import { PrimaryButton, SecondaryButton } from "@/componentsbuttons";
import { PasswordInput, PrimaryInput } from "@/componentsinputs";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { X } from "react-feather";
import { useOnClickOutside } from "usehooks-ts";
import useUserStore from "./userStore";

function LoginForm() {
  const router = useRouter();
  const ref = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { isLogin, setIsLogin } = useUserStore();

  const handleClickOutside = () => {
    handleCloseButton();
    setLoading(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleCloseButton = () => {
    setIsLogin(false);
  };

  const handleSubmit = () => {
    console.log("sumbitted");
  };

  if (!isLogin) {
    return <></>;
  }
  return (
    <div className="absolute top-0 left-0 z-30 flex h-full w-full select-none items-center justify-center bg-black/[.20]">
      <div
        ref={ref}
        className="mx-5 flex gap-2 transition delay-150 ease-in-out"
      >
        <div className="relative flex h-fit w-full flex-col justify-between gap-10 overflow-hidden rounded-lg bg-white p-5 shadow-lg drop-shadow-lg md:w-96">
          <div className="absolute right-1 top-1 h-10 w-10">
            <SecondaryButton isSmall onClick={handleCloseButton}>
              <X className="text-dark-blue" />
            </SecondaryButton>
          </div>
          <div className="flex flex-col justify-center gap-5 text-center  text-dark-blue">
            <span className="font-sans text-2xl font-bold">
              Login to <br />
              Maramag Memorial Park
            </span>
            <p className="font-serif text-xs">
              Only the Administrators of <br /> Maramag Memorial Park can login
              here.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <PrimaryInput placeholder="Email" />
            <PasswordInput placeholder="Password" />
            <PrimaryButton
              type="button"
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                router.push("/admin");
              }}
            >
              Login
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
