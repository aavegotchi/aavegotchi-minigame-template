import { AavegotchiObject } from "types";
import { Web3Provider } from "@ethersproject/providers";

export interface State {
  address?: string;
  provider?: Web3Provider;
  usersAavegotchis?: Array<AavegotchiObject>;
  selectedAavegotchiId?: string;
  loading: boolean;
  error?: Error | unknown;
  networkId?: number;
}

export const initialState: State = {
  loading: false,
}