import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Survey from './views/Survey/Survey';
import NetworkError from './views/NetworkError/NetworkError';
import NotFound from './views/NotFound';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="quiz/:triviaId" element={<Survey/>} />
        <Route path='/network-error' element={<NetworkError/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
