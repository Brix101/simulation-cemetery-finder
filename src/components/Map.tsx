import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpeDEwMSIsImEiOiJjbDlvOHRnMGUwZmlrM3VsN21hcTU3M2IyIn0.OR9unKhFFMKUmDz7Vsz4TQ";

const Map: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mapData, setMapData] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (ref?.current && typeof ref?.current !== undefined) {
      const map = new mapboxgl.Map({
        container: ref?.current || "",
        center: [125.01129701742406, 7.747423241099526],
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

        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          })
        );

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());
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
  }, [ref]);

  if (mapData) {
    new mapboxgl.Marker()
      .setLngLat([125.01129701742406, 7.747423241099526])
      .addTo(mapData);

    new mapboxgl.Marker()
      .setLngLat([125.0110436472774, 7.747113391397917])
      .addTo(mapData);
  }

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="absolute top-5 left-5 z-max h-12 w-96 drop-shadow-lg">
        <Select placeholder="Search a name..." isSearchable />
      </div>
      <div className="h-screen w-full overflow-hidden" ref={ref} />
    </main>
  );
};

export default Map;
