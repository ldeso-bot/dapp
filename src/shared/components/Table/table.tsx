'use client';

import * as React from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return <table data-slot="table" className={className} {...props} />;
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={clsx('text-size-14 text-void-60 font-normal', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr data-slot="table-row" className={clsx('px-2', className)} {...props} />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={clsx(
        'first:pl-0 last:pr-0 px-2 font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[0.2rem]',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={twMerge(
        clsx(
          'py-3 first:pl-0 last:pr-0 px-2 border-b-1 border-void-20 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[0.2rem]',
          className
        )
      )}
      {...props}
    />
  );
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
