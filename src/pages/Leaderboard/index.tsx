import { Layout } from 'components/Layout';
//import { useFirebase } from 'firebase-client';
import { useWeb3 } from 'web3';
import { Leaderboard as LeaderboardComponent } from 'components/Leaderboard';
import globalStyles from 'theme/globalStyles.module.css';

const Leaderboard = () => {
  const { state: { usersGotchis } } = useWeb3();
  //const { highscores } = useFirebase();

  return (
    <Layout>
      <div className={globalStyles.container}>
        <LeaderboardComponent highscores={[]} ownedGotchis={usersGotchis?.map(gotchi => gotchi.id)} />
      </div>
    </Layout>
  )
}

export default Leaderboard;