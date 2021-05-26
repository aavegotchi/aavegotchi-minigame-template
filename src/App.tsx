import React from 'react';
import { Web3Provider } from 'web3';
import Home from 'pages/Home';
import Leaderboard from 'pages/Leaderboard';
import Settings from 'pages/Settings';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

const nav: Array<{ path: string, component: () => JSX.Element, exact?: boolean }> = [
  {
    path: "/",
    component: Home,
    exact: true
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
  },
  {
    path: "/settings",
    component: Settings,
  }
]

function App() {
  return (
    <Web3Provider>
      <Router>
        <Switch>
          {nav.map((item, i) => <Route path={item.path} exact={item.exact} key={i} component={item.component} />)}
        </Switch>
      </Router>
    </Web3Provider>
  );
}

export default App;
