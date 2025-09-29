// Database types
export type * from './database';

// Component types
export interface IconProps {
  className?: string;
  size?: number;
}

export type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

// Form types
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormState {
  status: FormStatus;
  message?: string;
}

// Utility types
export type ValueOf<T> = T[keyof T];

export type AnyObject = Record<string, unknown>;

// API Response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Common component props
export interface BaseProps {
  className?: string;
  id?: string;
}

export interface BaseSectionProps extends BaseProps {
  title?: string;
  description?: string;
}

// Status types
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

export interface LoadingStateWithError {
  state: LoadingState;
  error?: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<IconProps>;
  current?: boolean;
  disabled?: boolean;
}

// SEO types
export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

// Image types
export interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

// Animation types
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimationProps {
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  distance?: number;
}

// Modal types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

// Utility functions types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

export type RequireOnlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
