import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });
    // const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const addToCart = (product, productImages, qty,size) => {
        const updatedItems = cartItems.filter(item => item.productId == product.id);
        console.log(updatedItems)
        const newCartItem = {
            productId: product?.id,
            productName: product?.name,
            productPrice: product?.price,
            productDiscountedPrice: product?.discountedPrice,
            productColor: product?.color,
            productQty: qty,
            productSize:size,
            productImage: productImages[0].url,
            productChecked:true
        }
        if (updatedItems.length > 0) {
            return false
        }
        else {
            setCartItems(prevItems => [...prevItems, newCartItem])
            return true

        }
    };

    const removeFromCart = (productId) => {
        const updatedItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedItems);
    };
    const totalDiscountCost = () => {
        const total = cartItems.reduce((accumulator, cartItem) => (accumulator + cartItem.productDiscountedPrice*cartItem?.productQty), 0)
        return total;
    }
    const totalCost = () => {
        const total = cartItems.reduce((accumulator, cartItem) => { return accumulator + cartItem?.productPrice*cartItem?.productQty }, 0)
        console.log("total",total)
        return total;
    }

    const updateQty=(productId,qty)=>{
        const updatedItems = cartItems.map(item => { if(item.productId == productId){item.productQty=qty} return item});
        setCartItems(updatedItems);

    }
    const updateProductChecked=(productId)=>{

    }




    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, totalCost, totalDiscountCost,updateQty,updateProductChecked }} >
            {children}
        </CartContext.Provider>
    )

}
const useCart = () => {
    return useContext(CartContext);

}


export { CartContext, CartContextProvider, useCart };

