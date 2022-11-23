import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return <Map />;
};

export default Home;
