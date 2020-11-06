import React from 'react'
import { NFL_TEAM_LOGOS } from '../constants/teams'
import '../css/TeamLogos.css'

const TeamLogos = ({ onSelect, ...imgProps }) => {
  return (
    <div className='logos'>
      {NFL_TEAM_LOGOS.map(team => 
        <img 
          {...imgProps}  
          src={`${process.env.PUBLIC_URL}/logos/${team}.svg`} 
          onClick={() => onSelect(team)} 
          key={team}
          alt={team}
        />
      )}
    </div>
  )

}

export default TeamLogos