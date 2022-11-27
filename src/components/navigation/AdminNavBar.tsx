import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function AdminNavBar() {
  const router = useRouter();
  const isLogin = true;
  useEffect(() => {
    if (!isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  if (!isLogin) {
    return <></>;
  }

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
        <div className="h-10 w-10 rounded-full bg-light-blue"></div>
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
