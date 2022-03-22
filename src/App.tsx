import React, { useEffect } from 'react';
import Header from './components/Header';
import Survey from './views/Survey/Survey';
import './App.css'
import Metamask from './helpers/metamask';
import Trivias from './views/Trivias/Trivias';
import { Routes, Route, Link } from "react-router-dom";

function App(): JSX.Element {
  useEffect(() => {
    Metamask.validateChain();
  })
  return (
    <main>
      <Header/>
      {/*<Survey/>*/}
      <Trivias/>
    </main>
  );
}

export default App;
