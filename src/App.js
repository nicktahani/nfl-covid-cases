import React from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import TeamLogos from './components/TeamLogos'

function App() {
  return (
    <div className="App">  
      <InfoBox/>
      <TeamLogos width='250px' height='250px'/>
    </div>
  );
}

export default App;
