import React from 'react';
import logo from './logo.svg';
import { Web3Provider } from 'web3';
import './App.css';

function App() {
  return (
    <Web3Provider>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Web3Provider>
  );
}

export default App;
