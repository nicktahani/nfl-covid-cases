import React, { useState, useEffect } from 'react'
import PlayerList from './PlayerList'
import TeamLogos from './TeamLogos'
import '../css/TeamLogos.css'
import { csv } from 'd3'
// import useFetchData from './useFetchData'

const url = './data/nflcovid.csv' //in public/

const deserializer = d => {
  return {
    ...d,
    list: `${d.first} ${d.last} (${d.position})`, //filter players by week
  }
}

const FetchCovidData = () => {
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState(null)

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

  const handleSelectTeam = team => {
    setSelectedTeam(team)
  }

  console.log(data)

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <TeamLogos width='200px' height='200px' onSelectTeam={handleSelectTeam} />
      {selectedTeam && <PlayerList team={selectedTeam} data={data} />}
    </div>
  )
}

export default FetchCovidData