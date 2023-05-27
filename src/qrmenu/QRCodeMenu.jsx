import React from 'react'
import {Modal,Row,Col,Button} from 'react-bootstrap'
import QRCodePrint from './QRCodePrint'

const QRCodeMenu = ({show,handleCloseQR,place,handleIncreaseTables,handleDecreaseTables}) => {
    return ( 
        <Modal show={show} onHide={handleCloseQR} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>QRCode</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div className='mt-4 mb-4 handleTables'>
                    <h5>Total tables : <b>{place.number_of_tables}</b></h5>
                    <Button className='handleAddButton1' onClick={(e,place_id=place.id,place_name=place.name,place_image=place.image,place_number_of_tables=place.number_of_tables)=>handleIncreaseTables(e,place_id,place_name,place_image,place_number_of_tables)}>+</Button>
                    <Button className='handleAddButton2' onClick={(e,place_id=place.id,place_name=place.name,place_image=place.image,place_number_of_tables=place.number_of_tables)=>handleDecreaseTables(e,place_id,place_name,place_image,place_number_of_tables)}>-</Button>
                </div>
                <Row>
                    {
                        Array.from({length: place.number_of_tables},(_,i)=>i+1)
                        .map(
                            (table) => (
                                <Col key={table} lg={4} md={6} className='mb-4 mr-4'>
                                    <QRCodePrint table={table} place={place.id} />
                                </Col> 
                            ))
                    }
                </Row>
            </Modal.Body>
        </Modal>
     )
}
 
export default QRCodeMenu