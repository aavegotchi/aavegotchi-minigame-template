import { useState } from 'react';
import { SearchIcon } from 'assets';
import styles from './styles.module.css';

export const SearchToggle = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${open ? styles.open : ''}`}>
      <button className={styles.toggle} onClick={() => setOpen(prevState => !prevState)}>
        <SearchIcon width={32} height={32} />
      </button>
      <input className={styles.input} type="text" placeholder="Token ID or Name" />
    </div>
  )
}