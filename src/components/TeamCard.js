//look at slack
import React, { useState } from 'react'
// import Logo from './Logo'
import PlayerList from './PlayerList'
import TeamLogos from './TeamLogos'
import '../css/TeamCard.css'

const TeamCard = ({ team, data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)

  const handleSelectTeam = team => {
    setSelectedTeam(team)
    toggleOpen()
  }
  
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='card'>
      <TeamLogos 
        team={team} 
        handleSelectTeam={handleSelectTeam} 
        width='200px' 
        height='200px'
      />
      {(isOpen && selectedTeam) && <PlayerList team={selectedTeam} data={data} />}
    </div>
  )
}

export default TeamCard