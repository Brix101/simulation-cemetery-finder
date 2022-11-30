import AdminNavBar from "@/components/navigation/AdminNavBar";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const UserList = dynamic(() => import("@/componentsuser/UserList"), {
  ssr: false,
  suspense: true,
});

const AddUserDialog = dynamic(() => import("@/componentsuser/AddUserDialog"), {
  ssr: false,
});

const user: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col  bg-gray-50">
      <AdminNavBar />
      <div className="relative h-full w-full">
        <UserList />
      </div>
      <AddUserDialog />
    </div>
  );
};

export default user;
