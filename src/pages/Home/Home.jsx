import React from 'react'

import Header from '@/components/Header/Header'

import Categories from '@/components/Categories/Categories'
import CarouselComponent from '@/components/CarouselComponent/CarouselComponent'
import Brands from '@/components/Brands/Brands'

function Home() {
  return (
    <div >

      <div className='container p-5 pt-32'>
        <CarouselComponent />
        <Categories />
        <Brands/>

      </div>
    </div>
  )
}

export default Home