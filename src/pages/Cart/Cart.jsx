import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartCard from './CartCard';

function Cart() {
    const navigate = useNavigate();
    const { cartItems, totalCost, totalDiscountCost } = useCart();

    return (
        <div className='mt-20 flex flex-col-reverse md:flex-row container '>

            <div className='md:w-3/4 h-full'>
                <p className='font-bold'>Items In Cart : {cartItems.length}</p>
                <ScrollArea className='m-4' style={{ height: 'calc(100vh - 200px)' }}> {/* Adjust the height as needed */}
                    {cartItems.map((cartItem, index) => (
                        <CartCard key={cartItem?.productId} cartItem={cartItem} />
                    ))}
                </ScrollArea>
            </div>
            <div className='rounded-xl md:w-1/4 bg-slate-100 text-end p-10 m-5 h-60 flex flex-col justify-end '>
                {cartItems.length > 0 ? (
                    <div className='m-5'>
                        <p>Total Price: <del>{totalCost()}</del></p>
                        <p>You are Saving : {(totalCost() - totalDiscountCost())}</p>
                        <p>Discount : {Math.floor((totalCost() - totalDiscountCost()) / totalCost() * 100)}%</p>
                        <hr />
                        <br />
                        <p className='font-bold'>Sub Total :{totalDiscountCost()}</p>
                    </div>
                ) : (
                    <p className='text-center'>No Items In Cart</p>
                )}
                <Button disabled={cartItems.length > 0 ? false : true} onClick={() => navigate('/payment')}>Proceed To Buy</Button>
            </div>
        </div>
    )
}

export default Cart;
