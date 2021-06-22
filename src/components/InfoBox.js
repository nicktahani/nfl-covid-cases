//TODO: add a ul for 'some quick facts'
import React from 'react'

export function InfoBox({ header, description }) {
  return (
    <>
      <h3>{header}</h3>
      <p>
        {description}
      </p>
    </>
  )
}