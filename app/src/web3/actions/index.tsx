import { request } from "graphql-request";
import { addresses } from "helpers/vars";
import diamondAbi from "../abi/diamond.json";
import { ethers } from 'ethers';

const coreURI =
  "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic";

export const useSubgraph = async <T extends unknown>(
  query: string,
  uri?: string
): Promise<T> => {
  try {
    const data = await request<T>(uri || coreURI, query);
    return data;
  } catch (err) {
    throw {
      status: 400,
      name: "Subgraph error",
      message: err.response.errors[0].message,
    };
  }
};

type DiamondCallMethods = {name: "getAavegotchiSvg", parameters: [string]}

export const useDiamondCall = async <R extends unknown>(
  provider: ethers.Signer | ethers.providers.Provider,
  method: DiamondCallMethods,
): Promise<R> => {
  const contract = new ethers.Contract(addresses.diamond, diamondAbi, provider);
  try {
    const { name, parameters } = method;
    const res = await contract[name](...parameters);
    return res;
  } catch (err) {
    throw { status: 400, name: "Diamond contract error", message: err.message, stack: err.stack };
  }
};
