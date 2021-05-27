import styles from './styles.module.css';
import globalStyles from 'theme/globalStyles.module.css';
import { NavLink } from "react-router-dom";
import { useWeb3 } from 'web3';
import { smartTrim } from 'helpers/functions';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

export const Header = () => {
  const { state: { address }, connectToNetwork } = useWeb3();

  const handleWalletClick = () => {
    if (!address) {
      connectToNetwork();
    }
  }

  return (
    <header className={styles.header}>
      <nav className={`${globalStyles.container} ${styles.headerContent}`}>
        <ul className={styles.navContainer}>
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
        </ul>
        <button className={styles.walletContainer} onClick={handleWalletClick}>
          {address
            ?
              (
                <div className={styles.walletAddress}>
                  <Jazzicon diameter={24} seed={jsNumberForAddress(address)} />
                  <p>
                    {smartTrim(address, 8)}
                  </p>
                </div>
              )
            : 'Connect'}
        </button>
      </nav>
    </header>
  )
}