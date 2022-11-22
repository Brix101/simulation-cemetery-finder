import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    // <>
    //   <div className="relative h-screen w-full overflow-hidden">
    //     <div className="bg-red absolute z-max h-12 w-80"></div>
    //   </div>
    // </>

    <Map />
  );
};

export default Home;
