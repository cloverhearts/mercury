import React from 'react';
import './App.scss';

import Paragraph from './components/Paragraph'

function App() {
  return (
    <div>
      Hello Mercury
      <div className={`container`}>
        <Paragraph />
      </div>

    </div>
  );
}

export default App;
