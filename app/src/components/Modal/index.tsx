import globalStyles from 'theme/globalStyles.module.css';
import styles from './styles.module.css';

interface Props {
  active: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

/**
 * Reusable Modal component.
 */
export const Modal = ({ active, children, handleClose }: Props) => (
  <div className={`${styles.background} ${active ? styles.open : ''}`}>
    <div className={styles.shadow} />
    <div className={styles.panel}>
      <button
        onClick={() => handleClose()}
        className={`${globalStyles.circleButton} ${globalStyles.secondaryButton} ${styles.closeButton}`}
      >
        X
      </button>
      {children}
    </div>
  </div>
);
