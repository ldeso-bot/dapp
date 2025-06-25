import { PropsWithChildren } from 'react';
import styles from './stackedCards.module.css';

export default function StackedCards({ children }: PropsWithChildren) {
  return <div className={styles.stackedCards}>{children}</div>;
}
