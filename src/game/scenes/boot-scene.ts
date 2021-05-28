import { removeBackground, constructSpritesheet, addIdleUp } from '../helpers/spritesheet';

import * as KEYS from 'assets';
import { AavegotchiGameObject, AavegotchiObject } from 'types';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game.
 */
export class BootScene extends Phaser.Scene {
  gotchi?: AavegotchiGameObject;

  constructor() {
    super(sceneConfig);
  }

  public preload = (): void => {
    // Construct gotchi game object
    const selectedGotchi = this.game.registry.values.selectedGotchi as AavegotchiObject;
    this.gotchi = {
      ...selectedGotchi,
      spritesheetKey: "PLAYER",
    }

    // Load in images
    this.load.image(KEYS.BG, 'assets/images/bg.png');
    this.load.svg(KEYS.FULLSCREEN, 'assets/icons/fullscreen.svg');
    this.load.svg(KEYS.LEFT_CHEVRON, 'assets/icons/chevron_left.svg');
    this.load.svg(KEYS.RIGHT_CHEVRON, 'assets/icons/chevron_right.svg');

    // Load in sounds
    this.loadInSounds();

    // Load spritesheet after audio files loaded
    // Start game on spritesheet load
    this.load.on(
      'filecomplete',
      (key: string) => {
        if (key.includes(KEYS.CLICK)) {
          if (this.gotchi) {
            this.loadInGotchiSpritesheet(this.gotchi);
          }
        }
        if (this.gotchi && key.includes(this.gotchi?.spritesheetKey)) {
          this.scene.start('Game', { selectedGotchi: this.gotchi });
        }
      },
      this,
    );
  };

  private loadInGotchiSpritesheet = async (gotchiObject: AavegotchiGameObject) => {
    const gotchi = {...gotchiObject};
    const svgNoBg = removeBackground(gotchi.svg);
    const spritesheet = await constructSpritesheet(svgNoBg, addIdleUp(svgNoBg));
    this.load.spritesheet(gotchi.spritesheetKey, spritesheet, {
      frameWidth: 300 / 2,
      frameHeight: 150 / 1,
    });
    this.load.start();
  };

  private loadInSounds = () => {
    this.load.audio(KEYS.BOOP, ['assets/sounds/boop.mp3']);
    this.load.audio(KEYS.CLICK, ['assets/sounds/click.mp3']);
  };
}
