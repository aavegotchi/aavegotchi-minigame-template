import { AavegotchiObject } from 'types';
import { ChevronUp, ChevronDown, click } from 'assets';
import { playSound } from 'helpers/hooks/useSound';
import globalStyles from 'theme/globalStyles.module.css';
import { useEffect, useState, useCallback } from 'react';
import gotchiLoading from 'assets/gifs/loading.gif';
import useWindowWidth from 'helpers/hooks/windowSize';
import styles from './styles.module.css';
import { GotchiSVG } from 'components/GotchiSVG';
import { SearchToggle } from 'components/SearchToggle';
import { SortToggle } from 'components/SortToggle';

const sortOptions = [
  {
    name: "BRS",
    value: "withSetsRarityScore"
  },
  {
    name: "TokenId",
    value: "gotchiId"
  },
  {
    name: "Name",
    value: "name"
  }
]

interface Props {
  /**
   * Array of gotchis to select from
   */
  gotchis?: Array<AavegotchiObject>;
  /**
   * Gotchi to initially select
   */
  initialGotchiIndex?: number;
  /**
   * Maximum gotchis visible in selector per scroll
   */
   maxVisible?: number;
  /**
   * Callback function that triggers on gotchi select
   * @param {number} gotchiIndex - Aavegotchi index selected
   */
  selectGotchi: (gotchiIndex: number) => void;
}

export const GotchiSelector = ({
  gotchis, selectGotchi, initialGotchiIndex = 0, maxVisible = 3,
}: Props) => {
  const [selected, setSelected] = useState<string>();
  const [currentIteration, setCurrentIteration] = useState(0);
  const [initGotchis, setInitGotchis] = useState<Array<AavegotchiObject>>();
  const [displayedGotchis, setDisplayedGotchis] = useState<Array<AavegotchiObject>>();
  /**
   * Maximum amount of times you can scroll down
   */
  const [ maxIterations, setMaxIterations ] = useState(gotchis ? gotchis.length - maxVisible < 0 ? 0 : gotchis.length - maxVisible : 0);

  const [searchInput, setSearchInput] = useState<string>("");
  const width = useWindowWidth();
  const isMobile = width < 768;

  const handleSelect = useCallback((id: string) => {
    if (id === selected) return;

    setSelected(id);
    if (gotchis) {
      const index = initGotchis?.findIndex(gotchi => gotchi.id === id)
      selectGotchi(index || 0);
    }
  }, [gotchis, selectGotchi, selected]);

  const handleScroll = (i: number) => {
    const nextIteration = currentIteration + i;
    if (nextIteration > maxIterations || nextIteration < 0) return;

    playSound(click);
    setCurrentIteration(nextIteration);
  };

  const isSameGotchis = (newGotchis: Array<AavegotchiObject>, prevGotchis?: Array<AavegotchiObject>) => {
    if (!prevGotchis) return false;
    return !newGotchis.find((gotchi, i) => gotchi.id !== prevGotchis[i].id);
  }

  // Handle search
  useEffect(() => {
    if (initGotchis && initGotchis?.length > 0) {
      const gotchis = [...initGotchis];
      const searchMatches = gotchis.filter(gotchi => gotchi.id.includes(searchInput) || gotchi.name.toLowerCase().includes(searchInput.toLowerCase()));
      setCurrentIteration(0);

      setMaxIterations(searchMatches.length - maxVisible < 0 ? 0 : searchMatches.length - maxVisible);

      setDisplayedGotchis(searchMatches);
    }
  }, [searchInput, initGotchis])

  useEffect(() => {
    if (gotchis) {
      if (isSameGotchis(gotchis, initGotchis)) return;
      setInitGotchis(gotchis)
      const id = gotchis[initialGotchiIndex].id
      handleSelect(id);
      const selectorIteration = initialGotchiIndex + 1 - maxVisible < 0 ? 0 : initialGotchiIndex + 1 - maxVisible;
      setCurrentIteration(selectorIteration);
      setInitGotchis(gotchis)
    }
  }, [gotchis, initialGotchiIndex, handleSelect, maxVisible]);

  return (
    <div className={styles.gotchiSelector}>
      <div className={styles.selectorContainer}>
        <ChevronUp
          width={24}
          className={`${styles.chevron} ${styles.up} ${currentIteration === 0 ? styles.disabled : styles.enabled}`}
          onClick={() => handleScroll(-1)}
        />
        <div className={styles.selectorWrapper} style={isMobile ? { width: `${maxVisible * 7.2 + 1.6}rem` } : { height: `${maxVisible * 8.8}rem` }}>
          <div className={styles.selector} style={isMobile ? { transform: `translateX(-${currentIteration * 8}rem)` } : { transform: `translateY(-${currentIteration * (9.6)}rem)` }}>
            {
              gotchis === undefined
                ? new Array(3).fill('').map((_, i) => (
                  <div className={styles.loadingContainer} key={i}>
                    <img src={gotchiLoading} alt={`Loading gotchi ${i}`} />
                  </div>
                ))
                : displayedGotchis?.slice(0, 6 + 3 * currentIteration).map((gotchi, i) => {
                  const isSelected = selected === gotchi.id;
                  
                  return (
                    <div
                      className={`${styles.gotchiContainer} ${isSelected ? `${styles.selected} ${globalStyles.glow}` : ''}`}
                      key={i}
                      onClick={() => {
                        playSound(click);
                        handleSelect(gotchi.id);
                      }}
                    >
                      <GotchiSVG tokenId={gotchi.id} />
                    </div>
                  );
                })
            }
          </div>
        </div>
        <ChevronDown
          width={24}
          className={`${styles.chevron} ${styles.down} ${currentIteration === maxIterations ? styles.disabled : styles.enabled}`}
          onClick={() => handleScroll(1)}
        />
      </div>
      <div className={styles.filterOptions}>
        <SearchToggle placeholder="Token ID or Name" onChange={setSearchInput} />
        <SortToggle options={sortOptions} />
      </div>
    </div>
  );
};
