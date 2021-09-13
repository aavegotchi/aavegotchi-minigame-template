import { ErrorModal, Header } from 'components';
import { useEffect } from 'react';
import { useWeb3, setProvider, setNetworkDetails } from 'web3/context';
import { Web3Provider } from "@ethersproject/providers";
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { state: {error, provider} , dispatch } = useWeb3();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    })
  };

  const isMetaMaskConnected = async (w3Provider: Web3Provider) => {
    const accounts = await w3Provider.listAccounts();
    return accounts.length > 0;
  }
  
  const handleConnection = async (eth: any) => {
    try {
      const w3Provider = await setProvider(dispatch, eth);
      if (!w3Provider) throw "Provider undefined";

      const isConnected = await isMetaMaskConnected(w3Provider)
      if (isConnected) {
        setNetworkDetails(dispatch, w3Provider);
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (window.ethereum && !process.env.REACT_APP_OFFCHAIN) {
      if (!provider) {
        handleConnection(window.ethereum);
      }
      window.ethereum.on('accountsChanged', (accounts: Array<string>) => {
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0]
        })
      })
  
      window.ethereum.on('chainChanged', (chainId: string) => {
        dispatch({
          type: "SET_NETWORK_ID",
          networkId: Number(chainId)
        })
      })
    }
  }, [])

  return (
    <div className={styles.container}>
      {error && <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />}
      <Header />
      {children}
    </div>
  )
};
