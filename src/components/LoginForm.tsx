import React, { useState } from "react";
import { PrimaryButton, SecondaryButton } from "./buttons";
import DistructiveButton from "./buttons/DestructiveButton";

function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-96 space-y-5">
      <PrimaryButton
        isLoading={loading}
        onClick={() => {
          setLoading(true);
        }}
      />
      <SecondaryButton />
      <DistructiveButton
        onClick={() => {
          setLoading(false);
        }}
      />
    </div>
  );
}

export default LoginForm;
