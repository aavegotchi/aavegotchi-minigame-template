import { removeBackground, constructSpritesheet, addIdleUp } from '../helpers/spritesheet';
// import * as chevronUp from 'assets/icons/chevron_up.svg';
// import * as chevronLeft from 'assets/icons/chevron_left.svg';
// import * as chevronRight from 'assets/icons/chevron_right.svg';
// import * as chevronDown from 'assets/icons/chevron_down.svg';
// import * as fullscreen from 'assets/icons/chevron_up.svg';

import * as KEYS from '../../assets';
import { click, boop } from 'assets/sounds';
import { AavegotchiObject } from 'types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload = (): void => {
    //console.log("Booting scene", fullscreen);
    this.load.image(KEYS.BG, 'assets/images/bg.png');
    this.load.image(KEYS.AAVEGOTCHI_LOGO, 'assets/images/aavegotchiLogo.png');
    this.load.svg(KEYS.FULLSCREEN, 'assets/icons/fullscreen.svg');
    this.load.svg(KEYS.LEFT_CHEVRON, 'assets/icons/chevron_left.svg');
    this.load.svg(KEYS.RIGHT_CHEVRON, 'assets/icons/chevron_right.svg');
    this.loadInSounds();

    this.load.on('complete', () => {
      this.scene.start('Game');
    });
  };

  // private loadAssetsFromChain = async () => {
  //   // Load assets from chain
    

  //     await this.loadInGotchiImages(0);
  //   } else {
  //     this.scene.start('MainMenu', { error: 'Not connected to the Matic network.' });
  //   }
  // };

  // public connectToNetwork = async (): Promise<void> => {
  //   await window.ethereum.enable();
  // };

  // private loadInGotchiImages = async (i: number) => {
  //   const gotchi = this.gotchis[i];
  //   const spritesheet = await constructSpritesheet(gotchi.svg, addIdleUp(gotchi.svg));
  //   this.load.spritesheet(gotchi.spritesheetWithBGKey, spritesheet, {
  //     frameWidth: 300 / 2,
  //     frameHeight: 150 / 1,
  //   });
  //   const svgNoBg = removeBackground(gotchi.svg);
  //   const spritesheetNoBg = await constructSpritesheet(svgNoBg, addIdleUp(svgNoBg));
  //   this.load.spritesheet(gotchi.spritesheetKey, spritesheetNoBg, {
  //     frameWidth: 300 / 2,
  //     frameHeight: 150 / 1,
  //   });
  //   this.load.start();
  // };

  private loadInSounds = () => {
    this.load.audio(KEYS.BOOP, [boop]);
    this.load.audio(KEYS.CLICK, [click]);
  };
}
