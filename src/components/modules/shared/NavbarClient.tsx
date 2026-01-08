"use client";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { logoutUser } from "@/services/auth/logoutUser";
import { IUser } from "@/types/user.type";
import { CupSoda, Home, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavbarClient = ({ userInfo }: { userInfo: IUser | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dashboardRoute =
    userInfo && userInfo.role ? getDefaultDashboardRoute(userInfo.role) : "/";

  const navItems = [
    { name: "Home", link: "/", logo: Home },
    { name: "Explore Events", link: "/events", logo: CupSoda },
    { name: "Become a Host", link: "/host", logo: User },
  ];

  return (
    <nav className="bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between py-2">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={60} height={60} />
          <p className="text-xl font-bold">Hitch</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="hover:text-primary flex items-center font-bold transition-all duration-300"
            >
              <item.logo className="mr-2 inline-block h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons (CONDITIONAL RENDERING) */}
        <div className="hidden gap-4 md:flex">
          {userInfo ? (
            <>
              {" "}
              <Button asChild>
                <Link href={dashboardRoute}>Dashboard</Link>
              </Button>
              <Button asChild variant={"destructive"}>
                <Link href={dashboardRoute} onClick={logoutUser}>
                  Logout
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant={"outline"} asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="bg-background animate-in slide-in-from-top-5 absolute top-full left-0 flex w-full flex-col items-center gap-6 border-b py-6 shadow-lg md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="hover:text-primary flex items-center text-lg font-bold transition-all duration-300"
            >
              <item.logo className="mr-2 inline-block h-5 w-5" />
              {item.name}
            </Link>
          ))}

          <div className="flex w-full flex-col gap-3 px-8">
            {userInfo ? (
              <>
                <Button className="w-full" asChild>
                  <Link href={dashboardRoute}>Go to Dashboard</Link>
                </Button>
                <Button asChild variant={"destructive"}>
                  <Link href={dashboardRoute} onClick={logoutUser}>
                    Logout
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant={"outline"} className="w-full" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarClient;
