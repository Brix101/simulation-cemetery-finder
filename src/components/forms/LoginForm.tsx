import { PrimaryButton, SecondaryButton } from "@/componentsbuttons";
import { PasswordInput, PrimaryInput } from "@/componentsinputs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { X } from "react-feather";
import { useOnClickOutside } from "usehooks-ts";
import useUserStore from "./userStore";

function LoginForm() {
  const router = useRouter();
  const ref = useRef(null);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const { isLogin, setIsLogin } = useUserStore();

  const handleCloseButton = () => {
    setError(undefined);
    setIsLogin(false);
    setLoading(false);
  };

  useOnClickOutside(ref, handleCloseButton);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.ok) {
      router.push("/admin");
      handleCloseButton();
      setError(undefined);
    }
    if (!result?.ok) {
      setError(result?.error);
    }
    if (result) {
      setLoading(false);
    }
    console.log(result);
  };

  if (!isLogin) {
    return <></>;
  }
  return (
    <div className="absolute top-0 left-0 z-30 flex h-full w-full select-none items-center justify-center bg-black/[.20] shadow-lg drop-shadow-lg">
      <div
        ref={ref}
        className="mx-5 flex gap-2 transition delay-150 ease-in-out"
      >
        <div className="relative flex h-fit w-full flex-col justify-between gap-10 overflow-hidden rounded-lg bg-white p-5 md:w-96">
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
          <div className="space-y-5">
            <PrimaryInput
              name="email"
              type={"email"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton
              type="button"
              isLoading={loading}
              onClick={handleSubmit}
            >
              Login
            </PrimaryButton>
            {error ? (
              <div
                className="rounded-lg bg-red-100 px-4 py-3 text-red-900"
                role="alert"
              >
                <div className="flex items-center">
                  <svg
                    className="mr-4 h-6 w-6 fill-current text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                  <p className="text-sm">{error ?? ""}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
