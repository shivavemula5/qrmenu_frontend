import React, { useContext, useState } from 'react'
import { Form , Button, Card } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [name,setName] = useState('')
    const [dob,setDob] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')

    const {authValue} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name === 'name')
            setName(e.target.value)
        if(e.target.name === 'dob')
            setDob(e.target.value)
        if(e.target.name === 'email')
            setEmail(e.target.value)
        if(e.target.name === 'password')
            setPassword(e.target.value)
        if(e.target.name === 'rePassword')
            setRePassword(e.target.value)
        console.log(name,dob,email,password,rePassword)
    }

    const handleRegister = (e,name,dob,email,password,rePassword,callback=()=>{return navigate('/login')}) => {
        e.preventDefault()  
        authValue.Register(name,dob,email,password,rePassword,callback)
    }

    return ( 
        <section className='registerSection'>
            <Card className='form'>
                <Card.Body>
                    <Card.Text className='text-center title'>Registration</Card.Text>
                    <Form onSubmit={(e,Name=name,Dob=dob,Email=email,Password=password,RePassword=rePassword)=>handleRegister(e,Name,Dob,Email,Password,RePassword)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={name} onChange={(e)=>handleChange(e)} placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" value={dob} onChange={(e)=>handleChange(e)} placeholder="Enter Date Of Birth" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={email} onChange={(e)=>handleChange(e)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={password} onChange={(e)=>handleChange(e)} placeholder="Password" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRePassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="rePassword" value={rePassword} onChange={(e)=>handleChange(e)} placeholder="Re Enter Password" />
                        </Form.Group>

                        <Button className='button' variant="primary" disabled={authValue.loading} type="submit">{authValue.createSpinner('Register')}</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
     )
}
 
export default Register