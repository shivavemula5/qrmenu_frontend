import React, { useContext, useEffect, useState } from 'react'
import { Card , Form , Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Login= () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {authValue} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=>{
        if(authValue.token)
            return navigate('/')
    },[])

    const handleChange = (e) => {
        if(e.target.name === 'email')
            setEmail(e.target.value)
        if(e.target.name === 'password')
            setPassword(e.target.value)
    }

    const handleLogin = (e,email,password,callback=()=>{return navigate('/places')}) => {
        e.preventDefault()
        authValue.Login(email,password,callback)
    }

    return ( 
        <section className='loginSection'>
          <Card className='form'>
                <Card.Body>
                    <Card.Text className='text-center'>Login</Card.Text>
                    <Form onSubmit={(e,Email=email,Password=password)=>handleLogin(e,Email,Password)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={(e)=>handleChange(e)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e)=>handleChange(e)} placeholder="Password" />
                        </Form.Group>

                        <Button className="button" variant="primary"type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
     )
}
 
export default Login