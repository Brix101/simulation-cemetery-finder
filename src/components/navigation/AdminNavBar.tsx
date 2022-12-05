import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { ArrowRightCircle, ChevronDown, Settings } from "react-feather";

function AdminNavBar() {
  const router = useRouter();
  const { data } = useSession();
  return (
    <div className="flex h-20 w-full items-center justify-between bg-dark-blue px-10 shadow-lg drop-shadow-lg">
      <Link href={"/"}>
        <div className="cursor-pointer select-none text-center text-white hover:text-light-blue">
          <h1 className="font-sans text-2xl font-bold">
            Maramag Memorial Park
          </h1>
          <span className="font-sans text-xs">Maramag, Bukidnon</span>
        </div>
      </Link>
      <div className="flex items-center gap-10">
        <div className="flex gap-5">
          <NavLink href="/admin">Deceased</NavLink>
          <NavLink href="/admin/user">Users</NavLink>
        </div>
        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <Menu.Button className="flex w-auto items-center gap-2 text-white">
                <span className="text-sm font-bold capitalize leading-3">
                  {data?.user?.name}
                </span>
                <ChevronDown
                  className={`transition-all delay-75 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-max mt-2 flex w-auto origin-top-right flex-col divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item
                    as={"button"}
                    className="flex items-center justify-start gap-2 py-2 px-5"
                    onClick={() => router.push("/admin/profile")}
                  >
                    <Settings />
                    <span>Account</span>
                  </Menu.Item>
                  <Menu.Item
                    as={"button"}
                    className="flex items-center justify-start gap-2 py-2 px-5"
                    onClick={() => signOut()}
                  >
                    <ArrowRightCircle />
                    <span>logout</span>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  return (
    <div
      className={`
    font-sans text-sm font-bold
    ${isActive ? "text-light-blue" : "text-white"}`}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default AdminNavBar;
