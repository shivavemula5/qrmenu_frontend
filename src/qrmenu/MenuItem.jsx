import React from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {FaEdit} from 'react-icons/fa'
import { Button } from 'react-bootstrap'

const MenuItem = ({item,handleEdit,handleDeleteMenuItem}) => {

    const handleOpacity = (available) => {
        if(available)
            return "menuItem removeOpacity"
        return "menuItem applyOpacity"
    }

    return ( 
        <section>
            <section className={handleOpacity(item.is_available)}>
                <section className='image'> <img src={item.image}/></section>
                <section className='body'>
                    <section className='headers'>
                        <h3 className='mt-2'> {item.name}  </h3>
                        <section className='headerIcons'>
                            <Button variant='standard' onClick={(e)=>handleEdit(e,item.place,item.category,item.id)}><FaEdit size={20}/></Button>
                            <Button variant='standard' onClick={(e,place_id=item.place,category_id=item.category,menu_id=item.id)=>handleDeleteMenuItem(e,place_id,category_id,menu_id)}><AiFillDelete size={20} /></Button>
                        </section>
                    </section>
                    <section className='content'><p>${item.price}</p></section>
                </section>
            </section>
        </section>
        )
    }
 
export default MenuItem