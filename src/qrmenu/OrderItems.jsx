import React from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import {RxCross2} from 'react-icons/rx'
 
const OrderItems = ({cart,total}) => {
    return ( 
        <section className='order'>
            {
                cart.map((cartItem) =>
                (
                    <section className='orderItem'>
                        <section className='itemNameAndPrice'>
                            <h3>{cartItem.name}</h3>
                            <p><FaRupeeSign /><b>{cartItem.price}</b></p>
                        </section>
                        <section className='itemQuantity'>
                            <h4> <RxCross2 /> {cartItem.quantity}</h4>
                        </section>
                    </section>
                ))
            }
            <hr />
            <section className='total'>
                <h4>Total </h4>
                <h4><FaRupeeSign size={22}/>{total}</h4>
            </section>
        </section>
     )
}
 
export default OrderItems