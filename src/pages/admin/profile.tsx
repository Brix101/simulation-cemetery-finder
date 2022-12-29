import AdminNavBar from "@/components/navigation/AdminNavBar";
import { PrimaryButton } from "@/componentsbuttons";
import { PasswordInput, PrimaryInput } from "@/componentsinputs";
import { UpdateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";

function EditUserDialog() {
  const [isUpdated, setIsUpdate] = useState<boolean>(false);
  const ref = useRef(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UpdateUserInput>({ mode: "onChange" });

  const { data: userData, refetch } = trpc.user.me.useQuery();
  const { mutate, isLoading } = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      refetch();
      setIsUpdate(true);
      reset((prev) => ({ ...prev, password: "" }));
    },
  });

  const handleClickOutside = () => {
    setIsUpdate(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    if (userData) {
      reset({
        id: userData.id,
        address: userData.address as string,
        birthDate: userData.birthDate as Date,
        contactNo: userData.contactNo as string,
        email: userData.email as string,
        firstName: userData.firstName as string,
        lastName: userData.lastName as string,
        middleName: userData.lastName as string,
        userType: userData.userType,
      });
    }
  }, [userData, reset]);

  const onSubmit = (values: UpdateUserInput) => {
    mutate({ ...values });
  };

  return (
    <div className="relative flex h-screen w-full  flex-col bg-gray-50">
      <div className="relative z-50">
        <AdminNavBar />
      </div>{" "}
      <div className="flex flex-1 justify-center">
        <div className="relative flex h-fit w-full max-w-3xl flex-col justify-between gap-10 overflow-hidden rounded-lg p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-between pb-10"
          >
            <h1 className="text-2xl font-bold text-dark-blue">Edit profile</h1>
            <div className="space-y-2 pt-5">
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
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <PrimaryInput
                  isSmall
                  placeholder="Email"
                  register={register("email")}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Address
                </label>
                <PrimaryInput
                  isSmall
                  placeholder="Address"
                  register={register("address")}
                />
              </div>
              <div className="flex w-full gap-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Contact No
                  </label>
                  <PrimaryInput
                    isSmall
                    placeholder="Contact No"
                    register={register("contactNo")}
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    Birthdate
                  </label>
                  <Controller
                    control={control}
                    name="birthDate"
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
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password
                </label>
                <PasswordInput
                  isSmall
                  placeholder="Password"
                  register={register("password")}
                />
              </div>
              <div className="flex items-end justify-end gap-2 pt-5">
                <div className="w-44">
                  <PrimaryButton
                    isSmall
                    disabled={!isDirty}
                    isLoading={isLoading}
                  >
                    Update
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isUpdated ? (
        <div
          className={`fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black/[.20] shadow-lg drop-shadow-lg`}
        >
          <div
            ref={ref}
            className="mx-5 flex gap-2 transition delay-150 ease-in-out"
          >
            <div className="relative flex h-fit w-fit items-center justify-between gap-5 overflow-hidden rounded-lg bg-white p-5 ">
              <CheckCircle className="h-20 w-20" />
              <span className="text-2xl">Updated Success</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EditUserDialog;
