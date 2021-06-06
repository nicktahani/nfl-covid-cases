import React from 'react'
import { line } from 'd3-shape'

export function Chart ({ data, xScale, yScale }) {
  const path = line().x(d => xScale(d[0])).y(d => yScale(d[1])) 
  // console.log(data)
  return (
    <>
      <path
        d={path(data)}
        fill='none'
        strokeWidth='3'
        stroke='steelblue'
      />​
    </>
  )
} 