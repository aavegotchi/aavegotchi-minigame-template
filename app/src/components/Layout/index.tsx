import { ErrorModal, Header } from 'components';
import { useWeb3 } from 'web3/context';
import styles from './styles.module.css';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const { state: {error} , dispatch } = useWeb3();

  const handleCloseErrorModal = () => {
    dispatch({
      type: "SET_ERROR",
      error: undefined,
    })
  }

  return (
    <div className={styles.container}>
      {error && <ErrorModal error={error} onHandleClose={handleCloseErrorModal} />}
      <Header />
      {children}
    </div>
  )
};
