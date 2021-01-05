import React, { useState, useEffect } from 'react'
import '../css/TeamLogos.css'
import { csv } from 'd3'
import TeamCard from './TeamCard'
import { NFL_TEAM_LOGOS } from '../constants/teams'
// import useFetchData from './useFetchData'

const url = './data/nflcovid.csv' //in public/

const deserializer = d => {
  return {
    ...d,
    list: `${d.first} ${d.last} (${d.position})`, //TODO: filter case list by week
  }
}

const FetchCovidData = () => {
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    csv(url, deserializer)
      .then(data => {
        setIsFetching(false)
        setData(data)
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
    <div className='logo-grid'>
       {NFL_TEAM_LOGOS.map(team => <TeamCard team={team} key={team} data={data} />)}
    </div>
  )
}

export default FetchCovidData