import { env } from "@/env/client.mjs";
import { trpc } from "@/utils/trpc";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useMarkerStore from "../marker/markerStore";
import useMapStore, { GeolocateCoordinates } from "./mapStore";

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const router = useRouter();

  const { data } = trpc.marker.getAll.useQuery({ searchInput: "" });

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
    setOptions,
    currentCoords,
    setCurrentCoords,
  } = useMapStore();

  const { view, markerView } = useMarkerStore();

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
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        });
        newMap.addControl(geolocate, "bottom-right");

        geolocate.on("geolocate", (e) => {
          const { coords } = e as GeolocateCoordinates;
          setCurrentCoords(coords);
        });
        geolocate.on("trackuserlocationend", () => {
          setCurrentCoords(undefined);
          newMap.removeLayer("route");
          newMap.removeSource("route");
        });
      });
      // map.addControl(
      //   new MapboxDirections({
      //   accessToken: mapboxgl.accessToken
      //   }),
      //   'top-left'
      //   )
    }
  }, [ref, center, setMap, setCurrentCoords]);

  useEffect(() => {
    if (data) {
      setOptions(
        data.map((markerData) => {
          return {
            value: markerData,
            label:
              markerData.lastName +
              ", " +
              markerData.firstName +
              " " +
              markerData.middleName,
          };
        })
      );
    }
  }, [data, setOptions]);

  useEffect(() => {
    const routeId = map?.getSource("route");
    console.log({ routeId });
    if (currentCoords && map && !routeId) {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [currentCoords.longitude, currentCoords.latitude],
              [125.01129701742406, 7.747423241099526],
            ],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 4,
        },
      });
    }
  }, [currentCoords, map]);

  useEffect(() => {
    if (selectedPerson && map) {
      const { lat, lng } = selectedPerson;
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      setSelectedMarker(marker);
      // new mapboxgl.Popup({
      //   closeOnClick: false,
      // })
      //   .setLngLat([lng, lat])
      //   .setHTML("<h1>" + firstName + "</h1>")
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
    if (map && tempMarker) {
      tempMarker.addTo(map);
      tempMarker.on("dragend", () => {
        setTempMarker(tempMarker);
      });
    }
  }, [map, tempMarker, setTempMarker]);

  if (map) {
    map.on("click", (e) => {
      if (
        router.pathname.includes("admin") &&
        view === "marker" &&
        !markerView
      ) {
        tempMarker?.remove();
        const newTempMarker = new mapboxgl.Marker({
          draggable: true,
        }).setLngLat([e.lngLat.lng, e.lngLat.lat]);
        setTempMarker(newTempMarker);
      }
    });
  }

  return <div className="h-full w-full overflow-hidden" ref={ref} />;
};

export default Map;
