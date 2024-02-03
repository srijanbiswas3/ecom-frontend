import { GetBrands } from '@/api/HomeApi'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"


function Brands() {
    const [brands, setBrands] = useState([])
    useEffect(() => {
        getBrands()
    }, [])

    const getBrands = () => {
        GetBrands().then(resp => {
            console.log(resp.brands)
            setBrands(resp.brands);
        })
    }
    return (
        <div className='brands m-5'>
            Shop by Brands
            {brands.length == 0 ? <Skeleton className="h-44 w-full rounded-xl m-5" />
                : <div className='flex justify-between m-5'>
                    {brands.map((brand, index) => (
                        <div key={brand?.id} className='m-1 bg-white rounded-lg h-40 w-40 justify-center items-center flex'>
                            <img className='h-24 cursor-pointer' src={brand?.brandLogo?.url} alt="" />
                        </div>
                    ))}

                </div>}
        </div>
    )
}

export default Brands