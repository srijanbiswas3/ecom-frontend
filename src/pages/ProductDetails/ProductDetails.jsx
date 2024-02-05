import { GetProduct } from '@/api/ProductsApi';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

function ProductDetails() {

    const params = useParams();
    const [product, setProduct] = useState()
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log(params.productId)
        getProduct()

    }, [])

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {

            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const getProduct = () => {
        GetProduct(params.productId.toString()).then(resp => {
            console.log(resp.product)
            setProduct(resp.product);
        })
    }

    return (
        <div className='container md:flex p-5 pt-20'>
            <div className='md:w-1/2 m-3 '>

                <Carousel setApi={setApi} className='h-[70vh]'>
                    <CarouselContent>
                        {product?.images.map((image, index) => (

                            <CarouselItem key={image?.id} className='flex items-center justify-center'>
                                <img className={` items-center ${image?.height > image?.width ? 'h-[500px]' : 'w-full'} rounded-xl`} src={image?.url} alt="" />
                            </CarouselItem>
                        ))}
                    </CarouselContent >
                    <CarouselPrevious className='h-full border-white hidden' />
                    <CarouselNext className='h-full border-white hidden' />
                </Carousel>
                {/* <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {current} of {count}
                </div> */}

                <div className=' thumbnail flex flex-wrap space-x-2 mt-5 justify-around items-center z-10'>
                    {product?.images.map((image, index) => (
                        <img key={image?.id} src={image?.url} alt="" onMouseEnter={() => { setCurrent(index + 1); api && api.scrollTo(index); }} className={current === index + 1 ? 'h-20 border-4 border-black scale-150 duration-500 my-2 rounded-lg' : 'cursor-pointer h-20 my-2'}

                        />
                    ))}
                </div>

            </div>
            <div className=' md:w-1/2 p-6 rounded-md shadow-md m-3'>
                <h2 className='text-2xl font-bold mb-4'>{product?.name}</h2>
                <p className=' mb-2'>{product?.description}</p>
                <div className='flex items-center mb-2'>
                    <span className='text-lg font-bold text-green-600 mr-2'>Rs.{product?.discountPrice}</span>
                    <del className=' mr-2'>{product?.price}</del>
                    <span > {Math.ceil((product?.price - product?.discountPrice) / product?.price * 100)}% Off</span>
                </div>
                <div className='flex items-center mb-2'>
                    <span className='text-yellow-500'>{product?.rating} stars</span>
                </div>
                <p className=' mb-2'>Warranty: {product?.warranty}</p>
                <p className=' mb-2'>Brand: {product?.brand}</p>
                <p className=' mb-2'>Details: {product?.details}</p>
                <p className=' mb-2'>Color: {product?.color}</p>
            </div>


        </div>

    )
}

export default ProductDetails