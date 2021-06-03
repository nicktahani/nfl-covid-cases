import React, { useMemo, useRef, useEffect } from 'react'
import { extent } from 'd3-array'
import { scaleLinear, scalePoint } from 'd3-scale'
import { line, curveMonotoneX } from 'd3-shape'
import { nest } from 'd3-collection'
import { select } from 'd3-selection'
import { axisLeft, axisBottom } from 'd3-axis'

function LineChart ({ width = 900, height = 550, data }) {
  const svg = useRef()
  const xAxis = useRef()
  const yAxis = useRef()
  const margin = {top: 20, right: 30, bottom: 30, left: 40}

  const nestedData = useMemo(() => 
    nest() 
      .key(d => d.week)
      .sortKeys((a, b) => a - b)
      .rollup(d => d.length)
      .entries(data),
      [data]
  )

  // console.log(nestedData)

  useEffect(() => {
    if (!svg.current) return;
    
    const XaxisGenerator = axisBottom(xScale)
    const YaxisGenerator = axisLeft(yScale)
    
    select(xAxis.current)
      .call(XaxisGenerator)
    
    select(yAxis.current)
      .call(YaxisGenerator)

  }, [])

  const xScale = useMemo(() => 
    scalePoint()
      .domain(nestedData.map(d => d.key))
      .range([margin.left, width - margin.right]), 
      [nestedData, width, margin]
  )
  const yScale = useMemo(() => 
    scaleLinear()
      .domain(extent(nestedData, d => d.value))
      .range([height - margin.bottom, margin.top]), 
      [nestedData, height, margin]
  )
  const path = useMemo(() => 
    line()
      .x(d => xScale(d.key))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX), 
    [xScale, yScale]
  )
  return (
    <svg ref={svg} width={width} height={height}>
      <path 
        d={path(nestedData)}
        style={{ fill: 'none', stroke: 'steelblue', strokeWidth: '2' }} //clean up 
      />
      <g ref={xAxis} transform={`translate(0, ${height - margin.bottom})`} />
      <g ref={yAxis} transform={`translate(${margin.left}, 0)`} />
    </svg>
  )
}

export default LineChart