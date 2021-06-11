import React from 'react';
import { AavegotchiObject } from 'types';
import styles from './styles.module.css';

interface Props {
  selectedGotchi?: AavegotchiObject;
}

export const DetailsPanel = ({ selectedGotchi }: Props) => {
  const calculatePercentage = (number: number) => {
    if (number > 100) {
      return '100%';
    }
    if (number < 0) {
      return '0';
    }
    return `${number}%`;
  };

  const renderModifier = (name: string, percentage: string) => (
    <div className={styles.modifierRow}>
      <p>{name}</p>
      <div className={styles.modifierMeter}>
        <span
          className={styles.progress}
          style={{ width: percentage }}
        />
      </div>
    </div>
  );

  const renderTrait = (i: number) => {
    switch (i) {
      case 0:
        return (
          <>
            <div className={styles.traitRow}>
              <p>
                <span className={styles.emoji}>⚡️</span>
                {' '}
                Energy
              </p>
              <p>{selectedGotchi?.withSetsNumericTraits[0]}</p>
            </div>
            {renderModifier('Move speed', calculatePercentage(selectedGotchi?.withSetsNumericTraits[i] as number))}
          </>
        );
      case 1:
        return (
          <>
            <div className={styles.traitRow}>
              <p>
                <span className={styles.emoji}>👹</span>
                {' '}
                Aggression
              </p>
              <p>{selectedGotchi?.withSetsNumericTraits[1]}</p>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className={styles.traitRow}>
              <p>
                <span className={styles.emoji}>👻</span>
                {' '}
                Spookiness
              </p>
              <p>{selectedGotchi?.withSetsNumericTraits[2]}</p>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className={styles.traitRow}>
              <p>
                <span className={styles.emoji}>🧠</span>
                {' '}
                Brain size
              </p>
              <p>{selectedGotchi?.withSetsNumericTraits[3]}</p>
            </div>
          </>
        );
      default:
    }
  };

  return (
    <div className={styles.detailsPanel}>
      <h1>
        {selectedGotchi
          ? `${selectedGotchi?.name} (${selectedGotchi?.id})`
          : 'Fetching Aavegotchi...'}
      </h1>
      <hr />
      {selectedGotchi?.withSetsNumericTraits.map((_, i) => (
        <React.Fragment key={i}>
          {renderTrait(i)}
        </React.Fragment>
      ))}
    </div>
  );
};
