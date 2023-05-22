import React, { useState } from 'react'
import { Card , Form , Button } from 'react-bootstrap'

const ChangePassword = () => {

    const [currentPassword,setCurrentPassword] = useState()
    const [password,setPassword] = useState()
    const [rePassword,setRePassword] = useState()

    const handleChange = (e) => {
        if(e.target.name === 'currentPassword')
            setCurrentPassword(e.target.value)
        if(e.target.name === 'password')
            setPassword(e.target.value)
        if(e.target.name === 'rePassword')
            setRePassword(e.target.value)
        console.log(currentPassword,password,rePassword)
    }

    const handleChangePassword = (e,currentPassword,password,rePassword) =>{
        e.preventDefault()
        
    }


    return ( 
            <section className='changePasswordSection'>
                <Card className='form'>
                    <Card.Body>
                        <Card.Text className='text-center'><h3>Change Password</h3></Card.Text>
                        <Form onSubmit={(e,CurrentPassword=currentPassword,Password=password,RePassword=rePassword)=>handleChangePassword(e,CurrentPassword,Password,RePassword)}>
                            <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" name="currentPassword" value={currentPassword} onChange={(e)=>handleChange(e)} placeholder="Current Password" />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={password} onChange={(e)=>handleChange(e)} placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicReUsername">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="rePassword" value={rePassword} onChange={(e)=>handleChange(e)} placeholder="Confirm Password" />
                            </Form.Group>

                            <Button className='button' variant="primary" type="submit">Confirm</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </section>
     )
}
 
export default ChangePassword