import { scaleLinear } from 'd3-scale'
import { extent } from 'd3-array'

export const height = 250
export const margin = {top: 50, right: 50, bottom: 50, left: 50}


export function getTeams (teamCounts) {
  return [...Object.keys(teamCounts)] 
}

export function getTeamCounts (cases_data) {
  // { total: { {week: 0, caseCount: 100}}, TEN: {{week: 0, caseCount: 100}, ...}, ...}
  let nest = {total: {}}

  for (let row of cases_data) {
    if (!nest.total[row.week]) nest.total[row.week] = 0; 
    nest.total[row.week]++; //nest = { total: {0: 5, 4: 10, ...} }

    // if the team doesn't exist in the nest, add it
    if (!nest[row.team_id]) nest[row.team_id] = {}; //nest = { KC: {}, SF: {}, ... }
    // if the week number doesn't exist in the (nest) team, add it
    if (!nest[row.team_id][row.week]) nest[row.team_id][row.week] = 0;
    // increment the case count for that team, for that week
    nest[row.team_id][row.week]++; //nest = { KC: {0: 5, 1: 10}, SF: {0: 3, 1: 5},... }
  }

  //fill in missing week numbers (keys)
  const weekExtent = extent(
    Object.keys(nest.total),
    d => +d
  )
  //iterate through every team in the nest and add the missing week numbers
  for (let team in nest) {  
    const teamObj = nest[team]
    for (let i = weekExtent[0]; i < weekExtent[1] + 1; i++) {
      if (!teamObj[i]) teamObj[i] = 0; // if the week number doesn't exist in the team obj, add it
    }
  }

  return nest
}


export function getYScale (teamCounts) {
  let currentMaximum = 0

  for (let team in teamCounts) {
    if (team === 'total') {
      continue
      // currentMaximum = max(Object.values(teamCounts.total))
    } else {
      // get the counts for all weeks for the team
      const counts = Object.values(teamCounts[team]) //teamCounts[team] = {0: 1, 1: 0, 2: 0, 3: 0, 4: 1, 5: 0, 6: 1, 7: 0, 8: 0, 9: 1, 10: 4, ...}
      const teamMax = Math.max(...counts, currentMaximum)
      currentMaximum = teamMax
    }
  }

  // console.log(currentMaximum)

  // use the value that we found in the scale
  return scaleLinear()
    .domain([0, currentMaximum])
    .range([height - margin.bottom, margin.top])
}

export function getChartData (teamCounts) {
  const data = []
  for (let team in teamCounts) {
    if (team === 'total') continue; 
    // console.log(team)
    data.push({ team: team, data: Object.entries(teamCounts[team]) })
  }
  return data
}