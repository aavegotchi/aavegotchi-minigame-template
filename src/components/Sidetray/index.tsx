import styles from './styles.module.css';

interface Props {
  children: React.ReactNode,
  open: boolean,
}

export const SideTray = ({ children, open }: Props) => (
  <div className={`${styles.container} ${open ? styles.open : ''}`}>
    {children}
  </div>
);
