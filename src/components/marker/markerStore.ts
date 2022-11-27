import { Marker } from "@prisma/client";
import create from "zustand";

interface MarkerState {
  view: "marker" | "list";
  setView: (view: "marker" | "list") => void;
  markerView: Marker | undefined;
  setMarker: (marker: Marker | undefined) => void;
}

const useMarkerStore = create<MarkerState>((set) => ({
  view: "list",
  setView: (view) => set({ view: view }),
  markerView: undefined,
  setMarker: (marker) => set({ markerView: marker }),
}));

export default useMarkerStore;
