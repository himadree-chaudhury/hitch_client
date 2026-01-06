"use client"; // Required for useState

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { CupSoda, Home, Menu, User, X } from "lucide-react"; // Added Menu and X icons
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "/", logo: Home },
    { name: "Explore Events", link: "/events", logo: CupSoda },
    { name: "Become a Host", link: "/host", logo: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background mt-2">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <div>
          <Image src={logo} alt="Logo" width={100} height={100}/>
        </div>

        {/* Desktop Menu - Hidden on mobile, flex on md screens */}
        <div className="hidden md:flex gap-5 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="font-bold hover:text-primary transition-all duration-300 flex items-center"
            >
              <item.logo className="inline-block mr-2 w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons - Hidden on mobile */}
        <div className="hidden md:flex gap-4 ">
          <Button variant={"outline"} asChild><Link href="/login">Login</Link></Button>
          <Button asChild><Link href="/register">Register</Link></Button>
        </div>

        {/* Mobile Menu Toggle Button - Visible on mobile only */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Rendered when isOpen is true */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b shadow-lg flex flex-col items-center gap-6 py-6 animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              onClick={() => setIsOpen(false)} // Close menu on click
              className="font-bold text-lg hover:text-primary transition-all duration-300 flex items-center"
            >
              <item.logo className="inline-block mr-2 w-5 h-5" />
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 w-full px-8">
            <Button variant={"outline"} className="w-full">
              Login
            </Button>
            <Button className="w-full">Register</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
