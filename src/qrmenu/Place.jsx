import React, { useContext, useEffect, useState } from 'react'
import {IoMdArrowBack} from 'react-icons/io'
import {Row,Col,Button} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import MenuForm from './MenuForm'
import MenuItem from './MenuItem'
import { Modal } from 'react-bootstrap'
import {AiFillDelete} from 'react-icons/ai'
import {ImQrcode} from 'react-icons/im'
import { toast } from 'react-toastify'
import QRCodeMenu from './QRCodeMenu'

const Place = () => {

    const [categories,setCategories] = useState([])
    const [place,setPlace] = useState({})
    const [item,setItem] = useState({})
    const [editForm,setEditForm] = useState(false)
    const [qrCode,setQRCode] = useState(false)
    
    const {authValue} = useContext(AuthContext)
    const params = useParams()
    const navigate = useNavigate()

    const goBack = () => { return navigate('/places') }

    const getPlace = async() => {
        const data = await authValue.GetPlace(params.id)
        setPlace(data)
    }

    const handleIncreaseTables = async(e,place_id,place_name,place_image,total_tables) => {
        const table_count = total_tables + 1 
        await authValue.IncreaseTables(place_id,place_name,place_image,table_count)
        getPlace()
    }

    const handleDecreaseTables = async(e,place_id,place_name,place_image,total_tables) => {
        const table_count = total_tables - 1 
        await authValue.DecreaseTables(place_id,place_name,place_image,table_count)
        getPlace()
    }

    const getCategories = async() => {
        const data = await authValue.GetCategories(params.id)
        setCategories(data)
    }

    const getMenuItem = async(place,category,item) => {
        const data = await authValue.GetMenuItem(place,category,item)
        setItem(data)
    }

    const getCategoryName = () => {
        const category = categories.filter(c => (
            c.id === item.category            
        ))
        const name = category.length > 0 ? category[0].name : ''
        return name
    }

    const finishTask = () => {
        handleCloseEditForm()
        getCategories()
    }

    const handleOpenEditForm = () => {setEditForm(true)}
    const handleCloseEditForm = () => {setEditForm(false)}

    const handleShowQR = () => {setQRCode(true)}
    const handleCloseQR= () => {setQRCode(false)}


    const handleEdit = async(e,place,category,item) => {
        await getMenuItem(place,category,item)
        handleOpenEditForm()
    }

    const handleDeletePlace = async(e,place_id) => {
        const message = await authValue.DeletePlace(place_id)
        if(message)
            toast(`Placee with id ${message} is removed from the places list`)
        return navigate('/places')
    }

    const handleDeleteCategory = async(e,place_id,category_id) => {
        const message = await authValue.DeleteCategory(place_id,category_id)
        if(message)
            toast(`Category with id ${message} is removed from the menu`)
        getCategories()
    }

    const handleDeleteMenuItem = async(e,place_id,category_id,menu_id)=>{
        const message = await authValue.DeleteMenuItem(place_id,category_id,menu_id)
        if(message)
            toast(`Food item with id ${message} is removed from the menu`)
        getCategories()
    }

    useEffect(()=>{
        getPlace()
        getCategories()
    },[])


    return ( 
        <section>

            <Modal show={editForm} onHide={handleCloseEditForm}>
                <Modal.Header closeButton={handleCloseEditForm}>
                    <Modal.Title>Menu Item</Modal.Title>
                </Modal.Header>
                <Modal.Body><MenuForm item={item} finishTask={finishTask} itemCategoryName={getCategoryName()} /></Modal.Body>
            </Modal>

            <Row className='justify-content-around'>
                <Col lg={12}>
                    <div className='mb-4'>
                        <div className='d-flex align-items-center justify-content-between mb-4 mt-4'>
                            <Button variant='link' onClick={goBack}><IoMdArrowBack size={25} color='black' /></Button>
                            <h3 className='mb-0 ml-2 mr-2'>{place.name}</h3>
                            <Button variant='standard' onClick={(e,place_id=params.id)=>handleDeletePlace(e,place_id)}><AiFillDelete size={25}/></Button>          
                        </div>
                        <Button variant='link' onClick={handleShowQR}> <ImQrcode size={25} /></Button>
                    </div>
                </Col>
                
                <Col md={4}>
                    <div className='category'>
                        <MenuForm finishTask={finishTask} />
                    </div>
                </Col>       
                <Col md={6}>
                    {
                        categories.map(category => (
                            <section key={category.id}>
                                <section className='categoryHeader'>
                                    <h3>{category.name}</h3>
                                    <Button variant='standard' onClick={(e,place_id=params.id,category_id=category.id)=>handleDeleteCategory(e,place_id,category_id)}><AiFillDelete size={25}/></Button>
                                </section>
                                {
                                    category.menuitem.map((item) => (
                                        <MenuItem key={item.id} item={item} handleEdit={handleEdit} handleDeleteMenuItem={handleDeleteMenuItem} />
                                    ))
                                }
                            </section>
                        ))
                    }
                </Col>
            </Row>
            
            <QRCodeMenu show={qrCode} handleCloseQR={handleCloseQR} place={place} handleIncreaseTables={handleIncreaseTables} handleDecreaseTables={handleDecreaseTables} />
        </section>
     )
}
 
export default Place