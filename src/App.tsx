import React, { Fragment, useState } from 'react';
import Header from './components/Header';

function App(): JSX.Element {
  const [newTask, setNewTask] = useState('');

  return (
    <main>
      <Header></Header>
    </main>
  );
}

export default App;
