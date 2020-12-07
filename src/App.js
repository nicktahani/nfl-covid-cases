import React from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import TeamLogos from './components/TeamLogos'

function App() {
  return (
    <div className="App">  
      <span className='header'>NFL COVID CASES</span>
      <InfoBox/>
      <TeamLogos width='200px' height='200px'/>
    </div>
  );
}

export default App;
