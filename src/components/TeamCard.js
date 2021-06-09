import React, { useState } from 'react'
import { PlayerList } from './PlayerList'
import { TeamLogo } from './TeamLogo'
import '../css/TeamCard.css'

export function TeamCard({ team, rawData }) {
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
      {isOpen && <PlayerList team={team} rawData={rawData} />}
    </div>
  )
}
