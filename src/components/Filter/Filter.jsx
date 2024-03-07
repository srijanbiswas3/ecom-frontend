import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"

function Filter() {
    const catItems = [{
        id: "heels",
        label: "Heels"
    },
    {
        id: "sandal",
        label: "Sanndal"
    },
    {
        id: "seaker",
        label: "Sneaker"
    },
    {
        id: "rumming",
        label: "Running"
    },
    {
        id: "cauual",
        label: "Casual"
    },
    {
        id: "formal",
        label: "Formal"
    },]
    const [checkedItems, setCheckedItems] = useState([]);
    const handleCheckboxChange = (item, isChecked) => {
        if (isChecked) {
            setCheckedItems([...checkedItems, item]);
        } else {
            setCheckedItems(checkedItems.filter(checkedItem => checkedItem !== item));
        }
    };
    const [category, setCategory] = useState(catItems)
    return (
        <div className='left border h-screen  p-10 '>

            <span>Showing results for :</span>
            <br />

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
                {category.map((item, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(isChecked) => handleCheckboxChange(item, isChecked)}
                        />

                        <label className="ml-2">{item.label}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <span className='font-medium '> Brands</span>
            <div className="items-top  m-3">
                {catItems.map((item, index) => (
                    <div key={index}>
                        <Checkbox

                            onCheckedChange={(checked) => {
                            }}
                        />

                        <label className="ml-2">{item.label}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <span className='font-medium '>Price</span>
            <div className="items-top  m-3">
                {catItems.map((item, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(checked) => {
                            }}
                        />

                        <label className="ml-2">{item.label}</label>
                    </div>
                )
                )}
            </div>
            <hr />
            <span className='font-medium '>Color</span>
            <div className="items-top  m-3">
                {catItems.map((item, index) => (
                    <div key={index} >
                        <Checkbox

                            onCheckedChange={(checked) => {
                            }}
                        />

                        <label className="ml-2">{item.label}</label>

                    </div>

                )
                )}
            </div>
            <hr />

        </div >
    )
}

export default Filter