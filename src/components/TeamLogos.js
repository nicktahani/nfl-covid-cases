import React, { useState, useEffect } from 'react'
import { NFL_TEAM_LOGOS } from '../constants/teams'
import '../css/TeamLogos.css'
// import useFetchData from './useFetchData'
// import { csvParse } from 'd3'
import { csv } from 'd3'

const url = './data/nflcovid.csv' //in public/

// const parseText = async res => {
//   const data = await res.text()
//   return csvParse(data)
// }

const deserializer = d => {
  return {
    ...d,
    name: `${d.first} ${d.last}`
  }
}

const TeamLogos = ({...imgProps }) => {

  // const covidData = useFetchData(url, parseText)
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

  const onSelect = team => {
    console.log(data.filter(d => d.abbreviation === team))
  }

  console.log(data)

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div className='logos'>
      {
        data && NFL_TEAM_LOGOS.map(team => 
          <img 
            {...imgProps}  
            src={`${process.env.PUBLIC_URL}/logos/${team}.svg`} 
            onClick={() => onSelect(team)} 
            key={team}
            alt={team}
          />
        )}
    </div>
  )

}

export default TeamLogos