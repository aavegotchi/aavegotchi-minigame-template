import { useState } from 'react';
import { SearchIcon } from 'assets';
import styles from './styles.module.css';

interface Props {
  onChange: (text: string) => void;
  placeholder: string;
}

export const SearchToggle = ({ onChange, placeholder }: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
    onChange(input);
  }

  return (
    <div className={`${styles.inputContainer} ${open ? styles.open : ''}`}>
      <button className={styles.toggle} onClick={() => setOpen(prevState => !prevState)}>
        <SearchIcon width={32} height={32} />
      </button>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </div>
  )
}