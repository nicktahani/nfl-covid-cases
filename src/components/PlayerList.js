import React from 'react'
import '../css/PlayerList.css'
import { nest } from 'd3-collection'
import { useMemo } from 'react'

export function PlayerList({ team, rawData }) {
  const teamData = useMemo(() => 
    nest()
      .key(d => d.team_id)
      .object(rawData)[team],
      [rawData]
  )

  const weeks = useMemo(() =>
    nest()
      .key(d => +d.week)
      .sortKeys((a, b) => a - b)
      .entries(teamData),
      [teamData]
  )
  

  return (
    <div>
      {weeks.map(({key: week, values: players}) =>
        <div key={week}>
          <h3>{week > 0 ? `Week ${week}` : 'Preseason'}</h3>
          <ul>
            {players.map(player =>
              <li key={player.name}>{player.name}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

