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
            console.log("current")
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
        <div className='container flex p-5'>
            <div className='w-1/2 -ml-40'>

                <Carousel setApi={setApi} className=''>
                    <CarouselContent>
                        {product?.images.map((image, index) => (

                            <CarouselItem key={image?.id} className='h-[600px] flex items-center justify-center'>
                                <img className=' items-center object-cover w-full scale-75 object-center rounded-xl' src={image?.url} alt="" />
                            </CarouselItem>
                        ))}
                    </CarouselContent >
                    <CarouselPrevious className='h-full border-white' />
                    <CarouselNext className='h-full border-white' />
                </Carousel>
                {/* <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {current} of {count}
                </div> */}

                <div className='flex space-x-2 mt-5 -ml-20'>
                    {product?.images.map((image, index) => (
                        <img key={image?.id} src={image?.url} alt="" className={current === index + 1 ? 'h-32 border-4 border-black transform scale-125 transition-transform duration-500' : 'h-32 scale-80 '}

                        />
                    ))}
                </div>

            </div>
            <div className='w-1/2 ml-20 p-6 rounded-md shadow-md'>
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