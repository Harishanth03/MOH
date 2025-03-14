import React from 'react'
import Header from '../Components/Header'
import SpecializeMenu from '../Components/SpecializeMenu'
import TopDoctors from '../Components/TopDoctors'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecializeMenu/>
      <TopDoctors/>
    </div>
  )
}

export default Home