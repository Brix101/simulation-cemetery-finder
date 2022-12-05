import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";

const AdminNavBar = dynamic(
  () => import("@/componentsnavigation/AdminNavBar"),
  {
    ssr: false,
  }
);

const UserList = dynamic(() => import("@/componentsuser/UserList"), {
  ssr: false,
  suspense: true,
});

const AddUserDialog = dynamic(() => import("@/componentsuser/AddUserDialog"), {
  ssr: false,
});
const UpdateUserDialog = dynamic(
  () => import("@/componentsuser/UpdateUserDialog"),
  {
    ssr: false,
  }
);
const user: NextPage = () => {
  return (
    <div className="flex h-screen w-full flex-col  bg-gray-50">
      <div className="relative z-50">
        <AdminNavBar />
      </div>
      <div className="relative h-full w-full">
        <UserList />
      </div>
      <AddUserDialog />
      <UpdateUserDialog />
    </div>
  );
};

export default user;
