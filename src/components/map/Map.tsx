import { env } from "@/env/client.mjs";
import { trpc } from "@/utils/trpc";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useMarkerStore from "../marker/markerStore";
import useMapStore, {
  GeolocateCoordinates,
  GeolocateCoordinatesOff,
} from "./mapStore";

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = () => {
  const router = useRouter();

  const { data } = trpc.marker.getAll.useQuery({ searchInput: "" });
  const [coordsData, setCoordsData] = useState<[]>([]);
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
        newMap.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [],
              },
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "red",
            "line-width": 4,
          },
        });

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
          showAccuracyCircle: true,
          trackUserLocation: true,
          showUserHeading: true,
        });
        newMap.addControl(geolocate, "bottom-right");

        geolocate.on("geolocate", (e) => {
          const { coords } = e as GeolocateCoordinates;
          fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${coords.longitude},${coords.latitude};125.01037505404747,7.748057487589676?steps=true&geometries=geojson&access_token=${env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            { method: "GET" }
          )
            .then((res) => res.json())
            .then((json) => {
              const data = json.routes[0];
              setCoordsData(data.geometry.coordinates);
            });
        });

        geolocate.on("trackuserlocationend", (e) => {
          const route = newMap?.getSource("route") as mapboxgl.GeoJSONSource;
          const { target } = e as GeolocateCoordinatesOff;
          const isOff = target._watchState === "OFF";

          if (isOff) {
            route.setData({
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [],
              },
            });
          }
        });
      });
    }
  }, [ref, center, setMap]);

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
  // for libe
  useEffect(() => {
    const route = map?.getSource("route") as mapboxgl.GeoJSONSource;
    if (route) {
      route.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordsData,
        },
      });
    }
  }, [coordsData, map]);

  useEffect(() => {
    if (selectedPerson && map) {
      const { lat, lng } = selectedPerson;
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      setSelectedMarker(marker);
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
