import React, { useContext, useState } from 'react'
import { Form ,Button } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

const AddPlace = ({Done}) => {  

    const [name,setName] = useState('')
    const [image,setImage] = useState('')

    const {authValue} = useContext(AuthContext)

    const handleChange = (e) => {
        if(e.target.name === 'name')
            setName(e.target.value)
        else if(e.target.name === 'image')
            setImage(e.target.value)
    }

    const handleAddPlace = (e,name,image) => {
        e.preventDefault()
        authValue.AddPlace(name,image)
        Done()
    }

    return ( 
        <section>   
            <Form onSubmit={(e,Name=name,Image=image)=>handleAddPlace(e,Name,Image)}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name </Form.Label>
                    <Form.Control type="text" name="name" value={name} onChange={(e)=>handleChange(e)} placeholder="Enter A Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image </Form.Label>
                    <Form.Control type="text" name="image" value={image} onChange={(e)=>handleChange(e)} placeholder="Image Link" />
                </Form.Group>
                <Button className='button' variant='primary' type='submit'>Add</Button>
            </Form>
        </section>
     )
}
 
export default AddPlace