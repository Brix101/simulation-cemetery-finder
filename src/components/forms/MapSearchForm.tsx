import { SecondaryButton } from "@/componentsbuttons";
import useStore, { Person } from "@/componentsmap/mapStore";
import React from "react";
import { Home, Search } from "react-feather";
import Select from "react-select";

function MapSearchForm() {
  const {
    options,
    setSelectedPerson,
    selectedPerson,
    selectedMarker,
    map,
    center,
  } = useStore();
  return (
    <div className="absolute top-2 left-2 z-10 flex h-auto w-full items-center gap-2 pr-4">
      <div className="relative h-10 w-full drop-shadow-lg md:w-96">
        <Select
          options={options}
          placeholder="Search a name..."
          isSearchable
          isClearable
          onChange={(e) => {
            if (e?.value !== selectedPerson) {
              selectedMarker?.remove();
              setSelectedPerson(e?.value as Person);
            }
          }}
        />
        <div className="pointer-events-none absolute top-2 right-2 w-6 bg-white">
          <Search />
        </div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white drop-shadow-lg">
        <SecondaryButton isSmall onClick={() => map?.flyTo(center)}>
          <Home />
        </SecondaryButton>
      </div>
    </div>
  );
}

export default MapSearchForm;
