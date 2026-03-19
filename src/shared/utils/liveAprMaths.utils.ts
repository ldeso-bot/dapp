import Decimal from 'decimal.js';
import { MaturityId } from '../models/ProtocolData';

type MaturityDistributionMetrics = {
  tokensDistributed: Decimal;
  tokensLockedForBucket: Decimal;
};
type MaturitiesDistribution = Record<
  MaturityId,
  {
    k2: MaturityDistributionMetrics;
    kvcm: MaturityDistributionMetrics;
    'kvcm-usdc': MaturityDistributionMetrics;
    'kvcm-k2': MaturityDistributionMetrics;
  }
>;

export type MaturitiesBaseInformation = Record<
  MaturityId,
  {
    maturityId: MaturityId;
    maturationTimestamp: number;
    kvcmLocked: Decimal;
    kvcmUsdcLPLocked: Decimal;
    kvcmK2LPLocked: Decimal;
  }
>;

export type BetaLambdas = {
  betaLambdaGG: Decimal;
  betaLambdaG: Decimal;
  betaLambdaQ: Decimal;
};

export type CarbonClassesInformation = {
  carbonClassId: string;
  k2Allocated: Decimal;
  kvcmAllocated: Decimal;
}[];

export type PoolStats = {
  kvcmInKvcmUsdcPool: Decimal;
  kvcmInKvcmK2Pool: Decimal;
  k2InKvcmK2Pool: Decimal;
  totalKvcmK2LP: Decimal;
  totalKvcmUsdcLP: Decimal;
};

type ComputeSyntheticYieldDistributionParams = {
  kvcmSupply: Decimal;
  maturitiesInformation: MaturitiesBaseInformation;
  midnightIndex: number;
};
/**
 * Compute the kVCM base accrual distributed the next day based on the kVCM
 * supply and the number of kVCM locked at each maturity. Assume that none of
 * these inputs will change until the next distribution, and that this
 * distribution will take place at the next midnight UTC.
 *
 * Because this calculation is stateless, this function can also be used to
 * compute how changing any of its inputs would influence the kVCM base accrual,
 * assuming this change would be the last one to happen until the next midnight
 * UTC.
 */
export const computeSyntheticYieldDistribution = ({
  kvcmSupply,
  maturitiesInformation,
  midnightIndex,
}: ComputeSyntheticYieldDistributionParams): MaturitiesDistribution => {
  const zero = new Decimal(0);

  const yieldCurveValues = computeZeroCouponYieldCurve({
    kvcmSupply,
    maturitiesInformation,
    midnightIndex,
  });

  const maturitiesDistribution: MaturitiesDistribution = {};

  yieldCurveValues.yieldCurve.forEach(
    ({ maturityId, zeroCouponYield, kvcmLocked }) => {
      maturitiesDistribution[maturityId] = {
        k2: {
          tokensDistributed: zero,
          tokensLockedForBucket: zero,
        },
        kvcm: {
          tokensDistributed: kvcmLocked.times(
            Decimal.exp(zeroCouponYield.div(365)).minus(1)
          ),
          tokensLockedForBucket: kvcmLocked,
        },
        'kvcm-usdc': {
          tokensDistributed: zero,
          tokensLockedForBucket: zero,
        },
        'kvcm-k2': {
          tokensDistributed: zero,
          tokensLockedForBucket: zero,
        },
      };
    }
  );

  return maturitiesDistribution;
};

type ComputeKvcmProtocolDistributionParams = {
  kvcmSupply: Decimal;
  k2Locked: Decimal;
  maturitiesInformation: MaturitiesBaseInformation;
  midnightIndex: number;
  betaLambdas: BetaLambdas;
};
/**
 * Compute the kVCM protocol distribution based on the kVCM supply, the numbers
 * of kVCM and K2 locked, and the finalized lambdas computed for the current
 * protocol state. Assume that neither these inputs, nor the K2 supply, the
 * current K2 allocations, or the current liquidity pool balances will change
 * until the next distribution, and that this distribution will take place at
 * the next midnight UTC.
 *
 * This function can also be used to compute how changing any kVCM, K2, or
 * liquidity locks would influence the kVCM protocol distribution, assuming this
 * change would be the last one to happen until the next midnight UTC.
 *
 * However, because the calcuation of lambdas is stateful, this function CANNOT
 * BE USED to compute how changing any of the kVCM or K2 supply, the K2
 * allocations, or the liquidity pool balances would influence the kVCM protocol
 * distribution. If we ever want to compute how changing any of these would
 * influence the kVCM protocol distribution, the function will have to be
 * modified and it will have to take these as additional inputs, as well as what
 * would be changed by the user, and by how much.
 */
export const computeKvcmProtocolDistribution = ({
  kvcmSupply,
  k2Locked,
  maturitiesInformation,
  midnightIndex,
  betaLambdas,
}: ComputeKvcmProtocolDistributionParams): MaturitiesDistribution => {
  const zero = new Decimal(0);

  const yieldCurveValues = computeZeroCouponYieldCurve({
    kvcmSupply,
    maturitiesInformation,
    midnightIndex,
  });

  let num = zero;
  let denom = zero;
  yieldCurveValues.yieldCurve.forEach(
    ({ zeroCouponYield, discountRate, kvcmLocked }) => {
      const Zt = zeroCouponYield;
      const Bt = discountRate;
      const St = kvcmLocked.div(kvcmSupply);
      num = num.plus(Zt.times(Bt).times(St));
      denom = denom.plus(Zt.times(St));
    }
  );
  const discountParameter = num.div(denom);

  const totalKvcmSyntheticYield = Object.values(
    computeSyntheticYieldDistribution({
      kvcmSupply,
      maturitiesInformation,
      midnightIndex,
    })
  ).reduce((sum, { kvcm }) => sum.plus(kvcm.tokensDistributed), zero);

  const baseDistribution = totalKvcmSyntheticYield.times(discountParameter);

  const { betaLambdaGG, betaLambdaG, betaLambdaQ } = betaLambdas;

  let GtDenom = zero;
  let QtDenom = zero;
  const maturitiesDistribution: MaturitiesDistribution = {};

  yieldCurveValues.yieldCurve.forEach(
    ({ maturityId, zeroCouponYield, discountRate, kvcmLocked }) => {
      const Zt = zeroCouponYield;
      const Bt = discountRate;
      const LGt = maturitiesInformation[maturityId]?.kvcmK2LPLocked;
      const LQt = maturitiesInformation[maturityId]?.kvcmUsdcLPLocked;
      if (!LGt || !LQt) {
        throw new Error('LGt or LQt are undefined');
      }
      const GtNum = LGt.times(Zt).times(Bt);
      const QtNum = LQt.times(Zt).times(Bt);
      GtDenom = GtDenom.plus(GtNum);
      QtDenom = QtDenom.plus(QtNum);

      maturitiesDistribution[maturityId] = {
        k2: {
          tokensDistributed: baseDistribution.times(betaLambdaGG),
          tokensLockedForBucket: k2Locked,
        },
        kvcm: {
          tokensDistributed: zero,
          tokensLockedForBucket: kvcmLocked,
        },
        'kvcm-k2': {
          tokensDistributed: baseDistribution.times(betaLambdaG).times(GtNum),
          tokensLockedForBucket: LGt,
        },
        'kvcm-usdc': {
          tokensDistributed: baseDistribution.times(betaLambdaQ).times(QtNum),
          tokensLockedForBucket: LQt,
        },
      };
    }
  );

  Object.values(maturitiesDistribution).forEach((maturity) => {
    maturity['kvcm-k2'].tokensDistributed =
      maturity['kvcm-k2'].tokensDistributed.div(GtDenom);

    maturity['kvcm-usdc'].tokensDistributed =
      maturity['kvcm-usdc'].tokensDistributed.div(QtDenom);
  });

  return maturitiesDistribution;
};
/**
 * Compute the K2 incentives distribution based on the kVCM and K2 supply, the
 * numbers of kVCM locked and allocated, the numbers of K2 locked and allocated,
 * and the numbers of kVCM and K2 deposited and locked in the liquidity pools.
 * Assuming that none of these inputs will change until the next distribution,
 * and that this distribution will take place at the next midnight UTC.
 *
 * Because this calculation is stateless, this function can also be used to
 * compute how changing any of its inputs would influence the K2 incentives
 * distribution, assuming this change would be the last one to happen until the
 * next midnight UTC.
 */
type ComputeK2IncentivesDistributionParams = {
  kvcmSupply: Decimal;
  k2Supply: Decimal;
  k2Locked: Decimal;
  maturitiesInformation: MaturitiesBaseInformation;
  carbonClassesInformation: CarbonClassesInformation;
  poolStats: PoolStats;
  midnightIndex: number;
};
export const computeK2IncentivesDistribution = ({
  kvcmSupply,
  k2Supply,
  k2Locked,
  maturitiesInformation,
  carbonClassesInformation,
  poolStats,
  midnightIndex,
}: ComputeK2IncentivesDistributionParams): MaturitiesDistribution => {
  const zero = new Decimal(0);
  const one = new Decimal(1);
  const two = new Decimal(2);

  let sumGi = zero;
  carbonClassesInformation.forEach(({ k2Allocated }) => {
    const Gi = k2Allocated.div(k2Supply);
    sumGi = sumGi.plus(Gi);
  });

  const { kvcmInKvcmUsdcPool, kvcmInKvcmK2Pool, k2InKvcmK2Pool } = poolStats;
  const Gg = k2InKvcmK2Pool.div(k2Supply);
  const Ag = kvcmInKvcmK2Pool.div(kvcmSupply);
  const Aq = kvcmInKvcmUsdcPool.div(kvcmSupply);
  const twoAg = two.times(Ag);
  const lambdaGG = one.minus(Aq).div(one.plus(sumGi.div(Gg).pow(2)));
  const lambdaG = one
    .minus(lambdaGG)
    .times(twoAg)
    .div(twoAg.plus(Aq.times(two.sqrt())));

  const totalKvcmLocked = Object.values(maturitiesInformation).reduce(
    (sum, { kvcmLocked }) => sum.plus(kvcmLocked),
    zero
  );

  const dailyEmission = calculateDailyK2Emission(midnightIndex);

  const relativeS = new Decimal(totalKvcmLocked).div(kvcmSupply);
  const relativeG = new Decimal(k2Locked).div(k2Supply);
  const relativeL = new Decimal(k2InKvcmK2Pool).div(k2Supply);

  const relativeUtilisation = calculateRelativeUtilisation(
    relativeG,
    relativeL
  );
  const absoluteUtilisation = calculateAbsoluteUtilisation(
    relativeG,
    relativeL
  );
  const utilisation = relativeUtilisation.mul(absoluteUtilisation);

  const treasuryShare = dailyEmission.mul(one.minus(utilisation));
  const usersShare = dailyEmission.minus(treasuryShare);
  const stakersShare = usersShare.mul(
    relativeL.pow(2).div(relativeG.pow(2).plus(relativeL.pow(2)))
  );
  const lPersShare = usersShare.minus(stakersShare);

  const kvcmStakersShare = stakersShare.mul(relativeS);
  const k2StakersShare = stakersShare.minus(kvcmStakersShare);

  const kvcmK2LPersShare = lPersShare.mul(lambdaG).div(one.minus(lambdaGG));
  const kvcmQLPersShare = lPersShare.minus(kvcmK2LPersShare);

  const yieldCurveValues = computeZeroCouponYieldCurve({
    kvcmSupply,
    maturitiesInformation,
    midnightIndex,
  });

  let kvcmDenom = zero;
  let GtDenom = zero;
  let QtDenom = zero;
  const maturitiesDistribution: MaturitiesDistribution = {};

  yieldCurveValues.yieldCurve.forEach(
    ({ maturityId, zeroCouponYield, discountRate, kvcmLocked }) => {
      const Zt = zeroCouponYield;
      const Bt = discountRate;
      const vt = Zt.times(kvcmLocked).div(kvcmSupply);
      const LGt = maturitiesInformation[maturityId]?.kvcmK2LPLocked;
      const LQt = maturitiesInformation[maturityId]?.kvcmUsdcLPLocked;
      if (!LGt || !LQt) {
        throw new Error('LGt or LQt are undefined');
      }
      const GtNum = LGt.times(Zt).times(Bt);
      const QtNum = LQt.times(Zt).times(Bt);
      kvcmDenom = kvcmDenom.plus(vt);
      GtDenom = GtDenom.plus(GtNum);
      QtDenom = QtDenom.plus(QtNum);

      maturitiesDistribution[maturityId] = {
        k2: {
          tokensDistributed: k2StakersShare,
          tokensLockedForBucket: k2Locked,
        },
        kvcm: {
          tokensDistributed: kvcmStakersShare.times(vt),
          tokensLockedForBucket: kvcmLocked,
        },
        'kvcm-k2': {
          tokensDistributed: kvcmK2LPersShare.times(GtNum),
          tokensLockedForBucket: LGt,
        },
        'kvcm-usdc': {
          tokensDistributed: kvcmQLPersShare.times(QtNum),
          tokensLockedForBucket: LQt,
        },
      };
    }
  );

  Object.values(maturitiesDistribution).forEach((maturity) => {
    maturity.kvcm.tokensDistributed =
      maturity.kvcm.tokensDistributed.div(kvcmDenom);

    maturity['kvcm-k2'].tokensDistributed =
      maturity['kvcm-k2'].tokensDistributed.div(GtDenom);

    maturity['kvcm-usdc'].tokensDistributed =
      maturity['kvcm-usdc'].tokensDistributed.div(QtDenom);
  });

  return maturitiesDistribution;
};

type YieldCurvePoint = {
  maturityId: number;
  zeroCouponYield: Decimal;
  discountRate: Decimal;
  kvcmLocked: Decimal;
};
type YieldCurveValues = {
  yieldCurve: YieldCurvePoint[];
};

type ComputeZeroCouponYieldCurveParams = {
  kvcmSupply: Decimal;
  maturitiesInformation: MaturitiesBaseInformation;
  midnightIndex: number;
};
const computeZeroCouponYieldCurve = ({
  kvcmSupply,
  maturitiesInformation,
  midnightIndex,
}: ComputeZeroCouponYieldCurveParams): YieldCurveValues => {
  const zero = new Decimal(0);
  const one = new Decimal(1);

  const maturitiesInformationArray = Object.values(maturitiesInformation).sort(
    (a, b) => a.maturityId - b.maturityId
  );
  const S_t: Decimal[] = maturitiesInformationArray.map(({ kvcmLocked }) =>
    kvcmLocked.div(kvcmSupply)
  );

  const S: Decimal = S_t.reduce((sum, x) => sum.plus(x), zero);
  const settlementMidnightIndex = 90 - ((midnightIndex + 1) % 90);
  const Et = maturitiesInformationArray.map((_, i) =>
    new Decimal(settlementMidnightIndex + i * 90).div(365)
  );

  const invS = one.div(S);
  const Et2 = Et.map((e) => e.pow(2));

  const D = Et.map((e, i) => e.times(S_t[i]!).times(invS)).reduce(
    (sum, x) => sum.plus(x),
    zero
  );

  const C = Et2.map((e2, i) => e2.times(S_t[i]!).times(invS)).reduce(
    (sum, x) => sum.plus(x),
    zero
  );

  const twoC = C.times(2);

  const gammas = Et.map((e) => {
    const term1 = e.div(D); //  E_t / D
    const term2 = e.pow(2).div(twoC); //  E_t² / (2·C)
    const raw = term1.minus(term2); //  E_t/D – E_t²/(2C)

    return Decimal.max(raw, 0); // clamp at 0
  });

  const gammaSum = gammas.reduce((acc, g) => acc.plus(g), zero);

  const normalizedGammas = gammas.map((g) =>
    gammaSum.isZero() ? zero : g.div(gammaSum)
  );

  const Γs: Decimal[] = [];
  normalizedGammas.reduce((acc, g) => {
    const next = acc.plus(g);
    Γs.push(next);
    return next;
  }, zero);

  const yieldCurveValues: YieldCurveValues = {
    yieldCurve: [],
  };

  maturitiesInformationArray.forEach(({ maturityId, kvcmLocked }, i) => {
    const e = Et[i];
    if (!e || !Γs[i]) {
      throw new Error('e or Γs[i] are undefined');
    }

    let Zt: Decimal;
    if (e.isZero()) {
      Zt = one; // spot bucket
    } else {
      Zt = one.minus(S).times(Γs[i]).div(e); // zero coupon yield curve
    }
    const Bt = Decimal.exp(Zt.neg().times(e)); // eqn (7)

    // clamp [0,1]
    const discountRate = Decimal.min(1, Decimal.max(0, Bt));

    yieldCurveValues.yieldCurve.push({
      maturityId,
      zeroCouponYield: Zt,
      discountRate,
      kvcmLocked,
    });
  });

  return yieldCurveValues;
};

function calculateDailyK2Emission(midnightIndex: number): Decimal {
  const zero = new Decimal(0);

  const k2YieldDay = new Decimal(midnightIndex + 1);
  const k2YieldDurationDays = new Decimal(2920);

  if (k2YieldDay.lessThan(1) || k2YieldDay.greaterThan(k2YieldDurationDays)) {
    return zero;
  }

  const k2YieldInflexionDay = new Decimal(730);
  const k2YieldAmount = new Decimal(40000000);
  const k2YieldP0 = new Decimal('0.07');
  const k2YieldPEnd = computeP(
    k2YieldDurationDays,
    k2YieldP0,
    k2YieldInflexionDay
  );

  const previousP = computeP(
    k2YieldDay.minus(1),
    k2YieldP0,
    k2YieldInflexionDay
  );
  const nextP = computeP(k2YieldDay, k2YieldP0, k2YieldInflexionDay);
  const diffP = nextP.minus(previousP);

  const emission = diffP.div(k2YieldPEnd.minus(k2YieldP0)).mul(k2YieldAmount);
  return emission;
}

function computeP(
  k2YieldDay: Decimal,
  k2YieldP0: Decimal,
  k2YieldInflexionDay: Decimal
): Decimal {
  const one = new Decimal(1);
  const x0 = k2YieldP0.div(one.minus(k2YieldP0)).ln();
  const xt = x0.mul(one.minus(k2YieldDay.div(k2YieldInflexionDay)));
  const exp = xt.exp();
  return exp.div(exp.plus(one));
}

function calculateRelativeUtilisation(G: Decimal, L: Decimal): Decimal {
  if (G.isZero() && L.isZero()) {
    return Decimal(0);
  } else {
    return G.mul(L)
      .mul(2)
      .div(G.pow(2).plus(L.pow(2)))
      .pow(2);
  }
}

function calculateAbsoluteUtilisation(G: Decimal, L: Decimal): Decimal {
  if (G.isZero() && L.isZero()) {
    return Decimal(0);
  } else {
    const one = new Decimal(1);
    return G.mul(L)
      .mul(2)
      .div(G.mul(one.minus(G)).plus(L.mul(one.minus(L))));
  }
}
