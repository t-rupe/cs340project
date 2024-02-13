"use client";
import Link from "next/link";
import { useActiveLink } from "../app/contexts/ActiveLinkContext";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const { activePath, setActivePath } = useActiveLink();
  const isActive = activePath === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
        isActive
          ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
      }`}
      onClick={() => setActivePath(href)}
    >
      {children}
    </Link>
  );
};

export default NavLink;
