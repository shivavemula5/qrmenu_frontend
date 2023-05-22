import React from 'react'
import {Modal , Row ,Col} from 'react-bootstrap'
import QRCode from 'react-qr-code'


const QRCodeMenu = ({show,handleHide,place}) => {

    <Modal show={show} onHide={handleHide} size='lg' centered>
        <Modal.Header>
            <Modal.Title>QRCode</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <div className='mt-4 mb-4'>
                <h5>
                    Total tables : <b>{place.number_of_tables}</b>
                </h5>
            </div>
            <Row>
                {
                    Array.from({length: place.number_of_tables},(_,i)=>i+1).map(
                        (qr) => (
                            <Col key={qr} className='mb-4'>
                                <QRCode value={} />
                            </Col>
                        )
                    )
                }
            </Row>
        </Modal.Body>
    </Modal>

    return ( 

     )
}
 
export default QRCodeMenu