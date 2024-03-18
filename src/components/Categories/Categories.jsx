import { GetCategoryIcon, getAllCategories } from '@/api/CategoriesApi'
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Categories() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategories().then(resp => { setCategories(resp) })

    }, [])

    const categoryClick = (category) => {
        console.log(category)
        navigate('/products')
    }
    return (
        <div className='container my-5 space-y-4'>
            <span className='font-bold'>Shop by Categories</span>
            {categories?.length == 0 ? <Skeleton className="h-44 w-full rounded-xl" />
                :
                <div className='grid grid-cols-2 gap-2 place-items-center md:grid-cols-3 lg:grid-cols-5'>
                    {categories?.map((category, index) => (
                        <div key={category?.id} className='m-1 bg-gray-400 rounded-lg md:h-52 md:w-52 justify-around items-center flex flex-col hover:border overflow-hidden ' onClick={() => categoryClick(category)}>
                            <CategoryImageComponent imgurl={category?.imageUrl} />
                            <span className='font-bold z-10 absolute text-white'>{category?.description}</span>
                        </div>
                    ))}

                </div>
            }
        </div>
    )
}
function CategoryImageComponent({ imgurl }) {

    const [categoryIcon, setCategoryIcon] = useState()
    useEffect(() => {
        GetCategoryIcon(imgurl).then(resp => { console.log(resp); setCategoryIcon(resp?.category?.icon?.url) })
    }, [imgurl])

    return (
        <img
            className='w-full object-cover cursor-pointer hover:scale-125 transition-all duration-500 brightness-75 hover:brightness-50'
            src={categoryIcon}
            alt=""
        />

    )

}

export default Categories