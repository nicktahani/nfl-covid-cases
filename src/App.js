import React from 'react';
import './App.css';
// import { InfoBox } from './components/InfoBox';
import { FetchCovidData } from './components/FetchCovidData';


function App() {
  return (
    <div className='App' style={{ margin: '40px' }}>  
      <span className='header'>NFL COVID CASES</span>
      <p>
        For the 2020-21 season, the NFL created a COVID-19 Reserve List that was defined as any player who had tested positive, or been in close contact with someone who had tested positive for the coronavirus...
      </p>
      <FetchCovidData />
    </div>
  )
}

export default App;
