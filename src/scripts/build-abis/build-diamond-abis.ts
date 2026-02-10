/**
 * Builds RewardManagerDiamond.ts and StakingManagerDiamond.ts by fetching
 * ABIs from Etherscan/Basescan for the diamond and facet addresses in config.
 *
 * Usage: pnpm tsx src/scripts/build-abis/build-diamond-abis.ts <ETHERSCAN_API_KEY>
 *    or: pnpm tsx src/scripts/build-abis/build-diamond-abis.ts --api-key=<ETHERSCAN_API_KEY>
 *
 * Supports testnet (Base Sepolia). Merges ABI items from
 * all addresses in the configuration.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

type AbiItem = Record<string, unknown>;

interface DiamondConfig {
  diamond: string;
  facets: Record<string, string>;
}

interface NetworkConfig {
  chainId: number;
  etherscanApiUrl: string;
  rewardManager: DiamondConfig;
  stakingManager: DiamondConfig;
}

interface Config {
  testnet: NetworkConfig;
}

function loadConfig(): Config {
  const configPath = join(__dirname, 'diamond-facets.config.json');
  const raw = readFileSync(configPath, 'utf-8');
  return JSON.parse(raw) as Config;
}

function collectAddresses(
  config: Config,
  diamond: 'rewardManager' | 'stakingManager'
): string[] {
  const list: string[] = [];
  const d = config.testnet[diamond];

  list.push(d.diamond);

  for (const a of Object.values(d.facets)) {
    list.push(a);
  }

  return list;
}

async function fetchAbi(
  apiUrl: string,
  address: string,
  apiKey: string
): Promise<AbiItem[]> {
  const url = `${apiUrl}?module=contract&action=getabi&address=${address}&apikey=${apiKey}&chainid=84532`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Etherscan fetch failed for ${address}: ${res.status} ${res.statusText} ${res.text()}`
    );
  }
  const data = (await res.json()) as {
    status: string;
    message: string;
    result: string;
  };
  if (data.status !== '1' || typeof data.result !== 'string') {
    throw new Error(
      `Etherscan API error for ${address}: ${data.message ?? JSON.stringify(data)}`
    );
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return JSON.parse(data.result) as AbiItem[];
}

function abiItemKey(item: AbiItem): string {
  const type = (item.type as string) ?? '';
  const name = (item.name as string) ?? '';
  const inputs = item.inputs as AbiItem[] | undefined;
  const inputsSig = inputs ? JSON.stringify(inputs) : '';
  if (type === 'function' || type === 'event' || type === 'error') {
    return `${type}:${name}:${inputsSig}`;
  }
  if (type === 'constructor') return `constructor:${inputsSig}`;
  return JSON.stringify(item);
}

function mergeAndDeduplicateAbis(abiArrays: AbiItem[][]): AbiItem[] {
  const byKey = new Map<string, AbiItem>();
  for (const arr of abiArrays) {
    for (const item of arr) {
      const key = abiItemKey(item);
      if (!byKey.has(key)) byKey.set(key, item);
    }
  }
  return Array.from(byKey.values());
}

function emitAbiTs(abi: AbiItem[]): string {
  return `const abi = ${JSON.stringify(abi)} as const;\nexport default abi;\n`;
}

async function buildDiamondAbi(
  addresses: string[],
  apiUrl: string,
  apiKey: string,
  outDir: string,
  diamondName: string
): Promise<void> {
  if (addresses.length === 0) return;

  const abiArrays: AbiItem[][] = [];
  for (const addr of addresses) {
    console.log(`Fetching ABI: ${diamondName} facet/diamond ${addr}`);
    abiArrays.push(await fetchAbi(apiUrl, addr, apiKey));
  }
  const merged = mergeAndDeduplicateAbis(abiArrays);
  const outPath = join(outDir, `${diamondName}Diamond.ts`);
  writeFileSync(outPath, emitAbiTs(merged), 'utf-8');
  console.log(`Wrote ${outPath} (${merged.length} ABI items).`);
}

function parseApiKey(): string {
  const arg = process.argv
    .slice(2)
    .find((a) => a.startsWith('--api-key=') || !a.startsWith('-'));
  if (!arg) {
    console.error(
      'Usage: pnpm tsx src/scripts/build-abis/build-diamond-abis.ts <ETHERSCAN_API_KEY>'
    );
    console.error(
      '   or: pnpm tsx src/scripts/build-abis/build-diamond-abis.ts --api-key=<ETHERSCAN_API_KEY>'
    );
    process.exit(1);
  }
  if (arg.startsWith('--api-key=')) return arg.slice('--api-key='.length);
  return arg;
}

async function main(): Promise<void> {
  const apiKey = parseApiKey();
  const config = loadConfig();
  const apiUrl = config.testnet.etherscanApiUrl;

  const rewardAddresses = collectAddresses(config, 'rewardManager');
  const stakingAddresses = collectAddresses(config, 'stakingManager');

  const outDir = join(__dirname, '..', '..', 'shared', 'utils', 'abis');

  await buildDiamondAbi(rewardAddresses, apiUrl, apiKey, outDir, 'RewardManager');
  await buildDiamondAbi(stakingAddresses, apiUrl, apiKey, outDir, 'StakingManager');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
