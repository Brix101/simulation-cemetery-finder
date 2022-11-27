import { trpc } from "@/utils/trpc";
import React, { useRef } from "react";
import { Trash2 } from "react-feather";
import { useOnClickOutside } from "usehooks-ts";
import { SecondaryButton } from "../buttons";
import DestructiveButton from "../buttons/DestructiveButton";
import useMapStore from "../map/mapStore";
import useMarkerStore from "../marker/markerStore";

function MarkerDeleteDialog() {
  const ref = useRef(null);
  const { tempMarker, setTempMarker } = useMapStore();
  const { markerToDelete, setMarkerToDelete, setView, setMarkerView } =
    useMarkerStore();

  const { mutate, isLoading } = trpc.marker.deleteMarker.useMutation({
    onSuccess: () => {
      tempMarker?.remove();
      setView("list");
      setTempMarker(undefined);
      setMarkerView(undefined);
      setMarkerToDelete(undefined);
    },
  });

  const handleClickOutside = () => {
    setMarkerToDelete(undefined);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleDeleteClick = () => {
    if (markerToDelete) {
      mutate({ id: markerToDelete?.id });
    }
  };

  if (!markerToDelete) {
    return <></>;
  }

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black/[.20] shadow-lg drop-shadow-lg`}
    >
      <div
        ref={ref}
        className="mx-5 flex gap-2 transition delay-150 ease-in-out"
      >
        <div className="relative flex h-fit w-full flex-col justify-between gap-10 overflow-hidden rounded-lg bg-white p-5 md:w-96">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-600">
              <Trash2 />
              <span>Delete this marker?</span>
            </div>
            <p className="text-sm text-gray-800">
              This action can’t be undone.
            </p>
          </div>
          <div className="flex w-full justify-end gap-2 pl-10">
            <div className="flex-1">
              <SecondaryButton isSmall onClick={handleClickOutside}>
                Cancel
              </SecondaryButton>
            </div>
            <div className="flex-1">
              <DestructiveButton
                isSmall
                onClick={handleDeleteClick}
                isLoading={isLoading}
              >
                Delete
              </DestructiveButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkerDeleteDialog;
