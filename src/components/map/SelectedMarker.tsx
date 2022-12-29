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
          <div className="flex-1 space-y-2 pb-5">
            <div className="flex w-full items-center justify-start gap-2">
              <label className="font-sans text-sm text-gray-700">name: </label>
              <span className="font-sans text-sm capitalize text-dark-blue">
                {selectedPerson?.lastName +
                  ", " +
                  selectedPerson?.firstName +
                  " " +
                  selectedPerson?.middleName}
              </span>
            </div>
            <div className="flex w-full items-center justify-start gap-2">
              <label className="font-sans text-sm text-gray-700">died: </label>
              <span className="font-sans text-sm capitalize text-dark-blue">
                {moment(selectedPerson?.diedDate).format("MMMM DD, YYYY")}
              </span>
            </div>
            <div className="flex w-full items-center justify-start gap-2">
              <label className="font-sans text-sm text-gray-700">type: </label>
              <span className="font-sans text-sm capitalize text-dark-blue">
                {selectedPerson?.markerType.replace("_", " ")} type
              </span>
            </div>
            {selectedPerson?.markerType === "Apartment" ? (
              <>
                <div className="flex w-full items-center justify-start gap-2">
                  <label className="font-sans text-sm text-gray-700">
                    row:{" "}
                  </label>
                  <span className="font-sans text-sm capitalize text-dark-blue">
                    {selectedPerson?.apartmentRow}
                  </span>
                </div>
                <div className="flex w-full items-center justify-start gap-2">
                  <label className="font-sans text-sm text-gray-700">
                    column:{" "}
                  </label>
                  <span className="font-sans text-sm capitalize text-dark-blue">
                    {selectedPerson?.apartmentColumn}
                  </span>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMarker;
