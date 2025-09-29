declare module "@headlessui/react" {
  import { ComponentProps, ElementType, ComponentType, ReactNode } from "react";

  interface TransitionRenderProps {
    show: boolean;
    appear?: boolean;
    unmount?: boolean;
  }

  interface TransitionEvents {
    beforeEnter?: () => void;
    afterEnter?: () => void;
    beforeLeave?: () => void;
    afterLeave?: () => void;
  }

  interface TransitionChildProps extends TransitionEvents {
    as?: ElementType;
    appear?: boolean;
    show?: boolean;
    unmount?: boolean;
    className?: string;
    enter?: string;
    enterFrom?: string;
    enterTo?: string;
    leave?: string;
    leaveFrom?: string;
    leaveTo?: string;
    children?: ReactNode;
  }

  interface DialogProps {
    as?: ElementType;
    static?: boolean;
    unmount?: boolean;
    open: boolean;
    onClose: (value: boolean) => void;
    initialFocus?: React.RefObject<HTMLElement>;
    className?: string;
    children?: ReactNode | ((props: { open: boolean }) => ReactNode);
  }

  interface DialogPanelProps {
    as?: ElementType;
    className?: string;
    static?: boolean;
    unmount?: undefined;
    focus?: boolean;
    children?: ReactNode;
  }

  interface DialogOverlayProps {
    as?: ElementType;
    className?: string;
    children?: ReactNode;
  }

  interface DialogTitleProps {
    as?: ElementType;
    className?: string;
    children?: ReactNode;
  }

  interface DialogDescriptionProps {
    as?: ElementType;
    className?: string;
    children?: ReactNode;
  }

  export const Transition: ComponentType<TransitionChildProps> & {
    Child: ComponentType<TransitionChildProps>;
    Root: ComponentType<TransitionChildProps>;
  };

  export const Dialog: ComponentType<DialogProps> & {
    Panel: ComponentType<DialogPanelProps>;
    Overlay: ComponentType<DialogOverlayProps>;
    Title: ComponentType<DialogTitleProps>;
    Description: ComponentType<DialogDescriptionProps>;
  };

  export const DialogOverlay: ComponentType<DialogOverlayProps>;
  export const DialogTitle: ComponentType<DialogTitleProps>;
}
