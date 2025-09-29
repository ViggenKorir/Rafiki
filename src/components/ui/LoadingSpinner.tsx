"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div role="status" className="flex items-center justify-center p-4">
      <div
        className={cn(
          "animate-spin rounded-full border-neutral-200",
          "border-t-primary",
          sizeClasses[size],
          className,
        )}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
