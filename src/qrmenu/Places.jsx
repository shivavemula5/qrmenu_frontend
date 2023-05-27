import React, { useContext, useEffect, useState } from 'react'
import { Row , Col  } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { Modal } from 'react-bootstrap'
import AddPlace from './AddPlace'
import { useNavigate } from 'react-router-dom'

const Places = () => {

    const [show,setShow] = useState(false)
    const [places, setPlaces] = useState([])

    const {authValue} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleShow = () => { setShow(true) }
    const handleHide = () => { setShow(false) }

    const getData = async() => {
        const data = await authValue.GetPlaces()
        setPlaces(data)
    }

    const Done = () => {
        handleHide(false)
        getData()
    }

    const goToPlace = (e,id) => { return navigate(`/places/${id}/`) }

    useEffect(()=>{
        authValue.Profile()
        const response = async() => {
            getData()
        }
        response()
    },[])

    return ( 
        <section>
            
            <Modal show={show} onHide={handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Place</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddPlace Done={Done}/>
                </Modal.Body>
            </Modal>

            <h3 className='placeHeading'>My Places</h3>
            <Row>
                <Col lg={4}>
                    <div className='addPlace' onClick={handleShow}> Add Place </div>
                </Col>
                {
                    places.map(place=>
                    (
                        <Col lg={4} key={place.id} className='placeHolder' onClick={(e,id=place.id)=>goToPlace(e,id)}>
                            <img className='place' src={place.image} />
                            <p className='placeName'>{place.name}</p>
                        </Col>
                    ))
                }
            </Row>
        </section>
     )
}
 
export default Places 