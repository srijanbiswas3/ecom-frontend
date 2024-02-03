import React from 'react'

import Header from '@/components/Header/Header'

import Categories from '@/components/Categories/Categories'
import CarouselComponent from '@/components/CarouselComponent/CarouselComponent'
import Brands from '@/components/Brands/Brands'

function HomePage() {
  return (
    <div >

      <div className='carousel container p-5'>
        <CarouselComponent />
        <Categories />
        <Brands/>

      </div>
    </div>
  )
}

export default HomePage