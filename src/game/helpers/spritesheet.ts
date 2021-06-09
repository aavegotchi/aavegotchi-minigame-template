import mergeImages from 'merge-images';

export const convertBase64toBlobURL = (b64: string): string => {
  const byteString = atob(b64.split(',')[1]);
  const mimeString = b64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  return URL.createObjectURL(blob);
};

export const convertInlineSVGToBlobURL = (svg: string): string => {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};

export const removeBackground = (svg: string): string => {
  const styledSvg = svg.replace('<style>', '<style>.gotchi-bg{display:none;}');
  return styledSvg;
};

export const addIdleUp = (svg: string): string => {
  const styledSvg = svg.replace(
    '<style>',
    '<style>.gotchi-shadow {transform: translateY(1px);}.gotchi-wearable,.gotchi-handsDownClosed,.gotchi-handsUp,.gotchi-handsDownOpen,.gotchi-handsDownClosed,.gotchi-body,.gotchi-eyeColor,.gotchi-collateral,.gotchi-cheek,.gotchi-primary-mouth,.gotchi-wearable,.gotchi-sleeves {transform: translateY(-1px);}',
  );
  return styledSvg;
};

const makeFirefoxCompatible = (svg: string) => {
  const styledSvg = svg.replace(
    '<svg xmlns=',
    '<svg width="150" height="150" xmlns=',
  );
  return styledSvg;
};


type SpriteMatrix = Array<Array<string>>;

interface Spritesheet {
  src: string,
  dimensions: {
    width: number,
    height: number,
    x: number,
    y: number,
  }
}

/**
 * Constructs spritesheet from Aavegotchi SVGs
 * @param {SpriteMatrix} spriteMatrix - A 2D array of SVGs.
 * @returns {Promise<Spritesheet>} Promise object represents Blob URL + Dimensions of the spritesheet
 */
export const constructSpritesheet = async (spriteMatrix: SpriteMatrix): Promise<Spritesheet> => {
  const gotchiWidth = 150;
  const maxColumns = Math.max(...spriteMatrix.map(item => item.length));
  const canvasWidth = gotchiWidth * maxColumns;
  const canvasHeight = spriteMatrix.length * gotchiWidth;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const baseUrl = canvas.toDataURL();

  const spriteImagesArray: Array<{ src: string, x: number, y: number }> = [];
  spriteMatrix.forEach((row, i) => {
    const rowArray = row.map((colItem, j) => {
      const url = convertInlineSVGToBlobURL(makeFirefoxCompatible(colItem));
      return (
        { src: url, x: j * gotchiWidth, y: i * gotchiWidth }
      )
    })
    spriteImagesArray.push(...rowArray);
  })

  const b64 = await mergeImages([
    { src: baseUrl },
    ...spriteImagesArray
  ]);
  return {
    src: convertBase64toBlobURL(b64),
    dimensions: {
      width: canvasWidth,
      height: canvasHeight,
      x: maxColumns,
      y: spriteMatrix.length,
    }
  };
};
