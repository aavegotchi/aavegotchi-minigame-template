import { useState } from "react";
import { DropdownIcon, SortIcon } from 'assets';
import styles from './styles.module.css';

export type Sort  = {
  val: string,
  dir: 'asc' | 'desc'
}

interface Props {
  options: Array<{
    name: string,
    value: string
  }>
  onSelect: (val: Sort) => void;
  selected: Sort;
  onToggle?: (active: boolean) => void;
  activeOverride?: boolean;
}

export const SortToggle = ({ options, onSelect, selected, onToggle, activeOverride }: Props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
    onToggle ? onToggle(!open) : null;
  };

  return (
    <div
      className={`${styles.inputContainer} ${
        (activeOverride !== undefined ? activeOverride : open)
          ? styles.open
          : ""
      }`}
    >
      <button className={styles.toggle} onClick={handleToggle}>
        <SortIcon width={32} height={32} fill="white" />
      </button>
      <div className={styles.sortOptions}>
        {options.map(option => {
          const active = option.value === selected.val;
          const direction = active ? selected.dir : 'asc';
        
          return (
            <div
              key={option.value}
              className={`${styles.option} ${active ? styles.active : styles.inactive}`}
              onClick={() => onSelect({val: option.value, dir: active ? direction === 'asc' ? 'desc' : 'asc' : direction})}
            >
              <p>{option.name}</p>
              <DropdownIcon fill="#FC16F4" width={16} className={styles[direction]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}