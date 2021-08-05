import React, {
  createContext, useContext, useReducer
} from 'react';
import { ethers } from 'ethers';
import { Action, reducer } from "./reducer";
import { initialState, State } from './initialState';
import { useSubgraph } from 'web3/actions';
import { AavegotchisOfOwner, getAllAavegotchisOfOwner } from 'web3/actions/queries';

export const Web3Context = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => null});

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Props {
  children: React.ReactNode;
}

const updateAavegotchis = async (dispatch: React.Dispatch<Action>, owner: string) => {
  try {
    const res = await useSubgraph<AavegotchisOfOwner>(getAllAavegotchisOfOwner(owner));
    dispatch({ type: "SET_USERS_AAVEGOTCHIS", usersAavegotchis: res.aavegotchis });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      error: err,
    })
  }
}

const connectToNetwork = async (dispatch: React.Dispatch<Action>, eth: any) => {
  if (process.env.REACT_APP_OFFCHAIN) return;

  dispatch({ type: "START_ASYNC" });
  try {
    await eth.enable();
    const provider = new ethers.providers.Web3Provider(eth);

    dispatch({ type: "SET_PROVIDER", provider });
    const { chainId } = await provider.getNetwork();
    
    dispatch({ type: "SET_NETWORK_ID", networkId: chainId });

    const address = await provider.getSigner().getAddress();
    dispatch({ type: "SET_ADDRESS", address });
    dispatch({ type: "END_ASYNC" });
  } catch (error) {
    dispatch({ type: "SET_ERROR", error });
  }
};

const Web3ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3 = () => useContext(Web3Context);

export default Web3ContextProvider;
export { useWeb3, connectToNetwork, updateAavegotchis };
