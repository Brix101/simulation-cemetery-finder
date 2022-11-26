import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const LoginForm = dynamic(() => import("@/components/forms/LoginForm"), {
  ssr: false,
});

const login: NextPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-50">
      <LoginForm />
    </main>
  );
};

export default login;
