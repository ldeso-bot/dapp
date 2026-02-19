export const InfoCardTooltips = {
  'kvcm-locks': () => (
    <div className="space-y-3">
      <div>
        <strong>Multiple locks per wallet.</strong> You can create several
        fixed-duration kVCM locks. Each lock has its own duration. You can add
        more kVCM to an existing lock via the <i>Top up</i> button.
      </div>
      <div>
        <strong>Terms &amp; accrual.</strong> Choose a duration when you lock.
        Indicative incentive rates are added to your locked tokens daily and
        unlocked after the term ends. Cannot be unlocked early.
      </div>
      <div>
        <strong>Incentives (K2).</strong> Incentives are shared across all
        time-locked kVCM, proportional to your locked amount and term. These
        incentives depend on protocol parameters, are variable, non-guaranteed,
        and may be zero.
      </div>
      <div>
        <strong>Claiming.</strong> Locked tokens plus any received kVCM
        incentives become claimable after the {"lock's"} duration ends. Variable
        K2 incentives can be claimed anytime.
      </div>
    </div>
  ),
  'k2-position': () => (
    <div className="space-y-3">
      <div>
        <strong>Token locks.</strong> Each new deposit is added to any already
        existing token locks. When you request an unlock, the requested amount
        moves to <i>Pending</i> until the next daily cutoff is reached.
      </div>
      <div>
        <strong>Unlock eligibility.</strong> Each deposit must be held for at
        least 24 hours before it can be requested for unlock. Eligibility is
        checked at the daily cutoff. Your first deposit is eligible at the next
        cutoff; later deposits become eligible one full day after their own
        timestamps and then roll to the next cutoff.
      </div>
      <div>
        <strong>Token lock importance.</strong> Incentives accrue only on locked
        K2 tokens. When tokens move to <i>Pending</i> or <i>Claimable</i>,
        incentives will stop.
      </div>
      <div>
        <strong>Incentives.</strong> K2 incentives are allocated pro-rata to
        locked tokens only and accrue linearly (no compounding). The displayed
        APR is a trailing 30-day rate. Protocol paramters may change, so this
        rate is variable, not guaranteed, and may be zero.
      </div>
      <div>
        <strong>Claiming.</strong> When you claim your previously locked tokens,
        the proportional share of accrued incentives transfers with.
      </div>
    </div>
  ),
  'liquidity-positions': () => (
    <div className="space-y-3">
      <div>
        <strong>Locks per pool.</strong> Deposit liquidity on Aerodrome, then{' '}
        <i>Stake in Klima</i>. Each stake becomes a <i>lock</i> with a standard
        duration.
      </div>
      <div>
        <strong>Liquidity unlocks.</strong> Liquidity staked in Klima Protocol
        cannot be unlocked early. Rewards unlock and are claimable after a lock
        has reached the end of its duration.
      </div>
      <div>
        <strong>Incentives.</strong> Providing liquidity is encouraged by
        variable K2 and kVCM incentives. Rates are subject to protocol
        parameters and may change.
      </div>
    </div>
  ),
} as const;

export type InfoCardTooltipKey = keyof typeof InfoCardTooltips;
