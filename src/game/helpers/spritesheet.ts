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

export const constructSpritesheet = async (down: string, up: string): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 150;
  const baseUrl = canvas.toDataURL();

  const b64 = await mergeImages([
    { src: baseUrl },
    { src: convertInlineSVGToBlobURL(down), x: 0, y: 0 },
    { src: convertInlineSVGToBlobURL(up), x: 150, y: 0 },
  ]);
  return convertBase64toBlobURL(b64);
};
