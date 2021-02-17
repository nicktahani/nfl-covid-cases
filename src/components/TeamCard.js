import React, { useState } from 'react'
import PlayerList from './PlayerList'
import TeamLogo from './TeamLogo'
import '../css/TeamCard.css'

const TeamCard = ({ team, data }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='card'>
      <div onClick={toggleOpen}>
        <TeamLogo 
          team={team} 
          width='200px' 
          height='200px'
        />
      </div>
      {isOpen && <PlayerList team={team} data={data} />}
    </div>
  )
}

export default TeamCard