import { SearchMarkerInput } from "@/schema/marker.schema";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import React, { ChangeEvent, Suspense, useState } from "react";
import { Plus } from "react-feather";
import { useDebounce } from "usehooks-ts";
import { PrimaryButton } from "../buttons";
import { PrimaryInput } from "../inputs";
import LinearLoading from "../LinearLoading";
import useMarkerStore from "./markerStore";

function ViewMarkersList() {
  const { setView, setMarkerView } = useMarkerStore();
  const [search, setSearch] = useState<SearchMarkerInput>({ searchInput: "" });
  const debouncedValue = useDebounce<SearchMarkerInput>(search, 500);

  const { data, isLoading, isFetching } = trpc.marker.getAll.useQuery(
    { ...debouncedValue },
    { enabled: true }
  );

  const TableStyle = (x: number) => {
    if (x % 2) {
      return "bg-light-blue/[.05] border-b dark:bg-gray-800 dark:border-gray-700";
    }
    return "bg-white border-b dark:bg-gray-900 dark:border-gray-700`";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch({ searchInput: event.target.value });
  };

  return (
    <>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start gap-5 overflow-y-scroll  py-5">
        <div className="flex h-fit w-full justify-center">
          <div className="flex h-auto w-full max-w-6xl items-center justify-between">
            <div className="w-96">
              <PrimaryInput
                isSmall
                placeholder="Search a name"
                value={search?.searchInput ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="w-28">
              <PrimaryButton isSmall onClick={() => setView("marker")}>
                <span className="flex items-center gap-2">
                  <Plus className="text-white" /> Add
                </span>
              </PrimaryButton>
            </div>
          </div>
          <div className="max-w-6xl">
            <LinearLoading isLoading={isLoading || isFetching} />
          </div>
        </div>
        <table className="w-full max-w-6xl text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-light-blue/[.10] text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Deceased Name
              </th>
              <th scope="col" className="py-3 px-6">
                Born
              </th>
              <th scope="col" className="py-3 px-6">
                Died
              </th>
              <th scope="col" className="py-3 px-6">
                Area Type
              </th>
              <th scope="col" className="whitespace-nowrap py-3 px-6">
                Family Contact
              </th>
              <th scope="col" className="py-3 px-6">
                Family Address
              </th>
            </tr>
          </thead>
          <Suspense>
            <tbody>
              {data?.map((marker, i) => {
                return (
                  <tr key={i} className={`${TableStyle(i)}`}>
                    <th
                      scope="row"
                      className="cursor-pointer select-none whitespace-nowrap py-4 px-6 font-medium capitalize text-dark-blue-2 hover:text-dark-blue hover:underline "
                      onClick={() => {
                        setMarkerView(marker);
                        setView("marker");
                      }}
                    >
                      {marker?.lastName +
                        ", " +
                        marker?.firstName +
                        " " +
                        marker?.middleName}
                    </th>

                    <td className="whitespace-nowrap py-4 px-6">
                      {moment(marker.bornDate).format("MMMM DD, YYYY")}
                    </td>
                    <td className="whitespace-nowrap py-4 px-6">
                      {moment(marker.diedDate).format("MMMM DD, YYYY")}
                    </td>
                    <td className="py-4 px-6">{marker.markerType}</td>
                    <td className="py-4 px-6">{marker.familyNumber}</td>
                    <td className="py-4 px-6">{marker.familyAddress}</td>
                  </tr>
                );
              })}
            </tbody>
          </Suspense>
        </table>
      </div>
    </>
  );
}

export default ViewMarkersList;
