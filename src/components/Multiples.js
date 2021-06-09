//TODO: dont fetch in here, pass from above

import React, { useState, useMemo } from 'react'
import { scalePoint } from 'd3-scale'
import { Chart } from './Chart'
import {getTeamCounts, getTeams, getYScale, getChartData, height, margin} from '../util/chartData.js'

const chartHeight = 250
const chartWidth = 250

export function Multiples ({ rawData }) {
  const [tooltipDate, setTooltipDate] = useState(null)
  
  const teamCounts = useMemo(() => {
    if (!rawData) return;
    return getTeamCounts(rawData)
  }, [rawData])

  //xScale domain: ["0", "1", ..."14"], range: [50, 200] 
  //yScale domain: [0, 18], range: [200, 50]

  const derived = useMemo(() => {
    if (!teamCounts) return;

    return {
      teams: getTeams(teamCounts),
      xScale: scalePoint().domain(Object.keys(teamCounts.total)).range([margin.left, height - margin.right]),
      yScale: getYScale(teamCounts),
      teamData: getChartData(teamCounts)
    }
  }, [teamCounts])
  
 
  if (!derived) return 'Loading'
  // console.log(Math.ceil(derived.teamData.length / numChartsPerRow) * chartHeight)

  const showTooltip = event => {
    const bounds = event.target.getBoundingClientRect()
    const x = event.clientX - bounds.left - margin.left

    // https://stackoverflow.com/a/38746923
    const eachBand = derived.xScale.step()
    const index = Math.round((x / eachBand))
    const val = derived.xScale.domain()[index]

    // console.log(derived.xScale.domain())

    // console.log('tooltip', val)
    setTooltipDate(val)
  }

  const hideTooltip = () => setTooltipDate(null)

  const tooltipX = tooltipDate && derived.xScale(tooltipDate)
  // console.log(tooltipX)

  return (
    <div className='chart-grid'>
      {derived.teamData && derived.teamData.map(({team, data}) => 
        <svg width={chartWidth} height={chartHeight}
          onMouseMove={showTooltip}
          onMouseOut={hideTooltip}
          key={team}
        >
          <text
            x={chartWidth / 2}
            y={margin.top}
            style={{ fontWeight: 'bold', fontSize: '1.25em' }}
          >
            {team}
          </text>
          <Chart
            data={data}
            xScale={derived.xScale}
            yScale={derived.yScale}
          />
          {tooltipDate !== null && tooltipDate !== undefined &&
            <g>
              <line
                x1={tooltipX}
                y1={margin.top}
                x2={tooltipX}
                y2={chartHeight - margin.bottom}
                style={{stroke: '#999', strokeDasharray: 5}}
              />
              <text
                x={tooltipX + 5}
                y={derived.yScale(data.find(d => d[0] === tooltipDate)[1])}
                style={{fill: '#000', fontWeight: 'bold', fontSize: '1.15em'}}
              >
                {data.find(d => d[0] === tooltipDate)[1]}
              </text>
            </g>
          }
        </svg>
      )}
  </div>
  )
}