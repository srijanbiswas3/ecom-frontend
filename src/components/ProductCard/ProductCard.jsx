import { GetProductImages } from '@/api/ProductsApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { Skeleton } from "@/components/ui/skeleton"
function ProductCard({ product, rating }) {
    const navigate = useNavigate();

    const [productImages, setProductImages] = useState()

    useEffect(() => {

        GetProductImages(product?.imageURL).then(resp => {
            console.log(resp?.productImageMapping?.productImages);
            setProductImages(resp?.productImageMapping?.productImages)
        })

    }, [])

    return (
        <>
            {!productImages ? <Skeleton className='items-center  flex flex-col h-96 w-56 border rounded-md scale-95' /> :
                <div className='cursor-pointer items-center  flex flex-col h-96 w-56  rounded-md scale-95 transition-transform duration-300 hover:scale-100 hover:border hover:bg-slate-100' onClick={() => { navigate(`${product.id}`, { state: { productId: product?.id } }) }}>
                    <img src={productImages[0]?.url} alt="" className='-z-10 w-full h-64 object-cover scale-90 ' />
                    <h1 className='text-center'>{product?.name}({product?.color})</h1>
                    <div className='flex gap-2'>
                        <Rating
                            transition
                            initialValue={rating?.avgRating}
                            size={20}
                            readonly
                            allowFraction
                        />
                        {/* <h1 className='text-center'>{rating} stars</h1> */}
                        <span className='mt-1'>({rating?.userCount? rating?.userCount:0})</span>
                    </div>

                    <h1 className='text-center'>Rs.{product?.discountedPrice}</h1>
                    <del className='text-center block'>Rs.{product?.price}</del>
                    <h1 className='text-center'>{product?.brand?.name}</h1>
                </div>
            }
        </>
    )
}

export default ProductCard