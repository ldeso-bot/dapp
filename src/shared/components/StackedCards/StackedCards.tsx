import { cn } from '@/shared/utils/component.utils';
import { PropsWithChildren } from 'react';
import styles from './stackedCards.module.css';

type Props = {
  className?: string;
} & PropsWithChildren;

export default function StackedCards({ children, className }: Props) {
  return <div className={cn(styles.stackedCards, className)}>{children}</div>;
}
