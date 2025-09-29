"use client";

import { Suspense } from "react";
import { Header } from "@/components/navigation/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";
import { News } from "@/components/sections/News";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>

        <div className="space-y-24 pb-24">
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Portfolio />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <News />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        </div>
      </main>

      <footer className="border-t bg-neutral-50 py-12">
        <div className="container mx-auto text-center text-sm text-neutral-600">
          © {new Date().getFullYear()} Rafiki Partners. All rights reserved.
        </div>
      </footer>
    </>
  );
}
