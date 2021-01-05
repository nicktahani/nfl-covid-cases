import React from 'react'
import '../css/TeamLogos.css'

const TeamLogos = ({ team, handleSelectTeam, ...imgProps }) => {
  
  return (
    <>
      <img 
        {...imgProps}  
        src={`${process.env.PUBLIC_URL}/logos/${team}.svg`} 
        onClick={() => handleSelectTeam(team)} 
        alt={team}
      />
    </>
  )

}

export default TeamLogos
