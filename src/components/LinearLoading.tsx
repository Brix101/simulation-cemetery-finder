import React from "react";

function LinearLoading({ isLoading }: { isLoading?: boolean }) {
  return (
    <div
      className={`linear-activity h-1 w-full rounded-full
    ${isLoading && "bg-green-50"}`}
    >
      {isLoading && <div className="indeterminate"></div>}
    </div>
  );
}
export default LinearLoading;
