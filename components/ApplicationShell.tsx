
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import NavLink from "@/components/NavLink";
type ActivePath = "books" | "authors" | "members" | "loans" | "bookaudits";
import { usePathname } from "next/navigation";

import {
  Book,
  HardDrive,
  LucideHeartHandshake,
  Notebook,
  Pencil,
  Search,
  User,
} from "lucide-react";
import Footer from "./Footer";
import { getBooks } from "@/app/utils/Books/getBooks";
import { getAuthors } from "@/app/utils/Authors/getAuthors";
import { getMembers } from "@/app/utils/Members/getMembers";
import { getLoans } from "@/app/utils/Loans/getLoans";
import { getBookAudits } from "@/app/utils/BookAudits/getBookAudits";
import { useActiveLink } from "../app/contexts/ActiveLinkContext";
import path from "path";

type ShellProps = {
  children: React.ReactNode;
};

export default function Shell({ children }: ShellProps) {



  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <HardDrive className="h-6 w-6" />
              <span className="">NexaLibrium</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <NavLink href="/books">
                <Book className="h-4 w-4" />
                Books
              </NavLink>
              <NavLink href="/authors">
                <Pencil className="h-4 w-4" />
                Authors
              </NavLink>
              <NavLink href="/members">
                <User className="h-4 w-4" />
                Members
              </NavLink>

              <NavLink href="/loans">
                <LucideHeartHandshake className="h-4 w-4" />
                Loans
              </NavLink>
              <NavLink href="bookaudits">
                <Notebook className="h-4 w-4" />
                BookAudits
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <span className="sr-only">Books</span>
          </Link>
          <div className="w-full flex-1">
            <form >
              <div className="relative">
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
