import React, { useEffect } from 'react';
import Header from './components/Header';
import Survey from './views/Survey/Survey';
import './App.css'
import Metamask from './helpers/metamask';

function App(): JSX.Element {
  useEffect(() => {
    Metamask.validateChain();
  })
  return (
    <main>
      <Header/>
      <Survey/>
    </main>
  );
}

export default App;
