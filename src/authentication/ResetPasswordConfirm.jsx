import React , { useState } from 'react'
import { Card , Form , Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ResetPasswordConfirm = () => {

    const [password,setPassword] = useState()
    const [rePassword,setRePassword] = useState()

    const params = useParams()

    const handleChange = (e) => {
        if(e.target.name === 'password')
            setPassword(e.target.value)
        if(e.target.name === 'rePassword')
            setRePassword(e.target.value)
        console.log(password,rePassword)
    }

    const handleResetPasswordConfirm = (e,username,reUsername,uid,token) =>{
        e.preventDefault()
        
    }

    return ( 
        <section className='resetPasswordConfirmSection'>
            <Card className='form'>
                <Card.Body>
                    <Card.Text className='text-center'><h3>Reset Password</h3></Card.Text>
                    <Form onSubmit={(e,Password,RePassword,Uid=params.uid,Token=params.token)=>handleResetPasswordConfirm(e,Password,RePassword,Uid,Token)}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e)=>handleChange(e)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRePassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="rePassword" value={rePassword} onChange={(e)=>handleChange(e)} placeholder="Reenter Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Confirm</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
     )
}
 
export default ResetPasswordConfirm