import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import useStore from "./mapStore";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpeDEwMSIsImEiOiJjbDlvOHRnMGUwZmlrM3VsN21hcTU3M2IyIn0.OR9unKhFFMKUmDz7Vsz4TQ";

const Map = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    map,
    setMap,
    center,
    selectedPerson,
    selectedMarker,
    setSelectedMarker,
    tempMarker,
    setTempMarker,
  } = useStore();

  useEffect(() => {
    if (ref?.current && typeof ref?.current !== undefined) {
      const newMap = new mapboxgl.Map({
        container: ref?.current || "",
        ...center,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
      });
      setMap(newMap);

      newMap.on("load", () => {
        newMap.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
        newMap.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
        newMap.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 0.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });
        newMap.setFog({
          range: [2, 12],
          color: "white",
          "horizon-blend": 0.1,
        });

        // Add zoom and rotation controls to the map.
        newMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        newMap.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          "bottom-right"
        );
      });
      // map.addControl(
      //   new MapboxDirections({
      //   accessToken: mapboxgl.accessToken
      //   }),
      //   'top-left'
      //   )
    }
  }, [ref, center, setMap]);

  useEffect(() => {
    if (selectedPerson && map) {
      const { lat, lng } = selectedPerson;
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      setSelectedMarker(marker);
      // new mapboxgl.Popup({ closeOnClick: false })
      //   .setLngLat([lng, lat])
      //   .setHTML("<h1>Hello World!</h1>")
      //   .addTo(map);
    }
  }, [map, selectedPerson, setSelectedMarker]);

  useEffect(() => {
    if (selectedMarker) {
      map?.flyTo({ ...center, center: selectedMarker?.getLngLat() });
    } else {
      map?.flyTo(center);
    }
  }, [selectedMarker, map, center]);

  useEffect(() => {
    if (map && tempMarker === undefined) {
      // map.on("click", (e) => {
      //   const newTempMarker = new mapboxgl.Marker({ draggable: true })
      //     .setLngLat([e.lngLat.lng, e.lngLat.lat])
      //     .addTo(map);
      //   setTempMarker(newTempMarker);
      // });
    }
  }, [map, tempMarker, setTempMarker]);

  if (tempMarker) {
    tempMarker.on("dragend", () => {
      setTempMarker(tempMarker);
    });
  }

  return <div className="h-screen w-full overflow-hidden" ref={ref} />;
};

export default Map;

{
  /* <div
          className={`absolute top-0 left-0 z-20 h-screen w-full max-w-md 
        ${tempMarker ? "translate-x-0" : "-translate-x-full"}
        bg-white`}
        >
          <button
            className="h-20 w-20 bg-white"
            onClick={() => {
              setTempMarker(undefined);
              tempMarker?.remove();
            }}
          >
            close
          </button>
          {tempMarker?.getLngLat().lat}
        </div> */
}
