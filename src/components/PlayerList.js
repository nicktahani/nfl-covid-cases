//ADD HEADERS FOR WEEK #s

import React from 'react'
import '../css/PlayerList.css'
import { nest } from 'd3-collection'
import { ascending } from 'd3-array'

export function PlayerList({ team, rawData }) {
  const nested = nest()
    .key(d => d.team_id)
    .key(d => d.week)
    .rollup(leaves => { 
      return {case_count: leaves.length, data: leaves}
    })
    .object(rawData)


  // const weeks = Object.entries(nested).filter(teams => teams[0] === team)

  const teamData = nest()
    .key(d => d.team_id)
    .object(rawData)[team]
  
    console.log(teamData)

  const weeks = nest()
    .key(d => d.week)
    .sortKeys((a, b) => ascending(+a.week, +b.week))
    .entries(teamData)

  console.log(weeks)

  return (
    <div>
      {weeks.map(({key: week, values: players}) =>
        <div key={week}>
          <h3>{`Week ${week}`}</h3>
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

