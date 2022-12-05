import { PrimaryButton, SecondaryButton } from "@/componentsbuttons";
import useMapStore from "@/componentsmap/mapStore";
import { Marker } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Search } from "react-feather";
import Select from "react-select";
import useUserStore from "../user/userStore";

function MapSearchForm() {
  const router = useRouter();
  const { status } = useSession();
  const {
    options,
    setSelectedPerson,
    selectedPerson,
    selectedMarker,
    map,
    center,
  } = useMapStore();

  const { setIsLogin } = useUserStore();

  const handleSignInClick = () => {
    if (status === "authenticated") {
      router.push("/admin");
    } else {
      setIsLogin(true);
    }
  };

  return (
    <div className="absolute top-2 left-2 z-10 flex h-auto w-full items-center gap-2 pr-4">
      <div className="relative h-10 flex-1 drop-shadow-lg md:w-96 md:flex-none lg:w-96">
        <Select
          classNamePrefix={"react-select__menu"}
          className="capitalize"
          options={options}
          placeholder="Search a name..."
          isSearchable
          isClearable
          onChange={(e) => {
            if (e?.value !== selectedPerson) {
              selectedMarker?.remove();
              setSelectedPerson(e?.value as Marker);
            }
          }}
        />
        <div className="pointer-events-none absolute top-2 right-2 w-6 bg-white">
          <Search />
        </div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white drop-shadow-lg">
        <SecondaryButton isSmall onClick={() => map?.flyTo(center)}>
          <Image src={"/tombstone.png"} height={24} width={24} alt="pointer" />
        </SecondaryButton>
      </div>
      <div className="w-16">
        <PrimaryButton isSmall onClick={handleSignInClick}>
          Login
        </PrimaryButton>
      </div>
    </div>
  );
}

export default MapSearchForm;
