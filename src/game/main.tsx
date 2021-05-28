import Phaser from 'phaser';
import { IonPhaser, GameInstance } from '@ion-phaser/react';
import Scenes from './scenes';
import { useWeb3 } from 'web3';

const Main = () => {
  const { state: { selectedGotchi } } = useWeb3();

  const config: GameInstance = {
    width: 1920,
    height: 1080,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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
    <IonPhaser initialize={true} game={config} id="phaser-app" />
  )
}

export default Main;
