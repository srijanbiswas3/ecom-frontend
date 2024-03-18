import { getAllBrands } from "@/api/BrandApi"
import { getAllCategories } from "@/api/CategoriesApi"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"


function Filter({ setFilterProducts, filterProducts, products }) {

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [priceRange, setPriceRange] = useState()

    useEffect(() => {
        getAllCategories().then(resp => { setCategories(resp) })
        getAllBrands().then(resp => { setBrands(resp); })
    }, [])

    const prices = [{
        low: 0,
        high: 1000
    },
    {
        low: 1000,
        high: 5000
    },
    {
        low: 5000,
        high: 10000
    },
    {
        low: 10000,
        high: 15000
    },
    {
        low: 15000,
        high: 20000
    }]
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (item, isChecked) => {
        if (isChecked) {
            setCheckedItems([...checkedItems, item]);
        } else {
            setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== item));
        }
    };
    // const [category, setCategory] = useState(catItems)
    return (
        <div className='left border h-screen  p-10 bg-white overflow-y-auto no-scrollbar pb-52 md:pb-5 '>



            <span className='font-bold '>Filters</span>

            <hr />
            <span className='font-medium '>Gender</span>
            <RadioGroup defaultValue="option-one" className='m-3'>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="men" id="women" />
                    <Label htmlFor="men">Men</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="women" id="women" />
                    <Label htmlFor="women">Women</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any">Any</Label>
                </div>
            </RadioGroup>

            <hr />
            <span className='font-medium '>Categories</span>
            <div className="items-top  m-3">
                {categories.map((category, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(isChecked) => handleCheckboxChange(item, isChecked)}
                        />

                        <label className="ml-2">{category?.name}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <span className='font-medium '> Brands</span>
            <div className="items-top  m-3">
                {brands.map((brand, index) => (
                    <div key={index}>
                        <Checkbox
                            onCheckedChange={(checked) => { }}
                        />

                        <label className="ml-2">{brand?.name}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <span className='font-medium '>Price</span>
            <div className="items-top  m-3">
                {prices.map((price, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(checked) => {
                            }}
                        />

                        <label className="ml-2">{price?.low}-{price?.high}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <Slider defaultValue={[33,1000]} max={100} step={1} />

            <span className='font-medium '>Color</span>
            <div className="items-top  m-3">
                {products.map((product, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(checked) => {
                            }}
                        />

                        <label className="ml-2">{product?.color}</label>

                    </div>

                )
                )}
            </div>
            <hr />

        </div >
    )
}

export default Filter