//ADD HEADERS FOR WEEK #s

import React from 'react'
import '../css/PlayerList.css'

export function PlayerList({ team, rawData }) {

  return (
    <div className='cases-list'>
      {rawData.filter(d => d.team_id === team).map((d, i) => (
        <div key={i}>{d.list}</div>
      ))}
    </div>
  )
}

