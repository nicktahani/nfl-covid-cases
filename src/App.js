import React from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import TeamLogos from './components/TeamLogos'

function App() {
  return (
    <div className="App">  
      <InfoBox/>
      <TeamLogos width='300px' height='300px'/>
    </div>
  );
}

export default App;
