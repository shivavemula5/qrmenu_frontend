import React, { useState } from 'react'
import { Card , Form , Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ResetPasswordConfirm = () => {

    const [email,setEmail] = useState()
    const [reEmail,setReEmail] = useState()

    const params = useParams()

    const handleChange = (e) => {
        if(e.target.name === 'email')
            setEmail(e.target.value)
        if(e.target.name === 'reEmai')
            setReEmail(e.target.value)
        console.log(email,reEmail)
    }

    const handleResetUsernameConfirm = (e,username,reUsername,uid,token) =>{
        e.preventDefault()

    }

    return ( 
        <section className='resetUsernameConfirmSection'>
            <Card className='form'>
                <Card.Body>
                    <Card.Text className='text-center'><h3>Reset Eamil</h3></Card.Text>
                    <Form onSubmit={(e,Username,ReUsername,Uid=params.uid,Token=params.token)=>handleResetUsernameConfirm(e,Username,ReUsername,Uid,Token)}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={(e)=>handleChange(e)} placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicReUsername">
                            <Form.Label>Confirm Username</Form.Label>
                            <Form.Control type="email" name="reEmail" value={reEmail} onChange={(e)=>handleChange(e)} placeholder="Confirm Email" />
                        </Form.Group>

                        <Button className='button' variant="primary" type="submit">Confirm</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
     )
}

export default ResetPasswordConfirm