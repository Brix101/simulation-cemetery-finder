import { Marker } from "@prisma/client";
import create from "zustand";

interface MarkerState {
  view: "marker" | "list";
  setView: (view: "marker" | "list") => void;
  markerView: Marker | undefined;
  setMarkerView: (marker: Marker | undefined) => void;
  markerToDelete: Marker | undefined;
  setMarkerToDelete: (marker: Marker | undefined) => void;
}

const useMarkerStore = create<MarkerState>((set) => ({
  view: "list",
  setView: (view) => set({ view: view }),
  markerView: undefined,
  setMarkerView: (marker) => set({ markerView: marker }),
  markerToDelete: undefined,
  setMarkerToDelete: (marker) => set({ markerToDelete: marker }),
}));

export default useMarkerStore;
