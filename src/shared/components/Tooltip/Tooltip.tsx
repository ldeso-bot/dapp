import helpIcon from '@/shared/images/help.svg';
import { Tooltip } from 'radix-ui';
import Icon from '../Icon/Icon';
import styles from './tooltip.module.css';

type Props = {
  content: React.ReactNode;
};
export default function Card({ content }: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div>
            <Icon icon={helpIcon} alt={'Help'} size={16} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.TooltipContent} sideOffset={5}>
            {content}
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
