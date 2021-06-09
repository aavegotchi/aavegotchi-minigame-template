import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import { IonPhaser, GameInstance } from '@ion-phaser/react';
import Scenes from './scenes';
import { useWeb3 } from 'web3';
import { useServer } from 'server-store';
import { Redirect } from 'react-router';

const Main = () => {
  const { state: { selectedGotchi } } = useWeb3();
  const { highscores, handleSubmitScore } = useServer();

  const [ highscore, setHighscore ] = useState(0);
  const [ initialised, setInitialised ] = useState(true);
  const [ config, setConfig ] = useState<GameInstance>();

  const submitScore = (score: number) => {
    if (score > highscore && selectedGotchi && handleSubmitScore) {
      handleSubmitScore(score, { name: selectedGotchi.name, tokenId: selectedGotchi.id })
    }
  }

  useEffect(() => {
    if (selectedGotchi && handleSubmitScore) {
      const gotchiScore = highscores?.find(score => score.tokenId === selectedGotchi?.id)?.score || 0;
      setHighscore(gotchiScore);

      let width = window.innerWidth;
      let height = width / 1.778;

      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * 1.778;
      }

      setConfig({
        type: Phaser.AUTO,
        
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: process.env.NODE_ENV === 'development',
          }
        },
        scale: {
          mode: Phaser.Scale.NONE,
          width: width,
          height: height,
        },
        scene: Scenes,
        fps: {
          target: 60,
        },
        callbacks: {
          preBoot: (game) => {
            // Makes sure the game doesnt create another game on rerender
            setInitialised(false);
            game.registry.merge({
              selectedGotchi,
              submitScore,
              highscore: gotchiScore,
            });
          }, 
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!selectedGotchi) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <IonPhaser initialize={initialised} game={config} id="phaser-app" />
  )
}

export default Main;
