import React from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
// import TeamLogos from './components/TeamLogos'
import FetchCovidData from './components/FetchCovidData';


function App() {
  return (
    <div className="App">  
      <span className='header'>NFL COVID CASES</span>
      <InfoBox />
      <FetchCovidData />
    </div>
  );
}

export default App;
