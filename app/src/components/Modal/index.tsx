import globalStyles from 'theme/globalStyles.module.css';
import { Portal } from 'components';
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
  onHandleClose: () => void;
}

/**
 * Reusable Modal component.
 */
export const Modal = ({ children, onHandleClose }: Props) => {
  return (
    <Portal>
      <div className={styles.background}>
        <div className={styles.shadow} />
        <div className={styles.panel}>
          <button
            onClick={() => onHandleClose()}
            className={`${globalStyles.circleButton} ${globalStyles.secondaryButton} ${styles.closeButton}`}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </Portal>
  )
};

