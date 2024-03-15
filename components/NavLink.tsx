/**
 * This is a NavLink component for a navigation menu. It uses Next.js's Link component for navigation.
 * The NavLink component receives a 'href' prop for the destination URL and 'children' prop for the link's content.
 *
 * The component uses a context 'ActiveLinkContext' to manage the active link state.
 * If the current path is the same as the 'href' prop, the link is considered active and its style changes accordingly.
 *
 * When the link is clicked, the 'setActivePath' function from the 'ActiveLinkContext' is called with the 'href' prop to update the active link.
 *
 */
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
