import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CartCard({ cartItem }) {

    const navigate = useNavigate();
    const { removeFromCart, setCartItems, updateProductChecked, updateQty } = useCart()
    const [qty, setQty] = useState(cartItem?.productQty)


    return (
        <div className='rounded-xl  bg-slate-100 p-2 m-1'>

            <div className="flex justify-between">
                <div className='flex'>
                    <img src={cartItem?.productImage} alt="" className="h-32 rounded-lg cursor-pointer " onClick={() => navigate(`/products/${cartItem?.productId}`, { state: { productId: cartItem?.productId } })} />
                    <div className=' m-5'>

                        <h1>{cartItem?.productName} ({cartItem?.productColor})</h1>

                        <div className="flex items-center">
                            <span>Qty : </span>

                            <Select value={qty.toString()} defaultValue={qty.toString()} onValueChange={(value) => { setQty(value); updateQty(cartItem?.productId, value) }}>
                                <SelectTrigger className="w-16 m-3">
                                    <SelectValue placeholder="Qty" />
                                </SelectTrigger>
                                <SelectContent>

                                    <SelectGroup >
                                        <SelectLabel>Qty</SelectLabel>
                                        <SelectItem value="1" >1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="4">4</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            Size: {cartItem?.productSize}
                        </div>
                       


                    </div>
                </div>

                <div className="flex flex-col justify-center mr-5">
                    {/* <Checkbox checked={cartItem?.productChecked} /> */}
                    {qty} X <del>{cartItem?.productPrice}</del>
                    {cartItem?.productDiscountedPrice}
                    
                    <FontAwesomeIcon className='cursor-pointer mt-5 ' icon={faTrash} onClick={() => removeFromCart(cartItem?.productId)} />
                </div>
            </div>

        </div>)
}

export default CartCard