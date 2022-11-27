import { UpdateMarkerInput } from "@/schema/marker.schema";
import { trpc } from "@/utils/trpc";
import { MarkerType } from "@prisma/client";
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { PrimaryButton, SecondaryButton } from "../buttons";
import DistructiveButton from "../buttons/DestructiveButton";
import { PrimaryInput } from "../inputs";
import useMapStore from "../map/mapStore";
import useMarkerStore from "../marker/markerStore";
import MarkerDeleteDialog from "./MarkerDeleteDialog";

function MarkerUpdateForm() {
  const { tempMarker, setTempMarker } = useMapStore();
  const { setView, markerView, setMarkerView, setMarkerToDelete } =
    useMarkerStore();
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<UpdateMarkerInput>();

  watch();
  const { mutate, isLoading } = trpc.marker.updateMarker.useMutation({
    onSuccess: () => {
      handleCancelClick();
    },
  });
  const areaType = (Object.keys(MarkerType) as (keyof typeof MarkerType)[]).map(
    (enumKey) => {
      return {
        label: MarkerType[enumKey].toLowerCase().replace("_", " "),
        value: MarkerType[enumKey],
      };
    }
  );

  const handleCancelClick = () => {
    tempMarker?.remove();
    setView("list");
    setTempMarker(undefined);
    setMarkerView(undefined);
  };

  function onSubmit(values: UpdateMarkerInput) {
    mutate({ ...values, ...tempMarker?.getLngLat() });
  }

  useEffect(() => {
    if (markerView) {
      reset({
        apartmentColumn: markerView.apartmentColumn,
        apartmentRow: markerView.apartmentColumn,
        bornDate: markerView.bornDate as Date,
        diedDate: markerView.diedDate as Date,
        familyAddress: markerView.familyAddress,
        familyNumber: markerView.familyNumber,
        firstName: markerView.firstName,
        id: markerView.id,
        lastName: markerView.lastName,
        markerType: markerView.markerType,
        middleName: markerView.middleName,
      });
    }
  }, [markerView, reset, setTempMarker]);

  useEffect(() => {
    if (markerView && !tempMarker) {
      const newTempMarker = new mapboxgl.Marker({
        draggable: true,
      }).setLngLat([markerView.lng, markerView.lat]);
      setTempMarker(newTempMarker);
    }
  }, [markerView, tempMarker]);

  return (
    <div className="h-full w-full bg-white p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between"
      >
        <h1 className="text-2xl font-bold text-dark-blue">Update marker</h1>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                First Name
              </label>
              <PrimaryInput
                isSmall
                placeholder="First Name"
                register={register("firstName")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Middle Name
              </label>
              <PrimaryInput
                isSmall
                placeholder="Middle Name"
                register={register("middleName")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Last Name
              </label>
              <PrimaryInput
                isSmall
                placeholder="Last Name"
                register={register("lastName")}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Family Contact Number
            </label>
            <PrimaryInput
              isSmall
              placeholder="Family Contact Number"
              register={register("familyNumber")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Family Address
            </label>
            <PrimaryInput
              isSmall
              placeholder="Family Address"
              register={register("familyAddress")}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Date Born
              </label>
              <Controller
                control={control}
                name="bornDate"
                render={({ field }) => (
                  <DatePicker
                    className="h-10 w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
              focus:border-light-blue disabled:border-gray-200"
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="MMMM-dd-yyyy"
                    required
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Date Died
              </label>
              <Controller
                control={control}
                name="diedDate"
                render={({ field }) => (
                  <DatePicker
                    className="h-10 w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
              focus:border-light-blue disabled:border-gray-200"
                    placeholderText="Select date"
                    onChange={(date) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="MMMM-dd-yyyy"
                    required
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Area Type
            </label>
            <Controller
              control={control}
              defaultValue={MarkerType["Pantheon" as keyof typeof MarkerType]}
              name="markerType"
              render={({ field: { onChange, value } }) => (
                <Select
                  classNamePrefix="addl-class"
                  options={areaType}
                  value={areaType.find((c) => c.value === value)}
                  onChange={(role) => {
                    onChange(role?.value);
                  }}
                />
              )}
            />
          </div>
          <div className="relative grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Apartment Column
              </label>
              <PrimaryInput
                type={"number"}
                isSmall
                placeholder="Column"
                register={register("apartmentColumn")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Apartment Row
              </label>
              <PrimaryInput
                type={"number"}
                isSmall
                placeholder="Row"
                register={register("apartmentRow")}
              />
            </div>
            {getValues("markerType") !== "Apartment" ? (
              <div className="absolute h-full w-full bg-white/[.80]"></div>
            ) : null}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <DistructiveButton
              type="button"
              isSmall
              onClick={() => setMarkerToDelete(markerView)}
            >
              <Trash2 />
            </DistructiveButton>
          </div>
          <div className="flex items-end justify-end gap-2">
            <div className="w-20">
              <SecondaryButton
                type="button"
                isSmall
                onClick={handleCancelClick}
              >
                Cancel
              </SecondaryButton>
            </div>
            <div className="w-44">
              <PrimaryButton isSmall disabled={!isValid} isLoading={isLoading}>
                Update
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MarkerUpdateForm;
