import React, { useState } from 'react'
import { Card , Form , Button } from 'react-bootstrap'


const ResetUsername = () => {

    const [email,setEmail] = useState()

    const handleChange = (e) => {
        if(e.target.name === 'email')
            setEmail(e.target.value)
    }

    const handleResetPassword = (e,email) => {
        e.preventDefault()

    }

    return ( 
        <section className='resetPasswordSection'>
            <Card className='form'>
                <Card.Body>
                    <Card.Text className='text-center'><h3>Login</h3></Card.Text>
                    <Form onSubmit={(e,Email=email)=>handleResetPassword(e,Email)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e)=>handleChange(e)} placeholder="Enter email" />
                        </Form.Group>
                        <Button className='button' variant="primary" type="submit">Reset Username</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
     )
}
 
export default ResetUsername