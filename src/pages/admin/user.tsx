import AdminNavBar from "@/components/navigation/AdminNavBar";
import { NextPage } from "next";
import React from "react";

const user: NextPage = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <AdminNavBar />
      <div className="flex-1 bg-red-300"></div>
    </div>
  );
};

export default user;
