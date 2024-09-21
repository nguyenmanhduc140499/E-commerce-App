"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/constants";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { UserButton } from "@clerk/nextjs";

const TopBar = () => {
  const [dropDownMenu, setDropdownMenu] = useState(false);
  const pathName = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>
      <div className="flex gap-8 max md:hidden">
        {navLinks.map(link => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathName === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
        <div className="relative flex gap-4 items-center">
          <Menu
            className="cursor-pointer md:hidden"
            onClick={() => setDropdownMenu(!dropDownMenu)}
          />
          {dropDownMenu && (
            <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-x1 rounded-1g">
              {navLinks.map(link => (
                <Link
                  href={link.url}
                  key={link.label}
                  className="flex gap-4 text-body-medium"
                >
                  {link.icon} <p>{link.label}</p>
                </Link>
              ))}
            </div>
          )}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
