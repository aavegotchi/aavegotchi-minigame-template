import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';
import Scenes from './scenes';
import { useWeb3 } from 'web3';

const Main = () => {
  const { state: { selectedGotchi } } = useWeb3();

  const config: GameInstance = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: Scenes,
    fps: {
      target: 60,
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: process.env.NODE_ENV === 'development',
      },
    },
    callbacks: {
      preBoot: (game) => {
        game.registry.merge({
          selectedGotchi
        });
      }, 
    }
  }

  return (
    <IonPhaser initialize={true} game={config} />
  )
}

export default Main;
