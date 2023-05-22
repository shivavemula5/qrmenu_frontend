import React from 'react'
import {Button, Form} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const EmailActivation = () => {

    const params = useParams()

    const handleEmailActivation = (e,uid,token) => {
        e.preventDefault()
        
    }

    return ( 
        <section className='emailActivationSection'>
            <Form onSubmit={(e,Uid=params.uid,Token=params.token)=>handleEmailActivation(e,Uid,Token)}>
                <h1>
                    Click on the activate button to activate your account
                </h1>
                <Button variant='primary'>Activate</Button>
            </Form>
        </section>
     )
}
 
export default EmailActivation