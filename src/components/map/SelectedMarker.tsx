import moment from "moment";
import React from "react";
import { X } from "react-feather";
import { SecondaryButton } from "../buttons";
import useMapStore from "./mapStore";

function SelectedMarker() {
  const { selectedPerson, selectedMarker, setSelectedPerson } = useMapStore();

  const handleCloseButton = () => {
    selectedMarker?.remove();
    setSelectedPerson(undefined);
  };

  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 z-20 flex h-[40vh] w-full items-end p-2
      pr-12 lg:w-96
${selectedPerson ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="pointer-events-auto relative h-auto w-full rounded-lg bg-white p-4">
        <div className="absolute right-1 top-1 h-10 w-10">
          <SecondaryButton isSmall onClick={handleCloseButton}>
            <X className="text-dark-blue" />
          </SecondaryButton>
        </div>
        <div className="h-full w-full flex-1 space-y-5  text-dark-blue">
          <h1 className="font-sans text-base font-bold">Information:</h1>
          <div className="grid grid-cols-5 gap-2">
            <label className="col-span-1 font-sans text-sm text-gray-700">
              name:{" "}
            </label>
            <span className="col-span-4 font-sans text-sm capitalize text-dark-blue">
              {selectedPerson?.lastName +
                ", " +
                selectedPerson?.firstName +
                " " +
                selectedPerson?.middleName}
            </span>
            <label className="col-span-1 font-sans text-sm text-gray-700">
              died:{" "}
            </label>
            <span className="col-span-4 font-sans text-sm capitalize text-dark-blue">
              {moment(selectedPerson?.diedDate).format("MMMM DD, YYYY")}
            </span>
            <label className="col-span-1 font-sans text-sm text-gray-700">
              area:{" "}
            </label>
            <span className="col-span-4 font-sans text-sm capitalize text-dark-blue">
              {selectedPerson?.markerType.replace("_", " ")} type
            </span>
            {selectedPerson?.markerType === "Apartment" ? (
              <>
                <label className="col-span-1 font-sans text-sm text-gray-700">
                  row:{" "}
                </label>
                <span className="col-span-4 font-sans text-sm capitalize text-dark-blue">
                  {selectedPerson?.apartmentRow}
                </span>
                <label className="col-span-1 font-sans text-sm text-gray-700">
                  column:{" "}
                </label>
                <span className="col-span-4 font-sans text-sm capitalize text-dark-blue">
                  {selectedPerson?.apartmentColumn}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMarker;
