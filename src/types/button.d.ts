import { type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonVariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rightIcon?: ReactNode; // Legacy support for rightIcon
}
