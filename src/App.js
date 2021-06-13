import React from 'react';
import './App.css';
import { InfoBox } from './components/InfoBox';
import { FetchCovidData } from './components/FetchCovidData';


function App() {
  return (
    <div className='App' style={{ margin: '40px' }}>  
      <span className='header'>NFL COVID CASES</span>
      <InfoBox description='The NFL has created a COVID-19 Reserve List for the 2020-21 season that is defined as any player who has tested positive, or been in close contact with someone who has tested positive...'/>
      <FetchCovidData />
    </div>
  );
}

export default App;
