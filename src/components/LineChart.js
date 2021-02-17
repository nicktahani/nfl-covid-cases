import React, { useMemo } from 'react'
import { extent } from 'd3-array'
import { scaleLinear, scalePoint } from 'd3-scale'
import { line, curveMonotoneX } from 'd3-shape'
import { nest } from 'd3-collection'

function LineChart ({ width = 900, height = 600, data }) {
  const nestedData = nest() 
    .key(d => d.week)
    .rollup(d => d.length)
    .entries(data)

    console.log(nestedData)

  const xScale = useMemo(() => 
    scalePoint()
      .domain(nestedData.map(d => d.key))
      .range([0, width]), 
      [nestedData]
  )
  const yScale = useMemo(() => 
    scaleLinear()
      .domain(extent(nestedData, d => d.value))
      .range([height, 0]), 
      [nestedData]
  )
  const path = useMemo(() => 
    line()
      .x(d => xScale(d.key))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX), 
    [xScale, yScale]
  )
  return (
    <svg width={width} height={height}>
      <path 
        style={{ fill: "none", stroke: 'steelblue', strokeWidth: '2' }} //clean up
        d={path(nestedData)} />
    </svg>
  )
}

export default LineChart