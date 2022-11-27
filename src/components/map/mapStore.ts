import { trpc } from "@/utils/trpc";
import { Marker } from "@prisma/client";
import mapboxgl from "mapbox-gl";
import create from "zustand";

interface Option {
  value: Marker;
  label: string;
}

interface Center {
  center: mapboxgl.LngLatLike;
  zoom: number;
  pitch: number;
  bearing: number;
}

interface MapState {
  map: mapboxgl.Map | null;
  setMap: (ma: mapboxgl.Map | null) => void;
  center: Center;
  selectedPerson: Marker | undefined;
  setSelectedPerson: (personMarker: Marker) => void;
  selectedMarker: mapboxgl.Marker | undefined;
  setSelectedMarker: (marker: mapboxgl.Marker) => void;
  tempMarker: mapboxgl.Marker | undefined;
  setTempMarker: (marker: mapboxgl.Marker | undefined) => void;
  options: Option[];
  setOptions: (options: Option[]) => void;
}

const useMapStore = create<MapState>((set) => ({
  map: null,
  setMap: (map: mapboxgl.Map | null) => set({ map: map }),
  center: {
    center: [125.01129701742406, 7.747423241099526],
    zoom: 17.15,
    pitch: 50.13,
    bearing: 112.02,
  },
  selectedPerson: undefined,
  setSelectedPerson: (personMarker) => set({ selectedPerson: personMarker }),
  selectedMarker: undefined,
  setSelectedMarker: (marker) => set({ selectedMarker: marker }),
  tempMarker: undefined,
  setTempMarker: (marker) => set({ tempMarker: marker }),
  options: [],
  setOptions: (options) => set({ options: options }),
}));

export default useMapStore;
