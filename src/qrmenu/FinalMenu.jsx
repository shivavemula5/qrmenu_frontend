import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import MenuItemForCart from './MenuItemForCart'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import OrderItems from './OrderItems'
import {RxCross2} from 'react-icons/rx'


const FinalMenu = () => {

    const [menu,setMenu] = useState({})
    const [categories,setCategories] = useState([])

    const [cart,setCart] = useState([])
    const [cartCount,setCartCount] = useState(0)

    const [show,setShow] = useState(false)

    const handleShow = () => {setShow(true)}
    const handleHide = () => {setShow(false)}

    useEffect(() => {
        const total = cart.reduce((accumulator,cartItem) => accumulator + cartItem.quantity,0)
        setCartCount(total)
    })

    const calculateCartValue = () => {
        const total = cart.reduce((accumulator,cartItem) => accumulator + (cartItem.quantity*cartItem.price),0)
        return total
    }

    const modifyCart = (item,add) => {
        let newItem = {}
        const exists = cart.find(cartItem => cartItem.id === item.id)
        if(exists === undefined) {
            newItem['quantity'] = 1
            newItem ['id']   = item.id
            newItem['name']  = item.name
            newItem['price'] =item.price
            const allCartItems = [...cart]
            allCartItems.push(newItem)
            setCart(allCartItems)
            return 
        }
        const updatedObjects = cart.map(cartItem => {
            if (cartItem.id === exists.id){
                const finalQuantity = parseInt(exists.quantity)+add
                return {...cartItem,quantity:finalQuantity}
            }
            return cartItem
        })
        setCart(updatedObjects)
    }

    const addToCart = (item) => {
        modifyCart(item,1)
    }

    const deleteFromCart = (item) => {
        modifyCart(item,-1)
    }

    const {authValue} = useContext(AuthContext)
    const params = useParams()

    const getMenu = async(place_id = params.place)=>{
        const data = await authValue.Menu(place_id)
        const {category} = data
        setMenu(data)
        setCategories(category)
    }

    useEffect(()=>{
        getMenu()
    },[])

    return ( 
        <section className='mainMenu'>
            {console.log(categories)}
            <section className='heading text-center mt-5 mb-5'>
                <h2>{menu.name}</h2>
            </section>
            <section className='body'>
                {
                    categories.map(category=>(
                        <section key={category.id}>
                            <section className='singleCategory'>
                                <section className='heading'>
                                    <h3 >{category.name}</h3>
                                </section>
                                <section>
                                    {
                                        category.menuitem.map(menuitem=>(
                                            <section key={menuitem.name}>
                                                <MenuItemForCart cart={cart} item={menuitem} addToCart={addToCart} deleteFromCart={deleteFromCart} />
                                            </section>
                                        ))
                                    }
                                </section>
                            </section>
                        </section>
                    ))
                }      
            </section>

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title className='modalTitle'>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body className='container modalBody'>
                    <OrderItems cart={cart} total={calculateCartValue()} />
                    <Button variant='secondary' onClick={handleHide} className='goBack'><RxCross2 size={30} /></Button>
                </Modal.Body>
            </Modal>

            <section className='cart' >
                <Button className='cartSymbol' variant='standard' onClick={handleShow}><AiOutlineShoppingCart size={40} />
                    <span className='cartCount'>{cartCount}</span>
                </Button>
            </section>
        </section>
     )
}
 
export default FinalMenu