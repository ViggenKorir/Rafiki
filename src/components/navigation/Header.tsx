"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "News", href: "/#news" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Rafiki Partners
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors",
                pathname === item.href
                  ? "text-blue-600"
                  : "text-gray-900 hover:text-blue-600",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedOut>
            <div className="flex items-center gap-x-4">
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get started</Button>
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
