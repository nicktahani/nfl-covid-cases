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