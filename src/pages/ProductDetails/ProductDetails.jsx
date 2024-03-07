import { GetProductImages, getProduct } from "@/api/ProductsApi";
import { GetAverageRatingByProductId } from "@/api/ReviewApi";
import Reviews from "@/components/Reviews/Reviews";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from 'react';
import Zoom from 'react-img-zoom';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { toast } from "sonner";

function ProductDetails() {
    const { addToCart } = useCart()

    const { state } = useLocation()
    const [product, setProduct] = useState()
    const [productImages, setProductImages] = useState()
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState()
    const [size, setSize] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        console.log(state)

        getProduct(state?.productId).then(resp => {
            setProduct(resp)
            GetProductImages(resp?.imageURL).then(resp => {
                console.log(resp);
                setProductImages(resp?.productImageMapping?.productImages)
            })
        })
        GetAverageRatingByProductId(state?.productId).then(resp => {
            console.log(resp);
            setRating(resp)
        })


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

    const handleAddToCart = () => {

        const added = addToCart(product, productImages, qty,size)
        if (added) {
            toast("Item Added to Cart", {
                action: {
                    label: "View Cart",
                    onClick: () => navigate('/cart'),
                },
            })
        }
        else {
            toast("Item Already In Cart", {

                action: {
                    label: "View Cart",
                    onClick: () => navigate('/cart'),
                },
            })
        }

    }

    return (
        <div className='container  p-10 md:pt-20'>
            <div className='md:flex md:h-[80vh]'>
                <div className='left  md:w-1/2 m-3 '>

                    <Carousel setApi={setApi} className='mb-20 md:h-[70vh]'>
                        <CarouselContent>
                            {productImages?.map((image, index) => (

                                <CarouselItem key={image?.id} className='flex items-center justify-center md:h-[70vh]'>
                                    <Zoom
                                        img={image?.url}
                                        zoomScale={3}
                                        width={600}
                                        height={600}
                                    />
                                    {/* <img className={`scale-90 items-center object-cover `} src={image?.url} alt="" /> */}
                                    {/* ${image?.height > image?.width ? 'h-[500px]' : 'w-full'} rounded-xl` */}

                                </CarouselItem>
                            ))}
                        </CarouselContent >
                        <CarouselPrevious className='h-full border-white hidden' />
                        <CarouselNext className='h-full border-white hidden' />
                    </Carousel>
                    {/* <div className="py-2 text-center text-sm text-muted-foreground">
                    Slide {current} of {count}
                </div> */}
                    <div className='thumbnail flex flex-wrap  -mt-20  gap-10 items-center '>
                        {productImages?.map((image, index) => (
                            <img key={image?.id} src={image?.url} alt="" onMouseEnter={() => { setCurrent(index + 1); api && api.scrollTo(index); }} className={current === index + 1 ? 'h-16 border-2 cursor-pointer border-black  scale-150 duration-200  rounded-lg' : 'cursor-pointer h-14'}

                            />
                        ))}
                    </div>

                </div>
                <div className='right md:w-1/2 p-6 rounded-md border m-5'>

                    <h2 className='text-2xl font-bold mb-4'>{product?.name}</h2>
                    <p className=' mb-2'>{product?.description}</p>
                    <div className='flex items-center mb-2'>
                        <span className='text-lg font-bold text-green-600 mr-2'>Rs.{product?.discountedPrice}</span>
                        <del className=' mr-2'>{product?.price}</del>
                        <span > {Math.ceil((product?.price - product?.discountedPrice) / product?.price * 100)}% Off</span>
                    </div>
                    {rating ? <div className='flex items-center mb-2 w-full'>

                        <Rating
                            transition
                            initialValue={rating}
                            readonly
                            allowFraction
                        />
                        <span className='text-yellow-500'>{rating} stars</span>
                    </div>
                        :
                        <div>
                            <span>No Reviews Yet</span>
                        </div>
                    }

                    <p className=' mb-2'>Warranty: {product?.warranty}</p>
                    <p className=' mb-2'>Brand: {product?.brand}</p>
                    <p className=' mb-2'>Details: {product?.details}</p>
                    <p className=' mb-2'>Color: {product?.color}</p>
                    <p className=' mb-2'>Category: {product?.category.description}</p>
                    <span className="mb-2">Size: </span>
                    <div className="flex flex-wrap justify-between m-3 ">
                        {product?.size.split(',').map((sizeStr, index) => (
                            <div key={index} className={`border rounded-full text-sm text-center m-2 p-2 h-10 w-16 cursor-pointer ${sizeStr==size?'border-2 border-black font-bold':''}`} onClick={()=>{setSize(sizeStr);console.log(sizeStr)}}>
                                {sizeStr}
                            </div>
                        ))}

                    </div>

                    <Select value={qty.toString()} defaultValue={qty.toString()} onValueChange={(value) => { setQty(value) }}>
                        <SelectTrigger className="w-16 m-3">
                            <SelectValue placeholder="Qty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                <SelectLabel>Qty</SelectLabel>
                                <SelectItem value="1" >1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <div className="flex">
                    <Button className='mr-5 h-14 w-1/2 ml-3' onClick={()=>{}}>Buy Now</Button>
                    <Button variant='secondary' className='mr-5 h-14 w-1/2 ' onClick={handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
            </div>
            <div className=''>
                Item Details
            </div>

            <Reviews productId={state?.productId} rating={rating} />

        </div>

    )
}

export default ProductDetails