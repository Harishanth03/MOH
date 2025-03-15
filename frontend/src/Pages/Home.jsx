import React from 'react'
import Header from '../Components/Header'
import SpecializeMenu from '../Components/SpecializeMenu'
import TopDoctors from '../Components/TopDoctors'
import Banner from '../Components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecializeMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home