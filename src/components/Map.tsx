import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Search } from "react-feather";
import Select, { components, DropdownIndicatorProps } from "react-select";
import useStore, { Person } from "./mapStore";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpeDEwMSIsImEiOiJjbDlvOHRnMGUwZmlrM3VsN21hcTU3M2IyIn0.OR9unKhFFMKUmDz7Vsz4TQ";

const Map: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mapData, setMapData] = useState<mapboxgl.Map | null>(null);

  const {
    center,
    options,
    selectedPerson,
    setSelectedPerson,
    selectedMarker,
    setSelectedMarker,
  } = useStore();

  useEffect(() => {
    if (ref?.current && typeof ref?.current !== undefined) {
      const map = new mapboxgl.Map({
        container: ref?.current || "",
        center: center,
        zoom: 17.15,
        pitch: 50.13,
        bearing: 112.02,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
      });
      setMapData(map);

      map.on("load", () => {
        map.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-type": "atmosphere",
            "sky-atmosphere-sun": [0.0, 0.0],
            "sky-atmosphere-sun-intensity": 15,
          },
        });

        const fogOpts = {
          range: [2, 12],
          color: "white",
          "horizon-blend": 0.1,
        };
        map.setFog(fogOpts);

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          "bottom-right"
        );

        // map.addControl(
        //   new MapboxDirections({
        //   accessToken: mapboxgl.accessToken
        //   }),
        //   'top-left'
        //   )
        // map.on("move", () => {
        //   console.log("long: ", map.getCenter().lng.toFixed(4));
        //   console.log("lat: ", map.getCenter().lat.toFixed(4));
        //   console.log("zoom: ", map.getZoom().toFixed(2));
        //   console.log("ptich: ", map.getPitch().toFixed(2));
        //   console.log("ptich: ", map.getBearing().toFixed(2));
        // });
        map.on("click", (e) => {
          console.log(e);
        });
      });
    }
  }, [ref, center]);

  useEffect(() => {
    if (selectedPerson && mapData) {
      const { lat, lng } = selectedPerson;
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapData);
      setSelectedMarker(marker);
      // new mapboxgl.Popup({ closeOnClick: false })
      //   .setLngLat([lng, lat])
      //   .setHTML("<h1>Hello World!</h1>")
      //   .addTo(mapData);
    }
  }, [mapData, selectedPerson, setSelectedMarker]);

  useEffect(() => {
    if (selectedMarker) {
      mapData?.flyTo({
        center: selectedMarker?.getLngLat(),
      });
    } else {
      mapData?.flyTo({
        center: center,
      });
    }
  }, [selectedMarker, mapData, center]);

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <Search />
      </components.DropdownIndicator>
    );
  };
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <Head>
        {/* <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
          rel="stylesheet"
        /> */}
      </Head>
      <div className="absolute top-5 left-5 z-max h-auto w-full pr-10">
        <div className="h-12 w-full drop-shadow-lg lg:w-96">
          <Select
            options={options}
            components={{ DropdownIndicator }}
            placeholder="Search a name..."
            isSearchable
            isClearable
            onChange={(e) => {
              selectedMarker?.remove();
              setSelectedPerson(e?.value as unknown as Person);
            }}
          />
        </div>
      </div>
      {/* <div className="absolute top-0 left-0 z-50 h-screen w-full max-w-md bg-red-300"></div> */}
      <div className="h-screen w-full overflow-hidden" ref={ref} />
    </main>
  );
};

export default Map;
