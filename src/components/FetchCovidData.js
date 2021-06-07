import React, { useState, useEffect } from 'react'
import '../css/TeamLogo.css'
import { csv } from 'd3'
import TeamCard from './TeamCard'
import { NFL_TEAM_LOGOS } from '../constants/teams'
import LineChart from './LineChart'
import { Multiples } from './Multiples'
// import useFetchData from './useFetchData'

const url = './data/nfl_covid.csv' //in public/

const deserializer = d => {
  return {
    ...d,
    list: `${d.first} ${d.last} (${d.position})`, //TODO: filter case list by week
  }
}

const FetchCovidData = () => {
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
      <div className='logo-grid'>
        {NFL_TEAM_LOGOS.map(team => <TeamCard team={team} key={team} rawData={rawData} />)}
      </div>
      </>
    }
    </>
  )
}

export default FetchCovidData