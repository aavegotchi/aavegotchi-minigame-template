import { useState } from 'react';
import { playSound } from 'helpers/hooks/useSound';
import styles from './styles.module.css';

interface Props {
  onClick: () => void,
}

export const Hamburger = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    playSound('click');
    setOpen(!open);
    props.onClick();
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`${styles.hamburgerWrapper} ${open ? styles.open : ''}`}
    >
      <span className={styles.stroke} />
      <span className={styles.stroke} />
      <span className={styles.stroke} />
      <span className={styles.stroke} />
    </div>
  );
};
