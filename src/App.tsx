import React from 'react';
import Header from './components/Header';
import Survey from './views/Survey/Survey';
import './App.css'

function App(): JSX.Element {
  return (
    <main>
      <Header/>
      <Survey/>
    </main>
  );
}

export default App;
