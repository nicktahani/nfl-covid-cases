//ADD HEADERS FOR WEEK #s

import React from 'react'
import '../css/PlayerList.css'
import { nest } from 'd3-collection'

export function PlayerList({ team, rawData }) {



  const nested = nest()
    .key(d => d.team_id)
    .key(d => d.week)
    .rollup(leaves => { 
      return {case_count: leaves.length, data: leaves}
    })
    .object(rawData)

    // Object.values(nested)

    // const dataArr = []
    // for (let team in nest) {
    //   const weekNums = Object.values(nest[team])
    //   console.log(weekNums)
    //   // console.log(weekNums.map(d => d.data.map(d => `${d.name}`)))
    //   dataArr.push({team: team, cases: weekNums})
    // }
    // return dataArr

    const test = Object.entries(nested).filter(teams => teams[0] === team).map(d => d[1])
    // console.log(test)

    console.log(Object.entries(nested).map(d => Object.values(d[1])))

  return (
    <div>
      {Object.entries(nested).filter(teams => teams[0] === team).map((d, i) => (
        <div key={i}>
          <h3>{`Week ${Object.keys(d[1])}`}</h3>
          <ul>
            {Object.values(d[1]).map(({data}) => (
              <li>
                {data.map(d => d.name).join(' ')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

