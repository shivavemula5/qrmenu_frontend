import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import {FaRupeeSign} from 'react-icons/fa'

const MenuItemForCart = ({item,cart,addToCart,deleteFromCart}) => {

    const spanCount = useRef(null)

    return ( 
        <section className='mb-4'>
            <section className='category'>
                <section className='image'>
                    <img src={item.image} />
                </section>
                <section className='body'>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p className='price'><FaRupeeSign /><b>{item.price}</b></p>
                    <section className='increaseDecrease'>
                        <Button className='increase' onClick={(e,Item=item)=>addToCart(Item)} variant='success'>+</Button>
                            <span className='count' ref={spanCount}>
                                {   
                                    cart.map((cartItem)=>(cartItem.id === item.id ? cartItem.quantity :''))
                                }
                            </span>
                        <Button className='decrease' onClick={(e,Item=item)=>deleteFromCart(Item)} variant='danger'>-</Button>
                    </section>
                </section>
            </section>
        </section>
     )
}
 
export default MenuItemForCart