import { CreateUserInput } from "@/schema/user.schema";
import { trpc } from "@/utils/trpc";
import { UserType } from "@prisma/client";
import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { PasswordInput, PrimaryInput } from "../inputs";
import useUserStore from "./userStore";

function AddUserDialog() {
  const ref = useRef(null);
  const { isAdding, setIsAdding, setUsers, users } = useUserStore();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<CreateUserInput>({ mode: "onChange" });

  const { mutate, isLoading } = trpc.user.addUser.useMutation({
    onSuccess: (user) => {
      setUsers([...users, user]);
      handleCloseButton();
    },
  });

  const userType = (Object.keys(UserType) as (keyof typeof UserType)[]).map(
    (enumKey) => {
      return {
        label: UserType[enumKey].toLowerCase(),
        value: UserType[enumKey],
      };
    }
  );
  const handleCloseButton = () => {
    reset();
    setIsAdding(false);
  };

  function onSubmit(values: CreateUserInput) {
    mutate({ ...values });
  }

  if (!isAdding) {
    return <></>;
  }

  return (
    <div className="absolute top-0 left-0 z-max flex h-full w-full select-none items-center justify-center bg-black/[.20] shadow-lg drop-shadow-lg">
      <div
        ref={ref}
        className="mx-5 flex gap-2 transition delay-150 ease-in-out"
      >
        <div className="relative flex h-fit w-full max-w-3xl flex-col justify-between gap-10 overflow-hidden rounded-lg bg-white p-5">
          <div className="absolute right-1 top-1 h-10 w-10">
            <SecondaryButton isSmall onClick={handleCloseButton}>
              <X className="text-dark-blue" />
            </SecondaryButton>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-between pb-10"
          >
            <h1 className="text-2xl font-bold text-dark-blue">Add new user</h1>
            <div className="space-y-2 pt-10">
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
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                    User type
                  </label>
                  <Controller
                    control={control}
                    defaultValue={UserType["User" as keyof typeof UserType]}
                    name="userType"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        classNamePrefix="addl-class"
                        options={userType}
                        value={userType.find((c) => c.value === value)}
                        onChange={(role) => {
                          onChange(role?.value);
                        }}
                      />
                    )}
                  />
                </div>
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
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex w-full gap-2 pt-5">
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
                    Password
                  </label>
                  <PasswordInput
                    isSmall
                    placeholder="Password"
                    register={register("password")}
                  />
                </div>
              </div>
              <div className="flex items-end justify-end gap-2">
                <div className="w-20">
                  <SecondaryButton
                    type="button"
                    isSmall
                    onClick={handleCloseButton}
                  >
                    Cancel
                  </SecondaryButton>
                </div>
                <div className="w-44">
                  <PrimaryButton
                    isSmall
                    disabled={!isValid || !isDirty || isLoading}
                    isLoading={isLoading}
                  >
                    Add
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUserDialog;
