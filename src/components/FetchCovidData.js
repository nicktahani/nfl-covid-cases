import React, { useState, useEffect } from 'react'
import '../css/TeamLogo.css'
import { csv } from 'd3-fetch'
import { TeamCard } from './TeamCard'
import { NFL_TEAM_LOGOS } from '../constants/teams'
import { Multiples } from './Multiples'
import { InfoBox } from './InfoBox'
import { BulletList } from './BulletList'
import { multiplesBullets, logoBullets } from '../constants/bullets'
// import useFetchData from './useFetchData'

const url = './data/nfl_covid.csv' //in public/

const deserializer = d => {

  return {
    ...d,
    name: `${d.first} ${d.last}`
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
          <BulletList items={multiplesBullets} />
          <Multiples rawData={rawData} />
          <InfoBox 
            header='Player Lists by Team'
            description='A main concern was the occurence of an entire positional group being placed on the list, a couple of teams experienced this... the games went about as well as you would imagine. Click on the logos to see the players who were placed on the COVID list of their respective teams.' 
          />
          <BulletList items={logoBullets} />
          <div className='logo-grid'>
            {NFL_TEAM_LOGOS.map(team => <TeamCard team={team} key={team} rawData={rawData} />)}
          </div>
        </>
      }
    </>
  )
}