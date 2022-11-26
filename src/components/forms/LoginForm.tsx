import {
  DestructiveButton,
  PrimaryButton,
  SecondaryButton,
} from "@/componentsbuttons";
import { PasswordInput, PrimaryInput } from "@/componentsinputs";
import React, { useState } from "react";

function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-96 space-y-5">
      <PrimaryInput />
      <PasswordInput />
      <PrimaryButton
        isLoading={loading}
        onClick={() => {
          setLoading(true);
        }}
      />
      <SecondaryButton />
      <DestructiveButton
        onClick={() => {
          setLoading(false);
        }}
      />
    </div>
  );
}

export default LoginForm;
