import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Card({
  className,
  as: Component = 'div',
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg border border-gray-200 bg-white shadow-sm',
        className
      )}
      {...props}
    />
  );
}

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  className,
  ...props
}: CardTitleProps) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-gray-600', className)}
      {...props}
    />
  );
}

CardDescription.displayName = 'CardDescription';

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  className,
  ...props
}: CardContentProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

CardContent.displayName = 'CardContent';

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

CardFooter.displayName = 'CardFooter';
