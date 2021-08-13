import { useState } from "react";
import { DropdownIcon, SortIcon } from 'assets';
import styles from './styles.module.css';

interface Props {
  options: Array<{
    name: string,
    value: string
  }>
}

export const SortToggle = ({ options }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${open ? styles.open : ''}`}>
      <button className={styles.toggle} onClick={() => setOpen(prevState => !prevState)}>
        <SortIcon width={32} height={32} fill="white" />
      </button>
      <div className={styles.sortOptions}>
        {options.map(option => {
          const active = option.value === "name"
          return (
            <div key={option.value} className={`${styles.option} ${active ? styles.active : styles.inactive} `} >
              <p>{option.name}</p>
              <DropdownIcon fill="#FC16F4" />
            </div>
          )
        })}
      </div>
    </div>
  )
}