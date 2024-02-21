import { GetReviewsByProductId } from '@/api/ReviewApi';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
function Reviews({ productId,rating }) {

    const [reviews, setReviews] = useState()

    useEffect(() => {

        productId && GetReviewsByProductId(productId).then(resp => {
            console.log(resp);
            setReviews(resp)
        })
    }, [])



    return (

        <div className='flex'>

            <div className='left w-1/2'>
                <h1 className='text-lg font-semibold'>TOTAL RATINGS</h1>
                <Rating
                    transition
                    initialValue={rating}
                   
                    readonly
                    allowFraction
                />
            </div>
            <div className='right ml-10 w-1/2'>
                <h1 className='text-lg font-semibold'>REVIEWS</h1>
                <hr />
                {reviews?.map((review) => (
                    <div className='m-5'>

                        <div className='flex gap-5  '>
                            <span className='font-medium'>{review?.user?.firstName} {review?.user?.lastName}</span>
                            <Rating
                                transition
                                initialValue={review?.rating}
                                size={20}
                                readonly
                                allowFraction
                            />
                        </div>
                        <span className='font-bold block'>{review?.title}</span>
                        <span>{review?.comment}</span>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default Reviews