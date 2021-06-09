import React from 'react'
import '../css/TeamLogo.css'

export function TeamLogo({ team, ...imgProps }) {
  
  return (
    <>
      <img 
        {...imgProps}  
        src={`${process.env.PUBLIC_URL}/logos/${team}.svg`} 
        alt={team}
      />
    </>
  )

}
