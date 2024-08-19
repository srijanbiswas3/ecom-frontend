import { GetChartDataByProductId, GetReviewsByProductId } from '@/api/ReviewApi';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Chart } from "react-google-charts";

function Reviews({ productId, rating }) {

    const [reviews, setReviews] = useState()
    const [chartData, setChartData] = useState()

    useEffect(() => {

        const fetchReviewData = async () => {
            try {
                if (productId) {
                    const data = await GetReviewsByProductId(productId);
                    setReviews(data);

                    const cData = await GetChartDataByProductId(productId);
                    setChartData(cData)

                }
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchReviewData()
    }, [productId])

    const data = [
        [
            "Star",
            "Customer Reviews",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["5 star", chartData?.['5.0'] ?? 0, "#228B22", null],
        ["4.5 star", chartData?.['4.5'] ?? 0, "#228B22", null],
        ["4 star", chartData?.['4.0'] ?? 0, "#ADFF2F", null],
        ["3.5 star", chartData?.['3.5'] ?? 0, "#ADFF2F", null],
        ["3 star", chartData?.['3.0'] ?? 0, "#FF8C00", null],
        ["2.5 star", chartData?.['2.5'] ?? 0, "#FF8C00", null],
        ["2 star", chartData?.['2.0'] ?? 0, "#FF4D4D", null],
        ["1.5 star", chartData?.['1.5'] ?? 0, "#FF4D4D", null],
        ["1 star", chartData?.['1.0'] ?? 0, "#C8102E", null],


    ];

    const options = {
        title: "Reviews",
        width: "100%",
        height: 300,
        legend: { position: "none" },
        hAxis: {
            minValue: 0,  // Ensure the horizontal axis starts at 0
            format: '0',

        },
       
        bar: { groupWidth: '75%' },  // Optional: Adjust the width of the bars
    };

    return (

        <div className='md:flex min-h-52'>

            <div className='left md:w-1/2 ml-10'>
                <h1 className='text-lg font-semibold'>TOTAL RATINGS</h1>
                <Rating
                    transition
                    initialValue={rating?.avgRating}
                    readonly
                    allowFraction
                />
                {rating?.avgRating}
                ({rating?.userCount ?? 0})
                <Chart
                    chartType="BarChart"
                    data={data}
                    options={options}
                />
            </div>
            <div className='right ml-10 md:w-1/2'>
                <h1 className='text-lg font-semibold'>REVIEWS</h1>
                <hr />
                {reviews?.map((review) => (
                    <div key={review?.id} className='m-5'>

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