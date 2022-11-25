import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { NextPage } from "next";
import React from "react";

const login: NextPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-blue-50">
      <div className="w-96 space-y-5">
        <PrimaryButton isLoading />
        <SecondaryButton>Secondary Button</SecondaryButton>
      </div>
    </main>
  );
};

export default login;
