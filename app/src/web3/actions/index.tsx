import { request } from "graphql-request";
import { addresses } from "helpers/vars";
import diamondAbi from "../abi/diamond.json";
import { ethers } from 'ethers';
import { Tuple } from "types";

const coreURI =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic";

export const useSubgraph = async <T extends unknown>(
  query: string,
  uri?: string
): Promise<T> => {
    return await request<T>(uri || coreURI, query);
};

type DiamondCallMethods =
  | {name: "currentHaunt", parameters?: undefined}
  | {name: "getAavegotchiSvg", parameters: [string]}
  | {name: "previewAavegotchi", parameters: [string, string, Tuple<number, 6>, Tuple<number, 16>]}

export const useDiamondCall = async <R extends unknown>(
  provider: ethers.Signer | ethers.providers.Provider,
  method: DiamondCallMethods,
): Promise<R> => {
  const contract = new ethers.Contract(addresses.diamond, diamondAbi, provider);
  const { name, parameters } = method;
  const res = await (parameters ? contract[name](...parameters) : contract[name]());
  return res;
};
