'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Wrench,
  MessageCircle,
  Newspaper,
  Settings,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: Building2,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageCircle,
  },
  {
    name: "News",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col">
        {/* Sidebar component */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="text-xl font-bold">
              Rafiki Partners
            </Link>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                            isActive
                              ? "bg-gray-50 text-blue-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-6 w-6 shrink-0",
                              isActive ? "text-blue-600" : "text-gray-400",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              <li className="mt-auto">
                <div className="flex items-center gap-x-4 border-t border-gray-200 py-4">
                  <div className="flex items-center gap-x-4">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10",
                        },
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="sr-only">Your profile</span>
                      <span
                        aria-hidden="true"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Admin User
                      </span>
                      <SignOutButton>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </Button>
                      </SignOutButton>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="pl-72">
        <div className="min-h-screen bg-gray-50 px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
