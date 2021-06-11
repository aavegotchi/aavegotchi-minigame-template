import {
  LEFT_CHEVRON, CLICK, BG, FULLSCREEN,
} from 'game/assets';
import { AavegotchiGameObject } from 'types';
import { getGameWidth, getGameHeight } from '../helpers';
import { Player } from 'game/objects';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

/**
 * Scene where gameplay takes place
 */
export class GameScene extends Phaser.Scene {
  public speed = 200;

  private submitScore?: (score: number) => void;

  private player?: Player;
  private selectedGotchi?: AavegotchiGameObject;

  // Sounds
  public back?: Phaser.Sound.BaseSound;

  public click?: Phaser.Sound.BaseSound;

  constructor() {
    super(sceneConfig);
  }

  init = (data: { selectedGotchi: AavegotchiGameObject }): void => {
    this.selectedGotchi = data.selectedGotchi;
  };

  public create(): void {
    this.submitScore = this.game.registry.values.submitScore;

    // Add layout
    this.add.image(getGameWidth(this) / 2, getGameHeight(this) / 2, BG).setDisplaySize(getGameWidth(this), getGameHeight(this));
    this.back = this.sound.add(CLICK, { loop: false });
    this.click = this.sound.add(CLICK, { loop: false });
    this.createBackButton();
    this.createFullScreenToggle();

    // Add a player sprite that can be moved around.
    this.player = new Player({
      scene: this,
      x: getGameWidth(this) / 2,
      y: getGameHeight(this) / 2,
      key: this.selectedGotchi?.spritesheetKey || ''
    })
  }

  private createBackButton = () => {
    this.add
      .image(54, 54, LEFT_CHEVRON)
      .setInteractive({ useHandCursor: true })
      .setScale(0.4)
      .on('pointerdown', () => {
        this.back?.play();
        window.history.back();
      });
  };

  private createFullScreenToggle = () => {
    this.add
      .image(getGameWidth(this) - 54, getGameHeight(this) - 54, FULLSCREEN)
      .setInteractive({ useHandCursor: true })
      .setScale(0.4)
      .on('pointerdown', () => {
        this.click?.play();
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      });
  };

  public update(): void {
    // Every frame, we update the player
    this.player?.update();
  }
}
