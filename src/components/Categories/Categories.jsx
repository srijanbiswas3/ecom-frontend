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
        <div className='brands m-5'>
            Shop by Categories
            {categories.length==0 ? <Skeleton className="h-44 w-full rounded-xl m-5" />
                : <div className='flex justify-center md:justify-between m-5 flex-wrap items-center'>
                    {categories.map((category, index) => (
                        <div key={category?.id} className='bg-white shadow-lg p-5 rounded-xl m-1 w-full md:w-44 h-44 items-center justify-center flex flex-col'>
                            <img className='h-24 cursor-pointer' src={category?.icon?.url} alt="" />
                            <h3 className='text-center font-bold mt-1 dark:text-black'>{category?.name}</h3>
                        </div>
                    ))}

                </div>}
        </div>
    )
}

export default Categories