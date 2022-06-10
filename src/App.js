import logo from './logo.svg';
import './App.css';
import React from "react";
import TestProps from "./components/TestProps";
import GetBalance from "./components/GetBalance";
import WalletConnection from "./components/WalletConnection";
import GetGeneralInfo from "./components/GetGeneralInfoRibbaToken";
import GetRibbaBalance from "./components/GetRibbaBalance";
import CheckRibbaAllowance from "./components/CheckRibbaAllowance";
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';
import ExchangeRibbaToken from "./components/ExchangeRibbaToken";
import Counter from "./components/Counter";

//import Test2 from "./components/Test2";
// import Coalesce from "ambient-cbg/src/components/Coalesce";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <h2>Check your balance!</h2>
          <p>Enter your wallet address</p>
          <GetBalance/>
          <WalletConnection />
          <h3>Check out the info on ribbaTokens!</h3>
          <GetGeneralInfo/>
          <h3>Check how many ribbaTokens you have!</h3>
          <GetRibbaBalance/>
          {/*<h3>Check your Ribba allowance!</h3>-->*/}
          {/*<CheckRibbaAllowance/>*/}
          {/*<Counter/>*/}
          <h3>Get ribbaTokens for FREE!</h3>
          <ExchangeRibbaToken/>
      </header>
    </div>
  );
}

export default App;
