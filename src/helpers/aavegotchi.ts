export const convertInlineSVGToBlobURL = (svg: string) => {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  return URL.createObjectURL(blob);
};
