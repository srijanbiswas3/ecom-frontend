import React, { useState } from 'react'

function Cart() {
    const [carItems, setCarItems] = useState()
    return (
        <div className='m-20'>
            <div className='rounded-xl h-20 bg-slate-100 text-end p-10'>Sub Total : Rs.3479</div>

        </div>
    )
}

export default Cart