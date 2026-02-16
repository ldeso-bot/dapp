import Icon from '../Icon/Icon';
import discordIcon from './images/discord.svg';
import telegramIcon from './images/telegram.svg';
import twitterIcon from './images/twitter.svg';

import { ROUTES } from '@/shared/constants/route.constants';

export default function FooterSocials() {
  return (
    <div className="flex flex-row gap-4">
      <a
        href={ROUTES.X}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <Icon icon={twitterIcon} alt="Twitter" size={2} />
      </a>
      <a
        href={ROUTES.DISCORD}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
      >
        <Icon icon={discordIcon} alt="Discord" size={2} />
      </a>
      <a
        href={ROUTES.TELEGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
      >
        <Icon icon={telegramIcon} alt="Telegram" size={2} />
      </a>
    </div>
  );
}
