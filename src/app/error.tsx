"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[80vh] place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          We apologize for the inconvenience. Please try again or contact
          support if the problem persists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset}>Try again</Button>
          <Button variant="ghost" onClick={() => window.location.assign("/")}>
            Go back home
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-md bg-red-50 p-4">
            <pre className="text-left text-sm text-red-700">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
