import React from 'react'
import { NFL_TEAM_LOGOS } from '../constants/teams'

function TeamLogos ({ onSelect, ...imgProps }) {
  return (
    <>
      {NFL_TEAM_LOGOS.map(team => 
        <img 
          {...imgProps}  
          src={`${process.env.PUBLIC_URL}/logos/${team}.svg`} 
          onClick={() => onSelect(team)} 
          key={team}
          alt={team}
        />
      )}
    </>
  )

}

export default TeamLogos