import Icon from '../Icon/Icon';
import discordIcon from './images/discord.svg';
import telegramIcon from './images/telegram.svg';
import twitterIcon from './images/twitter.svg';

export default function FooterSocials() {
  return (
    <div className="flex flex-row gap-4">
      <Icon icon={twitterIcon} alt="Twitter" size={2} />
      <Icon icon={discordIcon} alt="Discord" size={2} />
      <Icon icon={telegramIcon} alt="Telegram" size={2} />
    </div>
  );
}
