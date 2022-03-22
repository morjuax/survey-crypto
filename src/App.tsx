import React, { useEffect } from 'react';
import Header from './components/Header';
import Survey from './views/Survey/Survey';
import './App.css'
import Metamask from './helpers/metamask';
import Trivias from './views/Trivias/Trivias';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from './views/NotFound';

function App(): JSX.Element {
  useEffect(() => {
    Metamask.validateChain();
  })
  return (
    <main>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Trivias/>}/>
          <Route path="quiz/:triviaId" element={<Survey/>} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
