import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import Scenes from './scenes';

const Main = () => {
  const config = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: Scenes,
    physics: {
      default: 'arcade',
      arcade: {
        debug: process.env.NODE_ENV === 'development',
      },
    },
  }

  return (
    <IonPhaser initialize={true} game={config} />
  )
}

export default Main;
