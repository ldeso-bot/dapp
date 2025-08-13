import { FormHTMLAttributes } from 'react';

type Props = {
  description?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export default function Form({ description, children, ...props }: Props) {
  return (
    <form className="flex flex-col gap-8 pt-3" {...props}>
      {description && <div>{description}</div>}
      <div className="flex flex-col gap-8">{children}</div>
    </form>
  );
}
