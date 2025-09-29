declare module "class-variance-authority" {
  type ClassValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | { [key: string]: any }
    | ClassValue[];

  interface CVAConfig {
    variants?: {
      [variant: string]: {
        [option: string]: ClassValue;
      };
    };
    compoundVariants?: Array<
      {
        [key: string]: any;
      } & {
        class: ClassValue;
        className?: never;
      }
    >;
    defaultVariants?: {
      [variant: string]: string;
    };
  }

  type VariantPropsByConfig<Config extends CVAConfig> = {
    [Variant in keyof Config["variants"]]?: keyof Config["variants"][Variant];
  };

  export type VariantProps<Component extends (props: any) => any> =
    Component extends (props: infer Props) => any
      ? Props extends { variants: CVAConfig["variants"] }
        ? VariantPropsByConfig<{ variants: Props["variants"] }>
        : never
      : never;

  export function cva(
    base: ClassValue,
    config?: CVAConfig,
  ): (
    props?: Record<string, any> & {
      class?: string;
      className?: string;
    },
  ) => string;

  export function cx(...inputs: ClassValue[]): string;
}

declare module "@radix-ui/react-slot" {
  import * as React from "react";

  interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
  }

  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
}
