import React, { useState, useEffect } from 'react'
import '../css/TeamLogo.css'
import { csv } from 'd3-fetch'
import { TeamCard } from './TeamCard'
import { NFL_TEAM_LOGOS } from '../constants/teams'
import { Multiples } from './Multiples'
import { InfoBox } from './InfoBox'
// import useFetchData from './useFetchData'

const url = './data/nfl_covid.csv' //in public/

const deserializer = d => {
  return {
    ...d,
    list: `${d.first} ${d.last} (${d.position})`, //TODO: filter case list by week
  }
}

export function FetchCovidData() {
  const [error, setError] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    csv(url, deserializer)
      .then(data => {
        setIsFetching(false)
        setRawData(data)
      })
      .catch(err => {
        setIsFetching(false)
        setError(err)
      })
  }, [])

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <>
      {rawData &&
        <>
          <InfoBox 
            header='Team Counts by Week' 
            description={`There was a reported total of ${rawData.length} cases (pre-season and regular season). The charts below show each teams cases on a weekly basis. Hover over the charts to see the counts for that week.`} 
          />
          <ul>
            <li>
              As there were no strict covid protocols in the pre-season (week 0), we can see a huge spike before the regular season begins and the protocols are put in place
            </li>
            <li>We can also notice that there's no reported cases for any team during weeks 1-3, perhaps due to teams being extra cautious in the early portion of the season</li>
            <li>Ultimately, Baltimore led all teams with 18 cases for a single week and 34 cases overall, while... </li>
            <li>It's also worth noting that some teams who had higher case counts in the pre-season actually reversed course and fared much better in the end (Jacksonville, Detroit, etc.)</li>
          </ul>
          <Multiples rawData={rawData} />
          <InfoBox 
            header='Lists by Team'
            description='Click on the logos to see the players who were placed on the list of their respective teams.' 
          />
          <div className='logo-grid'>
            {NFL_TEAM_LOGOS.map(team => <TeamCard team={team} key={team} rawData={rawData} />)}
          </div>
        </>
      }
    </>
  )
}