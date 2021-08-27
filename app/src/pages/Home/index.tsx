import { useCallback, useEffect, useState } from "react";
import {
  Layout,
  GotchiSelector,
  DetailsPanel,
  Modal,
  GotchiSVG,
} from "components";
import { Link } from "react-router-dom";
import globalStyles from "theme/globalStyles.module.css";
import { useServer } from "server-store";
import { useDiamondCall } from "web3/actions";
import { useWeb3, updateAavegotchis } from "web3/context";
import { getDefaultGotchi, getPreviewGotchi } from "helpers/aavegotchi";
import gotchiLoading from "assets/gifs/loading.gif";
import { playSound } from "helpers/hooks/useSound";
import styles from "./styles.module.css";

const Home = () => {
  const {
    state: {
      usersAavegotchis,
      address,
      selectedAavegotchiId,
      networkId,
      provider,
    },
    dispatch,
  } = useWeb3();
  const { highscores } = useServer();
  const [showRulesModal, setShowRulesModal] = useState(false);

  const useDefaultGotchi = () => {
    dispatch({
      type: "SET_USERS_AAVEGOTCHIS",
      usersAavegotchis: [getDefaultGotchi()],
    });
  };

  const usePreviewGotchis = async () => {
    if (provider) {
      try {
        const gotchi1 = await getPreviewGotchi(provider, {
          name: "GotchiDev",
          id: "OG",
          collateral: "aWETH",
          wearables: [117, 55, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          numericTraits: [50, 50, 50, 50, 40, 40]
        });
        const gotchi2 = await getPreviewGotchi(provider, {
          name: "H4cker",
          id: "l33T",
          collateral: "aUSDT",
          wearables: [211, 212, 213, 214, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          numericTraits: [100, 100, 100, 100, 100, 100]
        });
        dispatch({
          type: "SET_USERS_AAVEGOTCHIS",
            usersAavegotchis: [gotchi1, gotchi2],
        }); 
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          error: err
        })
      }
    }
  };

  /**
   * Updates global state with selected gotchi
   */
  const handleSelect = useCallback(
    (gotchiId: string) => {
      dispatch({
        type: "SET_SELECTED_AAVEGOTCHI",
        selectedAavegotchiId: gotchiId,
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (process.env.REACT_APP_OFFCHAIN) return useDefaultGotchi();

    if (address) {
      const prevGotchis = usersAavegotchis || [];
      if (
        prevGotchis.find(
          (gotchi) => gotchi.owner.id.toLowerCase() === address.toLowerCase()
        )
      )
        return;

      dispatch({
        type: "SET_SELECTED_AAVEGOTCHI",
        selectedAavegotchiId: undefined,
      });
      updateAavegotchis(dispatch, address);
    }
  }, [address]);

  if (networkId !== 137 && !process.env.REACT_APP_OFFCHAIN) {
    return (
      <Layout>
        <div className={globalStyles.container}>
          <div className={styles.errorContainer}>
            <h1>{!networkId ? "Not connected" : "Wrong network"}</h1>
            <p className={styles.secondaryErrorMessage}>
              Please connect to the Polygon network.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (usersAavegotchis && usersAavegotchis?.length <= 0) {
    return (
      <Layout>
        <div className={globalStyles.container}>
          <div className={styles.errorContainer}>
            <p>
              No Aavegotchis found for address - Please make sure the correct
              wallet is connected.
            </p>
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
            {/* Allows developers to build without the requirement of owning a gotchi */}
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={usePreviewGotchis}
                className={globalStyles.primaryButton}
              >
                Use Preview Gotchis
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {showRulesModal && (
        <Modal onHandleClose={() => setShowRulesModal(false)}>
          <div className={styles.modalContent}>
            <h1>Minigame Template</h1>
            <p>Just a modal example. You can put your game rules in here.</p>
          </div>
        </Modal>
      )}
      <div className={globalStyles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.selectorContainer}>
            <GotchiSelector
              initialGotchiId={selectedAavegotchiId}
              gotchis={usersAavegotchis}
              selectGotchi={handleSelect}
            />
          </div>
          <div className={styles.gotchiContainer}>
            {selectedAavegotchiId ? (
              <GotchiSVG
                tokenId={selectedAavegotchiId}
                options={{ animate: true, removeBg: true }}
              />
            ) : (
              <img src={gotchiLoading} alt="Loading Aavegotchi" />
            )}
            <h1 className={styles.highscore}>
              Highscore:{" "}
              {(usersAavegotchis &&
                highscores?.find(
                  (score) => score.tokenId === selectedAavegotchiId
                )?.score) ||
                0}
            </h1>
            <div className={styles.buttonContainer}>
              <Link
                to="/play"
                className={`${globalStyles.primaryButton} ${
                  !usersAavegotchis ? globalStyles.disabledLink : ""
                }`}
                onClick={() => playSound("send")}
              >
                Start
              </Link>
              <button
                onClick={() => {
                  playSound("click");
                  setShowRulesModal(true);
                }}
                className={`${globalStyles.secondaryButton} ${globalStyles.circleButton}`}
              >
                ?
              </button>
            </div>
          </div>
          <div className={styles.detailsPanelContainer}>
            <DetailsPanel
              selectedGotchi={usersAavegotchis?.find(
                (gotchi) => gotchi.id === selectedAavegotchiId
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
