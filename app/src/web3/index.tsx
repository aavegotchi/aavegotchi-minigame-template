import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { ethers } from 'ethers';
import diamondAbi from './abi/diamond.json';
import { initialState, State } from './initialState';

const aavegotchiAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

export const Web3Context = createContext<{
  state: State,
  updateState:(value: State) => void,
  connectToNetwork: () => Promise<void>,
    }>({
      state: initialState,
      updateState: () => null,
      connectToNetwork: async () => { await window.ethereum.enable(); },
    });

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Props {
  children: React.ReactNode;
}

export const Web3Provider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [state, setState] = useState<State>({});

  const updateState = useCallback((updateState: State) => {
    const newState = { ...updateState };
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  }, []);

  const connectToNetwork = async () => {
    if (process.env.REACT_APP_OFFCHAIN) return;

    try {
      await window.ethereum.enable();
      setIsConnected(true);
    } catch (error) {
      console.log('Error connecting to Ethereum: ', error);
    }
  };

  useEffect(() => {
    const _setAddress = async (rpcSigner: ethers.providers.JsonRpcSigner) => {
      const res = await rpcSigner.getAddress();
      updateState({ address: res });
    };

    if (window.ethereum && isConnected) {
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        console.log('Account changed');
        updateState({ address: accounts[0] });
      });

      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      const newContract = new ethers.Contract(aavegotchiAddress, diamondAbi, newProvider);
      const newSigner = newProvider.getSigner();

      const newState: State = { provider: newProvider, contract: newContract, signer: newSigner };
      updateState(newState);
      _setAddress(newSigner);
    } else {
      connectToNetwork();
    }
  }, [isConnected, updateState]);

  return (
    <Web3Context.Provider value={{
      state,
      updateState,
      connectToNetwork,
    }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
