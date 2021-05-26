import styles from './styles.module.css';
import globalStyles from 'theme/globalStyles.module.css';
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`${globalStyles.container} ${styles.navContainer}`}>
        <NavLink to="/" className={styles.navLink} activeClassName={styles.activeNavLink} isActive={(_, location) => {
          if(!location) return false;
          const {pathname} = location;
          return pathname === "/";
        }}>
          Game
        </NavLink>
        <NavLink to="/leaderboard" className={styles.navLink} activeClassName={styles.activeNavLink}>
          Leaderboard
        </NavLink>
        <NavLink to="/settings" className={styles.navLink} activeClassName={styles.activeNavLink}>
          Settings
        </NavLink>
      </nav>
    </header>
  )
}