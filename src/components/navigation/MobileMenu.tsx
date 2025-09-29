"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "News", href: "/#news" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-base font-medium",
                        pathname === item.href
                          ? "text-blue-600"
                          : "text-gray-900 hover:text-blue-600",
                      )}
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <SignedIn>
                      <div className="flex items-center justify-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <Link href="/sign-in" onClick={onClose}>
                        <Button className="w-full" variant="outline">
                          Sign in
                        </Button>
                      </Link>
                    </SignedOut>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
