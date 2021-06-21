import { ethers } from 'ethers';
import { AavegotchiObject } from 'types';

export interface State {
  provider?: ethers.providers.Web3Provider,
  contract?: ethers.Contract,
  signer?: ethers.providers.JsonRpcSigner,
  address?: string,
  usersGotchis?: Array<AavegotchiObject>,
  selectedGotchi?: AavegotchiObject,
}

export const initialState = {};
