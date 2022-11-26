import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/componentsmap/Map"), {
  ssr: false,
});
const MapSearchForm = dynamic(() => import("@/componentsforms/MapSearchForm"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <MapSearchForm />
      <Map />
    </main>
  );
};

export default Home;
