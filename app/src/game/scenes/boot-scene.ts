import { AavegotchiGameObject, AavegotchiObject } from "types";
import { getGameHeight, getGameWidth } from "game/helpers";
import { assets, SpritesheetAsset } from "game/assets";
import { constructSpritesheet } from "../helpers/spritesheet";
import { customiseSVG } from "helpers/aavegotchi";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Boot",
};

/**
 * The initial scene that loads all necessary assets to the game.
 */
export class BootScene extends Phaser.Scene {
  gotchi?: AavegotchiGameObject;
  loadIndex: number;
  progressBarContainer?: Phaser.GameObjects.Rectangle;
  progressBar?: Phaser.GameObjects.Rectangle;
  loadingText?: Phaser.GameObjects.Text;

  constructor() {
    super(sceneConfig);
    this.loadIndex = 0;
  }

  public preload = (): void => {
    // Construct progress bar
    this.createProgressBar();

    // Construct gotchi game object
    const selectedGotchi = this.game.registry.values
      .selectedGotchi as AavegotchiObject;
    this.gotchi = {
      ...selectedGotchi,
      spritesheetKey: "PLAYER",
    };

    // Load spritesheet after audio files loaded
    // Start game on spritesheet load
    this.load.on(
      "filecomplete",
      (key: string) => {
        if (key === "PLAYER") {
          return this.scene.start("Game", { selectedGotchi: this.gotchi });
        }
        if (this.loadIndex === assets.length && this.gotchi) {
          this.loadInGotchiSpritesheet(this.gotchi);
        } else {
          this.loadNextFile(this.loadIndex);
        }
      },
      this
    );
    this.loadNextFile(0);
  };

  private createProgressBar = () => {
    const width = getGameWidth(this) * 0.5;
    const height = 12;
    this.progressBarContainer = this.add
      .rectangle(
        getGameWidth(this) / 2,
        getGameHeight(this) / 2,
        width,
        height,
        0x12032e
      )
      .setOrigin(0.5);

    this.progressBar = this.add
      .rectangle(
        (getGameWidth(this) - width) / 2,
        getGameHeight(this) / 2,
        0,
        height,
        0x6d18f8
      )
      .setOrigin(0, 0.5);

    this.loadingText = this.add
      .text(getGameWidth(this) / 2, getGameHeight(this) / 2 - 32, "Loading...")
      .setFontSize(24)
      .setOrigin(0.5);
  };

  private loadNextFile = (index: number) => {
    const file = assets[index];
    this.loadIndex++;

    if (this.loadingText && this.progressBar && this.progressBarContainer) {
      this.loadingText.setText(`Loading: ${file.key}`);
      this.progressBar.width =
        (this.progressBarContainer.width / assets.length) * index;
    }

    switch (file.type) {
      case "IMAGE":
        this.load.image(file.key, file.src);
        break;
      case "SVG":
        this.load.svg(file.key, file.src);
        break;
      case "AUDIO":
        this.load.audio(file.key, [file.src]);
        break;
      case "SPRITESHEET":
        this.load.spritesheet(
          file.key,
          file.src,
          (file as SpritesheetAsset).data
        );
        break;
      default:
        break;
    }
  };

  private loadInGotchiSpritesheet = async (
    gotchiObject: AavegotchiGameObject
  ) => {
    const svg = gotchiObject.svg;
    const spriteMatrix = [
      [
        customiseSVG(svg, { removeBg: true }),
        customiseSVG(svg, {
          armsUp: true,
          eyes: "happy",
          float: true,
          removeBg: true,
        }),
      ],
    ];

    const { src, dimensions } = await constructSpritesheet(spriteMatrix);
    this.load.spritesheet(gotchiObject.spritesheetKey, src, {
      frameWidth: dimensions.width / dimensions.x,
      frameHeight: dimensions.height / dimensions.y,
    });
    this.load.start();
  };
}
