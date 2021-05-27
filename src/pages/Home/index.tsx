import { useEffect } from 'react';
import { Layout, GotchiSelector } from 'components';
import globalStyles from 'theme/globalStyles.module.css';
import styles from './styles.module.css';
import { getAavegotchisForUser } from 'web3/actions';
import { useWeb3 } from 'web3';
import { ethers } from 'ethers';

const Home = () => {
  const { state: { usersGotchis, contract, address }, updateState } = useWeb3();

  useEffect(() => {
    const _fetchGotchis = async (contract: ethers.Contract, address: string) => {
      const res = await getAavegotchisForUser(contract, address);
      if (res.status === 200) {
        updateState({ usersGotchis: res.data });
      } else {
        console.log(res.error);
      }
    }

    if (!usersGotchis && contract && address) {
      _fetchGotchis(contract, address);
    }
  }, [usersGotchis, contract, address, updateState]);

  return (
    <Layout>
      <div className={globalStyles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.selectorContainer}>
            <GotchiSelector gotchis={usersGotchis} selectGotchi={(gotchi) => null} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;