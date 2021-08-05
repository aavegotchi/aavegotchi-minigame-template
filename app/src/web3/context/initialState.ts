import { AavegotchiObject } from "types";
import { Web3Provider } from "@ethersproject/providers";

export interface State {
  address?: string;
  provider?: Web3Provider;
  usersAavegotchis?: Array<AavegotchiObject>;
  selectedAavegotchiIndex: number;
  loading: boolean;
  error?: Error;
  networkId?: number;
}

export const initialState: State = {
  loading: false,
  selectedAavegotchiIndex: 0,
}