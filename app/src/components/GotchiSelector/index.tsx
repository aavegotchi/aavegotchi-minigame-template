import { AavegotchiObject } from "types";
import { ChevronUp, ChevronDown, click } from "assets";
import { playSound } from "helpers/hooks/useSound";
import globalStyles from "theme/globalStyles.module.css";
import { useEffect, useState, useCallback } from "react";
import gotchiLoading from "assets/gifs/loading.gif";
import useWindowWidth from "helpers/hooks/windowSize";
import styles from "./styles.module.css";
import { GotchiSVG } from "components/GotchiSVG";
import { SearchToggle } from "components/SearchToggle";
import { SortToggle, Sort } from "components/SortToggle";

const sortOptions = [
  {
    name: "BRS",
    value: "withSetsRarityScore",
  },
  {
    name: "TokenId",
    value: "gotchiId",
  },
  {
    name: "Name",
    value: "name",
  },
];

interface Props {
  /**
   * Array of gotchis to select from
   */
  gotchis?: Array<AavegotchiObject>;
  /**
   * Gotchi to initially select
   */
  initialGotchiId?: string;
  /**
   * Maximum gotchis visible in selector per scroll
   */
  maxVisible?: number;
  /**
   * Callback function that triggers on gotchi select
   * @param {number} gotchiIndex - Aavegotchi index selected
   */
  selectGotchi: (gotchiId: string) => void;
}

export const GotchiSelector = ({
  gotchis,
  selectGotchi,
  initialGotchiId,
  maxVisible = 3,
}: Props) => {
  const [selected, setSelected] = useState<string>();
  const [currentIteration, setCurrentIteration] = useState(0);
  const [initGotchis, setInitGotchis] = useState<Array<AavegotchiObject>>();
  const [displayedGotchis, setDisplayedGotchis] =
    useState<Array<AavegotchiObject>>();
  /**
   * Maximum amount of times you can scroll down
   */
  const [maxIterations, setMaxIterations] = useState(
    gotchis
      ? gotchis.length - maxVisible < 0
        ? 0
        : gotchis.length - maxVisible
      : 0
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [sort, setSort] = useState<Sort>({
    val: "withSetsRarityScore",
    dir: "desc",
  });
  const [activeToggle, setActiveToggle] = useState<"search" | "sort" | undefined>();

  const width = useWindowWidth();
  const isMobile = width < 768;

  const handleSelect = useCallback(
    (id: string) => {
      if (id === selected) return;

      setSelected(id);
      selectGotchi(id);
    },
    [gotchis, selectGotchi, selected]
  );

  const handleScroll = (i: number) => {
    const nextIteration = currentIteration + i;
    if (nextIteration > maxIterations || nextIteration < 0) return;

    playSound(click);
    setCurrentIteration(nextIteration);
  };

  const isSameGotchis = (
    newGotchis: Array<AavegotchiObject>,
    prevGotchis?: Array<AavegotchiObject>
  ) => {
    if (!prevGotchis) return false;
    return !newGotchis.find((gotchi, i) => gotchi.id !== prevGotchis[i].id);
  };

  const compareFunction = (
    a: AavegotchiObject,
    b: AavegotchiObject,
    options: Sort
  ) => {
    const { val, dir } = options;

    switch (val) {
      case "withSetsRarityScore":
        return (
          (dir === "asc" ? 1 : -1) *
          (a.withSetsRarityScore - b.withSetsRarityScore)
        );
      case "name":
        return (dir === "asc" ? 1 : -1) * (a.name < b.name ? -1 : 1);
      case "gotchiId":
        return (dir === "asc" ? 1 : -1) * (a.id < b.id ? -1 : 1);
      default:
        return 0;
    }
  };

  // Handle search & sort
  useEffect(() => {
    if (initGotchis && initGotchis?.length > 0) {
      const gotchis = [...initGotchis];
      const searchMatches = gotchis.filter(
        (gotchi) =>
          gotchi.id.includes(searchInput) ||
          gotchi.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      const sortedMatches = searchMatches.sort((a, b) =>
        compareFunction(a, b, sort)
      );
      setCurrentIteration(0);
      setMaxIterations(
        searchMatches.length - maxVisible < 0
          ? 0
          : searchMatches.length - maxVisible
      );
      setDisplayedGotchis(sortedMatches);
    }
  }, [searchInput, initGotchis, sort, maxVisible]);

  useEffect(() => {
    if (gotchis) {
      if (isSameGotchis(gotchis, initGotchis)) return;
      setInitGotchis(gotchis);
      handleSelect(initialGotchiId || gotchis[0].id);
    }
  }, [gotchis, initialGotchiId, handleSelect]);

  return (
    <div className={styles.gotchiSelector}>
      <div className={styles.filterOptions}>
        <SearchToggle
          onToggle={() => activeToggle !== "search" ? setActiveToggle("search") :  setActiveToggle(undefined)}
          activeOverride={isMobile ? activeToggle === "search" : undefined}
          placeholder="Token ID or Name"
          onChange={setSearchInput}
        />
        <SortToggle
          onToggle={() => activeToggle !== "sort" ? setActiveToggle("sort") :  setActiveToggle(undefined)}
          activeOverride={isMobile ? activeToggle === "sort" : undefined}
          options={sortOptions}
          onSelect={setSort} selected={sort}
        />
      </div>
      <div className={styles.selectorContainer}>
        <ChevronUp
          width={24}
          className={`${styles.chevron} ${styles.up} ${
            currentIteration === 0 ? styles.disabled : styles.enabled
          }`}
          onClick={() => handleScroll(-1)}
        />
        <div
          className={styles.selectorWrapper}
          style={
            isMobile
              ? { width: `${maxVisible * 7.2 + 1.6}rem` }
              : { height: `${maxVisible * 8.8}rem` }
          }
        >
          <div
            className={styles.selector}
            style={
              isMobile
                ? { transform: `translateX(-${currentIteration * 8}rem)` }
                : { transform: `translateY(-${currentIteration * 9.6}rem)` }
            }
          >
            {gotchis === undefined
              ? new Array(3).fill("").map((_, i) => (
                  <div className={styles.loadingContainer} key={i}>
                    <img src={gotchiLoading} alt={`Loading gotchi ${i}`} />
                  </div>
                ))
              : displayedGotchis?.map((gotchi, i) => {
                  const isSelected = selected === gotchi.id;
                  const loadIn = i < maxVisible + currentIteration;

                  return (
                    <div
                      className={`${styles.gotchiContainer} ${
                        isSelected
                          ? `${styles.selected} ${globalStyles.glow}`
                          : ""
                      }`}
                      key={i}
                      onClick={() => {
                        playSound(click);
                        handleSelect(gotchi.id);
                      }}
                    >
                      <GotchiSVG tokenId={gotchi.id} lazyloadIn={loadIn} />
                    </div>
                  );
                })}
          </div>
        </div>
        <ChevronDown
          width={24}
          className={`${styles.chevron} ${styles.down} ${
            currentIteration === maxIterations
              ? styles.disabled
              : styles.enabled
          }`}
          onClick={() => handleScroll(1)}
        />
      </div>
    </div>
  );
};
