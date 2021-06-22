import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { SubmitScoreReq, HighScore } from 'types';

interface IServerContext {
  highscores?: Array<HighScore>;
  handleSubmitScore?: (
    score: number,
    gotchiData: SubmitScoreReq
  ) => void;
}

export const ServerContext = createContext<IServerContext>({});

export const ServerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [highscores, setHighscores] = useState<Array<HighScore>>();

  const sortByScore = (a: HighScore, b: HighScore) => b.score - a.score;

  // Used in development only - Highscore submissions in production should submit server side
  const handleSubmitScore = (
    score: number,
    gotchiData: SubmitScoreReq,
  ) => {
    const { name, tokenId } = gotchiData;

    const newHighscores = highscores ? [...highscores] : [];
    const gotchiPrevScore = newHighscores.find(
      (score) => score.tokenId === gotchiData.tokenId,
    );
    console.log(newHighscores);
    if (gotchiPrevScore) {
      if (gotchiPrevScore.score < score) {
        gotchiPrevScore.score = score;
      }
    } else {
      newHighscores.push({
        tokenId,
        score,
        name,
      });
    }
    window.localStorage.setItem('highscores', JSON.stringify(newHighscores));
    const success = true;

    if (success) {
      const highscoresCopy = highscores === undefined ? [] : [...highscores];

      const indexOfScore = highscoresCopy.findIndex(
        (score) => score.tokenId === tokenId,
      );
      if (indexOfScore >= 0) {
        highscoresCopy[indexOfScore].score = score;
      } else {
        highscoresCopy.push({
          tokenId,
          score,
          name,
        });
      }

      highscoresCopy.sort(sortByScore);
      setHighscores(highscoresCopy);
    }
  };

  const handleGetHighscores = async () => {
    // Replace dummy logic with API request to fetch highscores
    const res = await new Promise<HighScore[]>((res) => {
      setTimeout(() => {
        res(JSON.parse(window.localStorage.getItem('highscores') || '[]'));
      }, 300);
    });
    return res;
  };

  useEffect(() => {
    const getHighscores = async () => {
      const res = await handleGetHighscores();
      setHighscores(res);
    };

    getHighscores();
  }, []);

  return (
    <ServerContext.Provider
      value={{
        highscores,
        handleSubmitScore,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => useContext(ServerContext);
