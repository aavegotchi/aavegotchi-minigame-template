import { AavegotchiContractObject, AavegotchiObject } from 'types';
import { Contract, BigNumber } from 'ethers';

type FetchAavegotchisRes = Promise<{status: 200, data: Array<AavegotchiObject>} | {status: 400, error: any}>

/**
 * Fetches all Aavegotchis for given address
 * @param {ethers.Contract} contract - Aavegotchi contract.
 * @param {string} address - Address of owners wallet.
 * @returns {Promise<FetchAavegotchisRes>} Promise object represents success status + corresponding data
 */
export const getAavegotchisForUser = async (contract: Contract, address: string): Promise<FetchAavegotchisRes> => {
  try {
    const gotchis = await contract?.allAavegotchisOfOwner(address) as Array<AavegotchiContractObject>;

    // Filter out portals
    const gotchisOnly = gotchis.filter(gotchi => gotchi.status.toString() === "3");

    if (gotchisOnly.length === 0) throw new Error('No gotchis found - Please make sure your wallet is connected');

    const gotchisWithSVGs = await _getAllAavegotchiSVGs(gotchisOnly || [], contract);
    return {
      status: 200,
      data: gotchisWithSVGs
    };
  } catch (error) {
    return {
      status: 400,
      error: error,
    };
  }
};

const _getAavegotchiSvg = async (tokenId: BigNumber, contract: Contract) => {
  const svg = await contract?.getAavegotchiSvg(tokenId) as string;
  return svg;
};

const _getAllAavegotchiSVGs = async (gotchis: Array<AavegotchiContractObject>, contract: Contract): Promise<Array<AavegotchiObject>> => {
  return Promise.all(
    gotchis.map(async (gotchi) => {
      const svg = await _getAavegotchiSvg(gotchi.tokenId, contract);
      return {
        ...gotchi,
        svg,
      };
    }),
  );
};