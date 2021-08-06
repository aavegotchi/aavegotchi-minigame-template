import { useCallback, useEffect, useState } from 'react';
import {
  Layout, GotchiSelector, DetailsPanel, Modal, GotchiSVG,
} from 'components';
import { Link } from 'react-router-dom';
import globalStyles from 'theme/globalStyles.module.css';
import { useServer } from 'server-store';
import { useWeb3, updateAavegotchis } from 'web3/context';
import {
  getDefaultGotchi
} from 'helpers/aavegotchi';
import gotchiLoading from 'assets/gifs/loading.gif';
import { playSound } from 'helpers/hooks/useSound';
import styles from './styles.module.css';

const Home = () => {
  const {
    state: {
      usersAavegotchis, address, selectedAavegotchiIndex,
    },
    dispatch,
  } = useWeb3();
  const { highscores } = useServer();
  const [showRulesModal, setShowRulesModal] = useState(false);

  const useDefaultGotchi = () => {
    dispatch({ type: "SET_USERS_AAVEGOTCHIS", usersAavegotchis: [getDefaultGotchi()]});
  }

  /**
   * Updates global state with selected gotchi
   */
  const handleSelect = useCallback(
    (gotchiIndex: number) => {
      dispatch({ type: "SET_SELECTED_AAVEGOTCHI", selectedAavegotchiIndex: gotchiIndex });
    },
    [dispatch],
  );

  useEffect(() => {
    if (process.env.REACT_APP_OFFCHAIN) return useDefaultGotchi();

    if (address) {
      updateAavegotchis(dispatch, address)
    }
  }, [address]);

  // if (error) {
  //   return (
  //     <Layout>
  //       <div className={globalStyles.container}>
  //         <div className={styles.errorContainer}>
  //           <h1>
  //             Error code:
  //             {error.status}
  //           </h1>
  //           <p>{error.error.message}</p>
  //           {/* Allows developers to build without the requirement of owning a gotchi */}
  //           {process.env.NODE_ENV === 'development' && (
  //             <button
  //               onClick={useDefaultGotchi}
  //               className={globalStyles.primaryButton}
  //             >
  //               Use Default Gotchi
  //             </button>
  //           )}
  //           {error.status === 403 && (
  //             <div>
  //               <p className={styles.secondaryErrorMessage}>
  //                 Don’t have an Aavegotchi? Visit the Baazaar to get one.
  //               </p>
  //               <a
  //                 href="https://aavegotchi.com/baazaar/portals-closed?sort=latest"
  //                 target="__blank"
  //                 className={globalStyles.primaryButton}
  //               >
  //                 Visit Bazaar
  //               </a>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      {showRulesModal && (
        <Modal onHandleClose={() => setShowRulesModal(false)}>
          <div className={styles.modalContent}>
            <h1>Minigame Template</h1>
            <p>
              Just a modal example. You can put your game rules in here.
            </p>
          </div>
        </Modal>
      )}
      <div className={globalStyles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.selectorContainer}>
            <GotchiSelector
              initialGotchiIndex={selectedAavegotchiIndex}
              gotchis={usersAavegotchis}
              selectGotchi={handleSelect}
            />
          </div>
          <div className={styles.gotchiContainer}>
            {usersAavegotchis ? (
              <GotchiSVG tokenId={usersAavegotchis[selectedAavegotchiIndex].id} options={{ animate: true, removeBg: true }}  />
            ) : (
              <img src={gotchiLoading} alt="Loading Aavegotchi" />
            )}
            <h1 className={styles.highscore}>
              Highscore:
              {' '}
              {usersAavegotchis && highscores?.find((score) => score.tokenId === usersAavegotchis[selectedAavegotchiIndex]?.id)
                ?.score || 0}
            </h1>
            <div className={styles.buttonContainer}>
              <Link
                to="/play"
                className={`${globalStyles.primaryButton} ${
                  (!usersAavegotchis) ? globalStyles.disabledLink : ''
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
            <DetailsPanel selectedGotchi={usersAavegotchis ? usersAavegotchis[selectedAavegotchiIndex] : undefined} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
