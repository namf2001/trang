"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mainIcon } from '@/assets/image';
import Image from "next/image";
import navbarLinks from "@/constants/navbar";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetDescription, SheetTitle } from "@/components/ui/sheet";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-2 left-0 right-0 z-50 w-full md:top-10 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-6xl px-4">
      <div className="bg-[#73737c33] backdrop-blur-md rounded-full border-b md:border border-white/20 px-4 py-2 flex items-center justify-between shadow-lg">
        <Link href="/" className="flex items-center justify-center ml-2" prefetch={false}>
          <Image src={mainIcon} alt="IPTV Player Logo" width={40} height={40} />
          <span className="ml-2 text-sm font-bold text-[#F56F10]">IPTV Player</span>
        </Link>
        <nav className="hidden lg:flex gap-6 items-center">
          {navbarLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 relative ${isActive
                    ? "text-white font-bold"
                    : "text-[#767676] hover:text-white hover:font-bold"
                    }`}
                  prefetch={false}
                >
                  {link.label}
                </Link>
                {index < navbarLinks.length - 1 && (
                  <span className="ml-6 text-gray-500">|</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop Get App button */}
        <Button className="hidden lg:block w-28 h-10 bg-[#F56F10] text-white hover:bg-[#F56F10]/90 transition-colors rounded-[100px]">
          Get App
        </Button>

        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#1a1a1a] border-l border-white/20 p-6">
            <SheetTitle className="sr-only">
              Navigation Menu
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation menu with links and app download button
            </SheetDescription>
            <Link href="/" className="flex items-center justify-center mb-6" prefetch={false}>
              <Image src={mainIcon || "/placeholder.svg?height=40&width=40&query=IPTV Player logo"} alt="IPTV Player Logo" width={40} height={40} />
              <span className="ml-2 text-lg font-bold text-[#F56F10]">IPTV Player</span>
            </Link>
            <nav className="grid gap-4 py-6">
              {navbarLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-all duration-300 ${isActive ? "text-white font-bold" : "text-[#767676] hover:text-white hover:font-bold"
                      }`}
                    prefetch={false}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            {/* Get App button in mobile menu */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <Button className="w-full transition-colors rounded-[100px]">
                Get App
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}