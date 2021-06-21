import * as audio from 'assets/sounds';

export const playSound = async (sound: keyof typeof audio) => {
  const s = new Audio(audio[sound]);
  const volume = window.localStorage.getItem('seVolume') ?? '5';
  s.volume = Number(volume) / 10;

  try {
    await s.play();
  } catch (err) {
    console.error(err);
  }
};
