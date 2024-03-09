import { GetBrands, GetCategories } from '@/api/HomeApi'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

function Categories() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories()
        console.log(categories)
    }, [])

    const getCategories = () => {
        GetCategories().then(resp => {
            console.log(resp.categories)
            setCategories(resp.categories);
        })
    }
    return (
        <div className='container my-5'>
            Shop by Categories
            {categories.length === 0 ? (
                <Skeleton className="h-44 w-full rounded-xl" />
            ) : (
                <div className='flex justify-center md:justify-between flex-wrap items-center w-full'>
                    {categories.map((category, index) => (
                        <div key={category?.id} className='bg-white border  rounded-xl m-1 w-full md:w-44 h-44 items-center justify-center flex flex-col relative overflow-hidden'>
                            <img className='h-full cursor-pointer transition-transform hover:scale-125 ' src={category?.icon?.url} alt="" />
                            <h3 className='text-center font-bold mt-1 rounded-full bg-gray-100 absolute bottom-0 left-0 w-full dark:text-black'>{category?.name}</h3>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Categories