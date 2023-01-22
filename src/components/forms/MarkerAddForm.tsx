import { AddMarkerInput } from "@/schema/marker.schema";
import { trpc } from "@/utils/trpc";
import { MarkerType } from "@prisma/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { PrimaryInput } from "../inputs";
import useMapStore from "../map/mapStore";
import useMarkerStore from "../marker/markerStore";

function MarkerAddForm() {
  const { tempMarker, setTempMarker } = useMapStore();
  const { setView } = useMarkerStore();
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<AddMarkerInput>({ mode: "onChange" });

  watch();

  const { mutate, isLoading } = trpc.marker.addMarker.useMutation({
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
    reset();
    tempMarker?.remove();
    setView("list");
    setTempMarker(undefined);
  };

  function onSubmit(values: AddMarkerInput) {
    mutate({ ...values, ...tempMarker?.getLngLat() });
  }

  function addYears({ date, years }: { date: Date; years: number }): Date {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() + years);
    return dateCopy;
  }

  return (
    <div className="h-full w-full bg-white p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between overflow-y-scroll pr-2"
      >
        <h1 className="text-2xl font-bold text-dark-blue">Add new marker</h1>
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
              Contact Name
            </label>
            <PrimaryInput
              isSmall
              placeholder="Contact Name"
              register={register("contactName")}
            />
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
                />
              )}
            />
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
                Contract Started
              </label>
              <Controller
                control={control}
                name="contractStarted"
                render={({ field }) => (
                  <DatePicker
                    className="h-10 w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
                focus:border-light-blue disabled:border-gray-200"
                    placeholderText="Select date"
                    onChange={(date) => {
                      field.onChange(
                        getValues("markerType") !== "Common_Depository"
                          ? date
                          : null
                      );
                      if (date) {
                        setValue(
                          "contractEnd",
                          addYears({ date: date as Date, years: 5 })
                        );
                      }
                    }}
                    selected={field.value}
                    dateFormat="MMMM-dd-yyyy"
                    required={getValues("markerType") !== "Common_Depository"}
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                Contract End
              </label>
              <Controller
                control={control}
                name="contractEnd"
                render={({ field }) => (
                  <DatePicker
                    className="h-10 w-full rounded-lg border-2 border-light-blue bg-white px-4 font-sans text-base text-gray-900 outline-none placeholder-shown:border-gray-400 hover:border-light-blue
                focus:border-light-blue disabled:border-gray-200"
                    placeholderText="Select date"
                    onChange={(date) =>
                      field.onChange(
                        getValues("markerType") !== "Common_Depository"
                          ? date
                          : null
                      )
                    }
                    selected={field.value}
                    dateFormat="MMMM-dd-yyyy"
                    required={getValues("markerType") !== "Common_Depository"}
                  />
                )}
              />
            </div>

            {getValues("markerType") === "Common_Depository" ? (
              <div className="absolute h-full w-full bg-white/[.80]"></div>
            ) : null}
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

        <div className="flex items-end justify-end gap-2">
          <div className="w-20">
            <SecondaryButton type="button" isSmall onClick={handleCancelClick}>
              Cancel
            </SecondaryButton>
          </div>
          <div className="w-44">
            <PrimaryButton
              isSmall
              disabled={!isValid || !isDirty || !tempMarker || isLoading}
              isLoading={isLoading}
            >
              Add
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MarkerAddForm;
