import React from 'react'
import './styles/Header.css'
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

const Header = () => {
  return (
    <div className='header'>
      <PersonIcon className='header-icon'/>
      <DensityLargeIcon className='header-icon'/>
      <MessageIcon className='header-icon'/>
    </div>
  )
}

export default Header
