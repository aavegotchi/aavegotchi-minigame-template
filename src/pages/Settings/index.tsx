import { Layout } from 'components/Layout';
import { useState } from 'react';
import { playSound } from 'helpers/hooks/useSound';
import styles from './styles.module.css';

const Settings = () => {
  const [seVolume, setSEVolume] = useState(window.localStorage.getItem('seVolume') ?? '5');
  const [musicVolume, setMusicVolume] = useState(window.localStorage.getItem('musicVolume') ?? '5');

  const handleSEVolumeChange = () => {
    window.localStorage.setItem('seVolume', seVolume);
    playSound('click');
  };

  const handleMusicVolumeChange = () => {
    window.localStorage.setItem('musicVolume', musicVolume);
    playSound('click');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Audio settings</h1>
        <div className={styles.inputContainer}>
          <label htmlFor="sound-effects">
            Sound Effects:
            {Number(seVolume) * 10}
            %
          </label>
          <input
            value={seVolume}
            type="range"
            id="sound-effects"
            name="sound-effects"
            min="0"
            max="10"
            step="1"
            onChange={(e) => setSEVolume(e.target.value)}
            onClick={handleSEVolumeChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="music">
            Music:
            {Number(musicVolume) * 10}
            %
          </label>
          <input
            value={musicVolume}
            type="range"
            id="music"
            name="music"
            min="0"
            max="10"
            step="1"
            onChange={(e) => setMusicVolume(e.target.value)}
            onClick={handleMusicVolumeChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
