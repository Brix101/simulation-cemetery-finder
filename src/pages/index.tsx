import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpeDEwMSIsImEiOiJjbDlvOHRnMGUwZmlrM3VsN21hcTU3M2IyIn0.OR9unKhFFMKUmDz7Vsz4TQ";

const Home: NextPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    console.log(ref.current);
    if (ref?.current && typeof ref?.current !== undefined) {
      const map = new mapboxgl.Map({
        container: ref?.current || "",
        center: [125.01129701742406, 7.747423241099526],
        zoom: 17.15,
        pitch: 50.13,
        bearing: 112.02,
        style: "mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y",
      });
      // setMap(map);
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="h-screen w-full overflow-hidden" ref={ref} />
    </div>
  );
};

export default Home;
