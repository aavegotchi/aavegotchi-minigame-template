import { AavegotchiObject } from 'types';
import { ChevronUp, ChevronDown } from 'assets/icons';
import { Click } from 'assets/sounds';
import { convertInlineSVGToBlobURL } from 'helpers/aavegotchi';
import styles from './styles.module.css';
import globalStyles from 'theme/globalStyles.module.css';
import { useEffect, useState, useCallback } from 'react';
import gotchiLoading from 'assets/gifs/loading.gif';

interface Props {
  /**
   * Array of gotchis to select from
   */
  gotchis?: Array<AavegotchiObject>;
  /**
   * Gotchi to initially select
   */
  initialGotchi?: AavegotchiObject;
  /**
   * Callback function that triggers on gotchi select
   */
  selectGotchi: (gotchi: AavegotchiObject) => void;
}

export const GotchiSelector = ({ gotchis, selectGotchi, initialGotchi }: Props) => {
  const [selected, setSelected] = useState<number>();

  const handleSelect = useCallback((index: number) => {
    if (index === selected) return;
  
    setSelected(index);
    if (gotchis) {
      selectGotchi(gotchis[index]);
    }
  }, [gotchis, selectGotchi, selected])

  useEffect(() => {
    if (gotchis) {
      const index = initialGotchi ? gotchis.findIndex(gotchi => gotchi.tokenId.eq(initialGotchi.tokenId)) || 0 : 0;
      handleSelect(index);
    }
  }, [gotchis, initialGotchi, handleSelect]);

  return (
    <div className={styles.selectorContainer}>
      <ChevronUp width={24} className={`${styles.chevron} ${styles.up}`} />
      {
        gotchis === undefined
          ? new Array(3).fill('').map((_, i) => {
              return (
                <div className={styles.loadingContainer} key={i}>
                  <img src={gotchiLoading} alt={`Loading gotchi ${i}`} />
                </div>
              )
            })
          : gotchis?.map((gotchi, i) => {
          const isSelected = selected === i;
          return(
            <div
              className={`${styles.gotchiContainer} ${isSelected ? `${styles.selected} ${globalStyles.glow}` : ''}`}
              key={i}
              onClick={() => {
                Click.play();
                handleSelect(i);
              }}
            >
              <img src={convertInlineSVGToBlobURL(gotchi.svg)} alt={gotchi.name} />
            </div>
          )
        })
      }
      <ChevronDown width={24} className={`${styles.chevron} ${styles.down}`} />
    </div>
  )
}