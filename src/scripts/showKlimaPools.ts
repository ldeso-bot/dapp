import { getKlimaProtocolPools } from '../shared/utils/aerodrome.utils.js';

/** The goal of this script is essentially to grab the indexes of the klima protocol pools in velodrome sugar */
async function main() {
  const pools = await getKlimaProtocolPools();
  pools.forEach((pool) => {
    console.log('pool', pool.pool.symbol, pool.index);
    console.log(pool);
  });
}

main();
