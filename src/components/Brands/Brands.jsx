import { GetBrandLogo, getAllBrands } from '@/api/BrandApi'
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from 'react'


function Brands() {
    const [brands, setBrands] = useState([])
    useEffect(() => {
        getAllBrands().then(resp => {
            setBrands(resp);
        })

        // getBrands()
    }, [])

    // const getBrands = () => {
    //     GetBrands().then(resp => {
    //         console.log(resp.brands)
    //         setBrands(resp.brands);
    //     })
    // }
    const brandClick = (brand) => {
        console.log(brand)
    }
    return (
        <div className='container my-5 space-y-4'>
            <span className='font-bold'>Shop by Brands</span>
            {brands.length == 0 ? <Skeleton className="h-44 w-full rounded-xl" />
                :
                <div className='grid grid-cols-2 gap-2 place-items-center md:grid-cols-4'>
                    {brands.map((brand, index) => (
                        <div key={brand?.id} className='m-1 bg-white rounded-lg h-40 w-full md:w-40 justify-around items-center flex flex-col hover:border p-5' onClick={() => brandClick(brand)}>
                            <BrandImageComponent imgurl={brand?.logoUrl} />
                            {/* <span className='font-bold'>{brand?.name}</span> */}
                        </div>
                    ))}

                </div>
            }
        </div>
    )
}

function BrandImageComponent({ imgurl }) {

    const [brandImage, setBrandImage] = useState()
    useEffect(() => {
        GetBrandLogo(imgurl).then(resp => { setBrandImage(resp?.brand?.brandLogo?.url) })
    }, [imgurl])

    return (
        <img className='h-24 object-scale-down cursor-pointer transition-transform hover:scale-110' src={brandImage} alt="" />
    )

}

export default Brands