import React from 'react'
import '../css/PlayerList.css'

const PlayerList = ({ team, rawData }) => {

  return (
    <div className='cases-list'>
      {rawData.filter(d => d.team_id === team).map((d, i) => (
        <div key={i}>{d.list}</div>
        // console.log(d.list)
      ))}
    </div>
  )
}

export default PlayerList

