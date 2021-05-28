import { AavegotchiObject } from 'types';
import { ChevronUp, ChevronDown } from 'assets/icons';
import { Click } from 'assets/sounds';
import { convertInlineSVGToBlobURL } from 'helpers/aavegotchi';
import styles from './styles.module.css';
import globalStyles from 'theme/globalStyles.module.css';
import { useEffect, useState } from 'react';

interface Props {
  gotchis?: Array<AavegotchiObject>;
  selectGotchi: (gotchi: AavegotchiObject) => void;
}

export const GotchiSelector = ({ gotchis, selectGotchi }: Props) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (gotchis) {
      selectGotchi(gotchis[selected]);
    }
  }, [selected, gotchis])

  return (
    <div className={styles.selectorContainer}>
      <ChevronUp width={24} className={`${styles.chevron} ${styles.up}`} />
      {
        gotchis === undefined ? <div>Loading</div> : gotchis?.map((gotchi, i) => {
          const isSelected = selected === i;
          return(
            <div
              className={`${styles.gotchiContainer} ${isSelected ? `${styles.selected} ${globalStyles.glow}` : ''}`}
              key={i}
              onClick={() => {
                Click.play();
                setSelected(i)
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