import React, { useEffect, useMemo, useRef } from 'react'
import '../css/PlayerList.css'
import { nest } from 'd3-collection'

export function PlayerList({ team, rawData }) {
  const fieldRef = useRef()

  useEffect(() => {    
    if (fieldRef.current) {      
      fieldRef.current.scrollIntoView()   
    }  
  }, [])

  const teamData = useMemo(() => 
    nest()
      .key(d => d.team_id)
      .object(rawData)[team],
      [rawData, team]
  )

  const weeks = useMemo(() =>
    nest()
      .key(d => +d.week)
      .sortKeys((a, b) => a - b)
      .entries(teamData),
      [teamData]
  )
  

  return (
    <div className='list' ref={fieldRef}>
      {weeks.map(({key: week, values: players}) =>
        <div key={week}>
          <h3>{week > 0 ? `Week ${week}` : 'Preseason'}</h3>
          <ul>
            {players.map(player =>
              <li key={player.name}>{`${player.name} (${player.position})`}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

