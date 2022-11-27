import React from "react";
import MarkerAddForm from "../forms/MarkerAddForm";
import MarkerUpdateForm from "../forms/MarkerUpdateForm";
import Map from "../map/Map";
import useMarkerStore from "./markerStore";

function Marker() {
  const { markerView } = useMarkerStore();
  return (
    <div className="flex h-full w-full">
      <Map />
      <div className="h-full w-full max-w-lg shadow-lg drop-shadow-lg">
        {markerView ? <MarkerUpdateForm /> : <MarkerAddForm />}
      </div>
    </div>
  );
}

export default Marker;
{
  /* <button onClick={() => setView("list")}>click</button> */
}
