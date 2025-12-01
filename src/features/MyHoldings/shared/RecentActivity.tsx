import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/Accordion/Accordion';
import {
  formatAmountWithCommas,
  formatTimestamp,
} from '@/shared/utils/string.utils';
import Link from 'next/link';

const mockData = [
  {
    type: 'Claim',
    amount: 150.5,
    token: 'K2',
    timestamp: 1763478382000,
    transactionHash: '0x1234567890',
  },
  {
    type: 'Unlock requested',
    amount: 100.25,
    token: 'K2',
    timestamp: 1762787182000,
    transactionHash: '0x1234567890',
  },
];

export const RecentActivity = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="activity">
        <AccordionTrigger className="hover:no-underline flex items-center justify-start gap-1">
          <div className="text-size-12 text-gray-900 font-[400]">
            Recent Activity
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-size-14">
          <div className="flex flex-col w-full justify-between items-center gap-2">
            {mockData.map((item) => (
              <div
                key={item.transactionHash}
                className="bg-white border border-gray-100 text-size-12 rounded-lg px-3 py-2 flex flex-row w-full justify-between items-center gap-3"
              >
                <div>{item.type}</div>
                <div className="flex flex-row justify-end gap-2">
                  <div className="font-medium">
                    {formatAmountWithCommas(item.amount)} {item.token}
                  </div>
                  <div className="text-gray-500">
                    {formatTimestamp(item.timestamp)}
                  </div>
                  <div>
                    <Link
                      href={`https://etherscan.io/tx/${item.transactionHash}`}
                      target="_blank"
                      className="text-size-12 underline"
                    >
                      View Tx
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
