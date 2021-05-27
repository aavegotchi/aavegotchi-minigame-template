import { AavegotchiObject } from 'types';
import styles from './styles.module.css';

interface Props {
  selectedGotchi?: AavegotchiObject;
}

export const DetailsPanel = ({ selectedGotchi }: Props) => {

  if (!selectedGotchi) return <div></div>;

  return (
    <div className={styles.detailsPanel}>
      <h1>{selectedGotchi.name} ({selectedGotchi.tokenId.toString()})</h1>
      <hr />
      <div className={styles.traitRow}>
        <p><span className={styles.emoji}>⚡️</span> Energy</p>
        <p>{selectedGotchi.modifiedNumericTraits[0]}</p>
      </div>
      <div className={styles.traitRow}>
        <p><span className={styles.emoji}>👹</span> Aggression</p>
        <p>{selectedGotchi.modifiedNumericTraits[1]}</p>
      </div>
      <div className={styles.traitRow}>
        <p><span className={styles.emoji}>👻</span> Spookiness</p>
        <p>{selectedGotchi.modifiedNumericTraits[2]}</p>
      </div>
      <div className={styles.traitRow}>
        <p><span className={styles.emoji}>🧠</span> Brain size</p>
        <p>{selectedGotchi.modifiedNumericTraits[3]}</p>
      </div>
    </div>
  )
};