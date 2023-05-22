import React from 'react'
import { Jumbotron , Button , Row ,Col  ,Image } from 'react-bootstrap'

const Home = () => {
    return ( 
        <section className='home'>
                <Row>
                    <Col md={6} className='my-auto'>
                        <h1><b>QR CODE MENU</b></h1>
                        <h5 className='mt-4 mb-4'> 
                            A smart way to share your digital menu in a QR code with uour customers
                        </h5>
                        <br />
                            <Button className='btn btn-danger' size='lg' href='/places'>Create Your Menu</Button>
                    </Col>
                    <Col md={6}>
                        <Image src="https://assets.materialup.com/uploads/ae60e834-349c-4c94-8189-2450f09ad37a/preview.gif" rounded fluid />
                    </Col>
                </Row>
        </section>
    )
}
 
export default Home