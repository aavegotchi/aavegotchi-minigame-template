import { useCallback, useEffect, useState } from 'react';
import {
  Layout, GotchiSelector, DetailsPanel, Modal,
} from 'components';
import { Link } from 'react-router-dom';
import globalStyles from 'theme/globalStyles.module.css';
import { getAavegotchisForUser } from 'web3/actions';
import { useServer } from 'server-store';
import { useWeb3 } from 'web3';
import {
  bounceAnimation,
  convertInlineSVGToBlobURL,
  getDefaultGotchi,
  removeBG,
} from 'helpers/aavegotchi';
import { Contract } from 'ethers';
import gotchiLoading from 'assets/gifs/loading.gif';
import { playSound } from 'helpers/hooks/useSound';
import { Web3Error } from 'types';
import styles from './styles.module.css';

const Home = () => {
  const {
    state: {
      usersGotchis, contract, address, selectedGotchi,
    },
    updateState,
  } = useWeb3();
  const { highscores } = useServer();
  const [error, setError] = useState<Web3Error>();
  const [showRulesModal, setShowRulesModal] = useState(false);

  const handleCustomiseSvg = (svg: string) => {
    const noBg = removeBG(svg);
    const animated = bounceAnimation(noBg);
    return convertInlineSVGToBlobURL(animated);
  };

  const useDefaultGotchi = () => {
    setError(undefined);
    updateState({ usersGotchis: [getDefaultGotchi()] });
  }

  /**
   * Updates global state with selected gotchi
   */
  const handleSelect = useCallback(
    (gotchi) => {
      updateState({ selectedGotchi: gotchi });
    },
    [updateState],
  );

  useEffect(() => {
    if (process.env.REACT_APP_OFFCHAIN) return useDefaultGotchi();

    const _fetchGotchis = async (contract: Contract, address: string) => {
      const res = await getAavegotchisForUser(contract, address);

      if (res.status === 200) {
        setError(undefined);
        updateState({ usersGotchis: res.data });
      } else {
        setError(res);
      }
    };

    if (contract && address) {
      _fetchGotchis(contract, address);
    }
  }, [contract, address, updateState]);

  if (error) {
    return (
      <Layout>
        <div className={globalStyles.container}>
          <div className={styles.errorContainer}>
            <h1>
              Error code:
              {error.status}
            </h1>
            <p>{error.error.message}</p>
            {/* Allows developers to build without the requirement of owning a gotchi */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={useDefaultGotchi}
                className={globalStyles.primaryButton}
              >
                Use Default Gotchi
              </button>
            )}
            {error.status === 403 && (
              <div>
                <p className={styles.secondaryErrorMessage}>
                  Don’t have an Aavegotchi? Visit the Baazaar to get one.
                </p>
                <a
                  href="https://aavegotchi.com/baazaar/portals-closed?sort=latest"
                  target="__blank"
                  className={globalStyles.primaryButton}
                >
                  Visit Bazaar
                </a>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Modal
        active={showRulesModal}
        handleClose={() => setShowRulesModal(false)}
      >
        <div className={styles.modalContent}>
          <h1>Minigame Template</h1>
          <p>
            Just a modal example. You can put your game rules in here.
          </p>
        </div>
      </Modal>
      <div className={globalStyles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.selectorContainer}>
            <GotchiSelector
              initialGotchi={selectedGotchi}
              gotchis={usersGotchis}
              selectGotchi={handleSelect}
            />
          </div>
          <div className={styles.gotchiContainer}>
            {selectedGotchi ? (
              <img
                src={handleCustomiseSvg(selectedGotchi.svg)}
                alt={`Selected ${selectedGotchi.name}`}
              />
            ) : (
              <img src={gotchiLoading} alt="Loading Aavegotchi" />
            )}
            <h1 className={styles.highscore}>
              Highscore:
              {' '}
              {highscores?.find((score) => score.tokenId === selectedGotchi?.id)
                ?.score || 0}
            </h1>
            <div className={styles.buttonContainer}>
              <Link
                to="/play"
                className={`${globalStyles.primaryButton} ${
                  !selectedGotchi ? globalStyles.disabledLink : ''
                }`}
                onClick={() => playSound('send')}
              >
                Start
              </Link>
              <button
                onClick={() => {
                  playSound('click');
                  setShowRulesModal(true);
                }}
                className={`${globalStyles.secondaryButton} ${globalStyles.circleButton}`}
              >
                ?
              </button>
            </div>
          </div>
          <div className={styles.detailsPanelContainer}>
            <DetailsPanel selectedGotchi={selectedGotchi} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
