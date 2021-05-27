import { useEffect, useState } from 'react';
import { Layout, GotchiSelector, DetailsPanel } from 'components';
import globalStyles from 'theme/globalStyles.module.css';
import styles from './styles.module.css';
import { getAavegotchisForUser } from 'web3/actions';
import { useWeb3 } from 'web3';
import { bounceAnimation, convertInlineSVGToBlobURL, removeBG } from 'helpers/aavegotchi';
import { ethers } from 'ethers';
import { AavegotchiObject } from 'types';

const Home = () => {
  const { state: { usersGotchis, contract, address }, updateState } = useWeb3();
  const [ selectedGotchi, setSelectedGotchi ] = useState<AavegotchiObject>();

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

  const handleCustomiseSvg = (svg: string) => {
    const noBg = removeBG(svg);
    const animated = bounceAnimation(noBg);
    return convertInlineSVGToBlobURL(animated);
  }

  return (
    <Layout>
      <div className={globalStyles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.selectorContainer}>
            <GotchiSelector gotchis={usersGotchis} selectGotchi={setSelectedGotchi} />
          </div>
          <div className={styles.gotchiContainer}>
            {selectedGotchi && (
              <img
                src={handleCustomiseSvg(selectedGotchi.svg)}
                alt={`Selected ${selectedGotchi.name}`}
                className={styles.gotchi}
              />
            )}
            <button className={globalStyles.primaryButton}>Start</button>
          </div>
          <div>
            <DetailsPanel selectedGotchi={selectedGotchi} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home;