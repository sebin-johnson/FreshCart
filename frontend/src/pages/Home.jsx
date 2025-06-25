import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import { Element } from 'react-scroll';


const Home = () => {
  return (
    <>
      <div className='mt-10'>
        <Banner />
        <Element name='category'><Categories /></Element>
        <Element name='bestSeller'><BestSeller /></Element>
        <BottomBanner />
      </div>
    </>
  )
}

export default Home
