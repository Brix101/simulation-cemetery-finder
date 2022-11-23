import mapboxgl from "mapbox-gl";
import create from "zustand";

export interface Person {
  name: string;
  lat: number;
  lng: number;
}

interface Option {
  value: Person;
  label: string;
}

interface MapState {
  center: mapboxgl.LngLatLike;
  setCenter: (LngLat: mapboxgl.LngLatLike) => void;
  selectedPerson: Person | undefined;
  setSelectedPerson: (person: Person) => void;
  selectedMarker: mapboxgl.Marker | undefined;
  setSelectedMarker: (marker: mapboxgl.Marker) => void;
  options: Option[];
}

const useStore = create<MapState>((set) => ({
  center: [125.01129701742406, 7.747423241099526],
  setCenter: (LngLat) =>
    set(() => ({
      center: LngLat,
    })),
  selectedPerson: undefined,
  setSelectedPerson: (person) =>
    set(() => ({
      selectedPerson: person,
    })),
  selectedMarker: undefined,
  setSelectedMarker: (marker) =>
    set(() => ({
      selectedMarker: marker,
    })),
  options: [
    {
      value: {
        name: "Alyssa Deepa",
        lat: 7.747181756921194,
        lng: 125.01175104277269,
      },
      label: "Alyssa Deepa",
    },
    {
      value: {
        name: "Harsha Isidora",
        lat: 7.747459619962598,
        lng: 125.01072993807372,
      },
      label: "Harsha Isidora",
    },
    {
      value: {
        name: "Ciar Disha",
        lat: 7.747675137064817,
        lng: 125.01068573713428,
      },
      label: "Ciar Disha",
    },
    {
      value: {
        name: "Tavish Thandiwe",
        lat: 7.747921978282534,
        lng: 125.01063690389338,
      },
      label: "Tavish Thandiwe",
    },
    {
      value: {
        name: "Annikki Asia",
        lat: 7.747995077389504,
        lng: 125.01081585257361,
      },
      label: "Annikki Asia",
    },
    {
      value: {
        name: "Vinay Anisha",
        lat: 7.748020843635928,
        lng: 125.01113603948096,
      },
      label: "Vinay Anisha",
    },
    {
      value: {
        name: "Vesper Tegwen",
        lat: 7.748010353303954,
        lng: 125.01134215578963,
      },
      label: "Vesper Tegwen",
    },
    {
      value: {
        name: "Jagoda Latife",
        lat: 7.7480428818391545,
        lng: 125.01170377989399,
      },
      label: "Jagoda Latife",
    },
    {
      value: {
        name: "Anisha Elil",
        lat: 7.748055778943453,
        lng: 125.01206741563317,
      },
      label: "Anisha Elil",
    },
    {
      value: {
        name: "Lisandro Platon",
        lat: 7.747605282579826,
        lng: 125.01222344550717,
      },
      label: "Lisandro Platon",
    },
    {
      value: {
        name: "Jehoram Nabopolassar",
        lat: 7.74757498077436,
        lng: 125.01159020478667,
      },
      label: "Jehoram Nabopolassar",
    },
    {
      value: {
        name: "Sarah Moab",
        lat: 7.747659051332704,
        lng: 125.0112139697307,
      },
      label: "Sarah Moab",
    },
  ],
}));

export default useStore;
