'use client';

import ArrowDown from '@/shared/images/arrow_down.svg';
import { cn } from '@/shared/utils/component.utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';
import Icon from '../Icon/Icon';

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  iconSide = 'left',
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  iconSide?: 'left' | 'right';
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
          className,
          { 'w-full justify-between': iconSide === 'right' }
        )}
        {...props}
      >
        {iconSide === 'left' && (
          <Icon
            icon={ArrowDown}
            className="text-muted-foreground pointer-events-none size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        )}
        {children}
        {iconSide === 'right' && (
          <Icon
            icon={ArrowDown}
            className="text-muted-foreground pointer-events-none size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
