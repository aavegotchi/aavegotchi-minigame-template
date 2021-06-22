import { useState, useEffect } from "react";
import { HighScore } from "types";
import { playSound } from "helpers/hooks/useSound";
import styles from "./styles.module.css";

interface Props {
  highscores?: Array<HighScore>;
  ownedGotchis?: Array<string>;
  competition?: {
    endDate: Date;
    rewards: (position: number, score?: number) => React.ReactNode;
  };
}

interface DisplayedScore extends HighScore {
  position: number;
  reward?: React.ReactNode;
}

export const Leaderboard = ({
  highscores,
  ownedGotchis,
  competition,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [onlyMine, setOnlyMine] = useState(false);
  const [sortedScores, setSortedScores] = useState<Array<DisplayedScore>>([]);
  const [displayedScores, setDisplayedScores] = useState<Array<DisplayedScore>>(
    []
  );
  const [timer, setTimer] = useState<string>();

  const pageTotal = 50;

  useEffect(() => {
    if (onlyMine && ownedGotchis) {
      setCurrentPage(0);
      const scores = [...sortedScores].filter((score) =>
        ownedGotchis.includes(score.tokenId)
      );
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
          position,
          reward: competition
            ? competition.rewards(position, score.score)
            : undefined,
        };
      });
      setSortedScores(hs);
    }

    if (competition) {
      const countdown = setInterval(() => {
        const now = new Date().getTime();
        const timeUntil = competition.endDate.getTime() - now;

        const days = Math.floor(timeUntil / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeUntil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeUntil % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeUntil % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimer(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimer(`${hours}h ${minutes}m`);
        } else if (timeUntil > 0) {
          setTimer(`${minutes}m ${seconds}s`);
        } else {
          setTimer(`FINISHED`);
        }
      });

      return () => clearInterval(countdown);
    }
  }, [highscores]);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboardOptions}>
        {competition && (
          <h1 className={styles.endDate}>
            <span>Competition Ends:</span> {timer}
          </h1>
        )}
        {ownedGotchis && ownedGotchis.length > 0 && (
          <button
            className={styles.toggle}
            onClick={() => {
              playSound("click");
              setOnlyMine((prevState) => !prevState);
            }}
          >
            {onlyMine ? "View all" : "Only mine"}
          </button>
        )}
      </div>
      <div
        className={`${styles.row} ${styles.headerRow}`}
        style={{ gridTemplateColumns: `repeat(${competition ? 3 : 2}, 1fr)` }}
      >
        <div className={styles.cell}>Aavegotchi</div>
        <div className={styles.cell}>Score</div>
        {competition && <div className={styles.cell}>Rewards</div>}
      </div>
      {displayedScores
        ?.slice(currentPage * pageTotal, currentPage * pageTotal + pageTotal)
        .map((item) => (
          <div
            className={`
              ${styles.row}
              ${ownedGotchis?.includes(item.tokenId) ? styles.owned : ""}
            `}
            style={{
              gridTemplateColumns: `repeat(${competition ? 3 : 2}, 1fr)`,
            }}
            key={item.tokenId}
          >
            <div className={styles.cell}>
              {item.position}. {item.name} [{item.tokenId}]
            </div>
            <div className={styles.cell}>{item.score}</div>
            {competition && <div className={styles.cell}>{item.reward}</div>}
          </div>
        ))}
      {displayedScores.length > pageTotal && (
        <div className={styles.pageSelector}>
          {Array(Math.ceil(displayedScores.length / pageTotal))
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className={`${styles.selector} ${
                  i === currentPage ? `${styles.selected}` : ""
                }`}
                onClick={() => {
                  playSound("click");
                  setCurrentPage(i);
                }}
              >
                {i + 1}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
