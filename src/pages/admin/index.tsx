import MarkerDeleteDialog from "@/components/forms/MarkerDeleteDialog";
import useMarkerStore from "@/components/marker/markerStore";
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

const Marker = dynamic(() => import("@/componentsmarker/Marker"), {
  ssr: false,
});

const Admin: NextPage = () => {
  const { view } = useMarkerStore();
  return (
    <div className="flex h-screen w-full flex-col  bg-gray-50">
      <div className="relative z-50">
        <AdminNavBar />
      </div>
      <div className="relative flex flex-1 overflow-hidden">
        {view === "list" ? <ViewMarkersList /> : null}
        {view === "marker" ? <Marker /> : null}
      </div>

      <MarkerDeleteDialog />
    </div>
  );
};

export default Admin;
