import AdminNavBar from "@/components/navigation/AdminNavBar";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const ViewMarkersList = dynamic(
  () => import("@/componentsmarker/ViewMarkersList"),
  {
    ssr: false,
  }
);

const admin: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col  bg-gray-50">
      <AdminNavBar />
      <div className="relative flex flex-1 overflow-hidden">
        <ViewMarkersList />
      </div>
    </div>
  );
};

export default admin;
