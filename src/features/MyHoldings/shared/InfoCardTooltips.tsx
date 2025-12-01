export const InfoCardTooltips = {
  'kvcm-locks': () => (
    <div className="space-y-3">
      <div>
        <strong>Multiple Locks per wallet.</strong> You can create several
        fixed-term kVCM locks. Each lock has it&apos;s own maturity. You can add
        more kVCM to an existing lock with <i>Top up</i>; the locks maturity
        does not change.
      </div>
      <div>
        <strong>Terms &amp; accrual.</strong> Choose a maturity when you lock.
        Base Accrual is added to your principal daily and pays only at maturity.
        No early unlock.
      </div>
      <div>
        <strong>Incentives (K2).</strong> Incentives are shared across all
        time-locked kVCM, proportional to your locked amount and term. They
        accrue linearly (not compounded) and can change over time, including 0.
      </div>
      <div>
        <strong>Claiming.</strong> Principal plus Base Accrual become claimable
        at maturity. K2 incentives can be claimed anytime from the Incentives
        section.
      </div>
    </div>
  ),
  'k2-position': () => (
    <div className="space-y-3">
      <div>
        <strong>One position per wallet.</strong> Deposits increase the
        position. When you request an unlock, the requested amount moves to{' '}
        <i>Pending</i> until the next daily cutoff.
      </div>
      <div>
        <strong>Unlock eligibility.</strong> Each deposit must be held ≥24hr
        before it can be requested for unlock. Eligibility is checked at the
        daily cutoff: your first deposit is eligible at the next cutoff; later
        deposits become eligible one full day after their own timestamps and
        then roll to the next cutoff.
      </div>
      <div>
        <strong>In-position vs accrual.</strong> Rewards accrue on{' '}
        <i>in-position</i> principal only. Accrual stops when principal moves to{' '}
        <i>Pending</i> and remains stopped while <i>Claimable</i>.
      </div>
      <div>
        <strong>Rewards & APR.</strong> K2 incentives are allocated pro-rata to
        in-position principal and accrue linearly (no compounding). The
        displayed APR is a simple trailing 30-day rate; parameters may change
        and rates can be 0.
      </div>
      <div>
        <strong>Claiming.</strong> When you claim principal, the proportional
        share of accrued rewards transfers with it after Pending becomes
        Claimable at the cutoff.
      </div>
    </div>
  ),
  'liquidity-positions': () => (
    <div className="space-y-3">
      <div>
        <strong>Lots per pool.</strong> Deposit LP on the DEX, then{' '}
        <i>Stake in Klima</i>. Each stake becomes a <i>lot</i> with a standard
        maturity.
      </div>
      <div>
        <strong>Unlocks at maturity.</strong> Principal can&apos;t be unlocked
        early. Rewards unlock and are claimable at <i>maturity per lot</i>.
      </div>
      <div>
        <strong>Rewards.</strong> Two streams may accrue: <i>Incentives (K2)</i>{' '}
        and <i>Protocol Distribution (kVCM)</i>. K2 shows a simple 30-day APR;
        kVCM is shown as token amounts.
      </div>
      <div>
        <strong>Residuals.</strong> If accruals post late, a matured lot may
        show extra rewards later; claim residuals separately.
      </div>
    </div>
  ),
} as const;

export type InfoCardTooltipKey = keyof typeof InfoCardTooltips;
