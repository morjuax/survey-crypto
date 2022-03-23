import React, { useEffect } from 'react';
import './App.css'
import Metamask from './services/metamask';
import ValidateGame from './providers/validate-game';
import Trivias from './views/Trivias/Trivias';

function App(): JSX.Element {
  async function validateInitApp() {
    Metamask.eventHandlerDisconnectCustom();
    const canPlay = await ValidateGame.canPlay();
    if (canPlay) {
      await Metamask.validateChain();
    }
  }

  useEffect(() => {
    validateInitApp();
  }, [])
  return (
    <main>
      <Trivias/>
    </main>
  );
}

export default App;
