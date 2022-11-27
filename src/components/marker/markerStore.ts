import create from "zustand";

interface MarkerState {
  view: "add" | "view";
  setView: (view: "add" | "view") => void;
}

const useMarkerStore = create<MarkerState>((set) => ({
  view: "view",
  setView: (view) => set({ view: view }),
}));

export default useMarkerStore;
