import { useState, useEffect } from 'react';
import { HighScore } from 'types';
import { playSound } from 'helpers/hooks/useSound';
import styles from './styles.module.css';

interface Props {
  highscores?: Array<HighScore>;
  ownedGotchis?: Array<string>;
}

interface DisplayedScore extends HighScore {
  position: number;
  exp: number;
}

export const Leaderboard = ({ highscores, ownedGotchis }: Props) => {
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ onlyMine, setOnlyMine ] = useState(false);
  const [ sortedScores, setSortedScores ] = useState<Array<DisplayedScore>>([]);
  const [ displayedScores, setDisplayedScores ] = useState<Array<DisplayedScore>>([]);

  const pageTotal = 50;
  
  const getExp = (score: number, position: number) => {
    if (position <= 50) {
      return 15;
    }
    if (position <= 500) {
      return 10;
    }
    if (score > 5000) {
      return 5;
    }
    return 0;
  }

  useEffect(() => {
    if (onlyMine && ownedGotchis) {
      setCurrentPage(0);
      const scores = [...sortedScores].filter(score => ownedGotchis.includes(score.tokenId));
      setDisplayedScores(scores);
    } else {
      setDisplayedScores(sortedScores);
    }
  }, [onlyMine, sortedScores, ownedGotchis]);

  useEffect(() => {
    if (highscores) {
      const hs = highscores.map((score, i) => {
        const position = i + 1;
        return {
          ...score,
          position: position,
          exp: getExp(score.score, position),
        }
      })
      setSortedScores(hs);
    }
  }, [highscores])

  return (
    <div className={styles.leaderboard}>
      {
        ownedGotchis && ownedGotchis.length > 0 && (
          <button
            className={styles.toggle}
            onClick={() => {
              playSound("click");
              setOnlyMine(prevState => !prevState)
            }}
          >
            {onlyMine ? "View all" : "Only mine"}
          </button>
        )
      }
      <div className={`${styles.row} ${styles.headerRow}`}>
        <div className={styles.cell}>Aavegotchi</div>
        <div className={styles.cell}>Score</div>
        <div className={styles.cell}>Rewards</div>
      </div>
      {displayedScores?.slice(currentPage * pageTotal, currentPage * pageTotal + pageTotal).map(item => {
        return (
          <div
            className={`
              ${styles.row}
              ${ownedGotchis?.includes(item.tokenId) ? styles.owned : ''}
            `}
            key={item.tokenId}
          >
            <div className={styles.cell}>{item.position}. {item.name} [{item.tokenId}]</div>
            <div className={styles.cell}>{item.score}</div>
            <div className={styles.cell}>{item.exp} EXP</div>
          </div>
        )
      })}
      {displayedScores.length > pageTotal &&
        <div className={styles.pageSelector}>
          {
            Array(Math.ceil(displayedScores.length / pageTotal)).fill(null).map((_, i) => {
              return (
                <div
                  className={`${styles.selector} ${i === currentPage ? `${styles.selected}` : ''}`}
                  onClick={() => {
                    playSound("click");
                    setCurrentPage(i)
                  }}
                >
                  {i + 1}
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}