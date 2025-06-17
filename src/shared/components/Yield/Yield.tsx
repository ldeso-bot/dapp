type Props = {
  baseApy: number;
  riskyYield: number;
};

export default function Yield({ baseApy, riskyYield }: Props) {
  return (
    <div className="flex flex-row gap-2 justify-between items-center p-3 bg-void-10 rounded-lg text-size-14">
      <div className="flex flex-row gap-1">
        <div>Base APY:</div>
        <div className="font-bold">{baseApy}%</div>
      </div>
      <div className="border-l-1 border-void-20 text-size-14">&nbsp;</div>
      <div className="flex flex-row gap-1">
        <div>Risky Yield</div>
        <div className="font-bold">{riskyYield}%</div>
      </div>
    </div>
  );
}
