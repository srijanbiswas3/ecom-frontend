import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getCarousells } from '@/api/HomeApi'
import { Skeleton } from "@/components/ui/skeleton"
import Autoplay from "embla-carousel-autoplay"


function CarouselComponent() {
  const [carousels, setCarousels] = useState([])

  useEffect(() => {
    getCarousals()

  }, [])

  const getCarousals = () => {
    getCarousells().then(resp => {
      console.log(resp.carousells[0].image.url);
      setCarousels(resp.carousells)
    })
  }

  return (
    <>
      {carousels.length == 0 ? <Skeleton className="h-96  w-full rounded-xl m-5" />
        : <Carousel plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}>
          <CarouselContent>
            {carousels.map((carousel, index) => (

              <CarouselItem key={carousel?.id} className='h-96 flex items-center justify-center'>
                <img className='h-96 items-center object-center rounded-xl' src={carousel?.image?.url} alt="" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>}
    </>

  )
}

export default CarouselComponent