import { CardProps } from '@/shared/components/Card/Card';
import { tokens } from '@/shared/constants/tokens.constants';
import { BUY_K2_URL } from '@/shared/constants/urls.constants';
import { useProtocolData } from '@/shared/hooks/api/useProtocolData';
import { formatPriceUSDWithCommas } from '@/shared/utils/string.utils';
import StatCard from '../../shared/StatCard/StatCard';

export default function K2PriceCard(props: CardProps) {
  const { data } = useProtocolData();
  const price = formatPriceUSDWithCommas(
    data?.metrics.k2.valueUSD ?? 0,
    'auto'
  );
  return (
    <StatCard
      {...props}
      buttonText="Trade K2"
      buttonHref={BUY_K2_URL}
      className="text-text-1"
      buttonTarget="_blank"
      title="K2 Price"
      primaryValue={price}
      token={tokens.usdc}
    />
  );
}
