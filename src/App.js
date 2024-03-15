import React, { useState } from 'react';
import './App.css';

import PetCard from './components/PetCard';
import Score from './components/Score';

function App() {
  const [showAdvanced, setShowAdvanced] = useState(true);

  return (
    <div className='app'>
      <PetCard />
      <Score />
    </div>
  );
}

export default App;
