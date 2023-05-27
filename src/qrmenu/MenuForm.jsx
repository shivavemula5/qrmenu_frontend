import { useContext, useEffect, useRef, useState } from "react"
import { Button , Form , Popover , Overlay   } from "react-bootstrap"
import { RiPlayListAddFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { AuthContext } from "../contexts/AuthContext"
import { useParams } from "react-router-dom"

const MenuForm = ({item={},itemCategoryName='',finishTask}) => {

    const [categories,setCategories] = useState([])
    const [categoryName,setCategoryName] = useState('')
    const [categoryForm,setCategoryForm] = useState(false)

    const [categorySelected,setCategorySelected] = useState('')
    const [categorySelectedName,setCategorySelectedName] = useState(itemCategoryName)

    const [itemName,setItemName] = useState(item.name)
    const [itemDescription,setItemDescription] = useState(item.description)
    const [itemImage,setItemImage] = useState(item.image)
    const [itemPrice,setItemPrice] = useState(item.price)
    const [itemAvailable,setItemAvailable] = useState(item.is_available)

    const {authValue} = useContext(AuthContext)
    const params = useParams()
    const target = useRef(null)

    const getCategories = async(place_id=params.id) => {
        const data = await authValue.GetCategories(place_id)
        setCategories(data)
    }

    const addCategory = async(e,place_id,category_name) => {
        e.preventDefault()
        const data = await authValue.AddCategory(place_id, category_name)
        toast(`category ${data.name} has been added successfully`)
        setCategoryForm(false)
        finishTask()
    }

    const handleAddOrUpdateMenuItems = async(e,place,category,name,description,price,image,available) => {
        e.preventDefault()
        console.log(place,category,name,description,price,image,available)
        if (item.id){
            const data = await authValue.UpdateMenuItem(item.place,item.category,item.id,name,description,price,image,available)
            console.log(data)
            toast(`${item.name} has been updated successfully`)
            finishTask()
        }
        else{
            const data = await authValue.AddMenuItems(place,category,name,description,price,image,available)
            if(data){
                console.log(data ,'somethig wrong')
                toast(`${data.name} has been added to the menu successfully`)
                finishTask()
            }
        }
        setItemImage('')
        setItemName('')
        setItemAvailable(false)
        setItemPrice('')
        setItemDescription('')
    }

    const handleChange = (e) => {
        if (e.target.name === 'itemName')
            setItemName(e.target.value)
        else if (e.target.name === 'itemDescription')
            setItemDescription(e.target.value)
        else if (e.target.name === 'itemImage')
            setItemImage(e.target.value)
        else if (e.target.name === 'itemPrice')
            setItemPrice(e.target.value)
        else if (e.target.name === 'itemAvailable')
            setItemAvailable(e.target.checked)
    }

    const handleSelectedCategory = (category) => {
        const getCategory= categories.filter(c=>(
            c.name === category
        ))
        const categoryId = getCategory[0].id
        setCategorySelectedName(category)
        setCategorySelected(categoryId)
    }

    useEffect(()=>{
        getCategories()
    },[])

    return ( 
        <section>
                <Form.Group>
                    <Form.Label>Category</Form.Label>                  
                    <div className="d-flex align-items-center">         
                        <Form.Control as="select" value={categorySelectedName} onChange={(e)=>handleSelectedCategory(e.target.value)}>
                            <option>Select Category</option>
                            {
                                categories.map(category => (
                                    <option key={category.id}>{category.name}</option>
                                ))
                            }
                        </Form.Control>

                        <Button ref={target} className="ml-2" variant="link" onClick={(e)=>setCategoryForm(true)}>
                            <RiPlayListAddFill size={25} /> 
                        </Button>
                        
                        <Overlay show={categoryForm} target={target.current} placement="bottom" rootClose onHide={(e)=>setCategoryForm(false)}>
                            <Popover id="popover-caontained">
                            <Popover.Header>Category</Popover.Header>
                            <Popover.Body>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Control type="text" name="name" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} placeholder="Enter A Name" />
                                </Form.Group>
                                <Button variant="danger" className="button" onClick={(e,place_id=params.id,category_name=categoryName)=>addCategory(e,place_id,category_name)}> Add Category </Button>
                            </Popover.Body>
                            </Popover>
                        </Overlay>                      
                    </div>
                </Form.Group>

                <Form onSubmit={(e,place_id=params.id,category_id=categorySelected,item_name=itemName,item_description=itemDescription,item_image=itemImage,item_price=itemPrice,item_available=itemAvailable) => handleAddOrUpdateMenuItems(e,place_id,category_id,item_name,item_description,item_price,item_image,item_available)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Item Name </Form.Label>
                        <Form.Control type="text" name="itemName" value={itemName} onChange={(e)=>handleChange(e)} placeholder="Enter Item Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Item Description </Form.Label>
                        <Form.Control type="text" name="itemDescription" value={itemDescription} onChange={(e)=>handleChange(e)} placeholder="Enter Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Item Price </Form.Label>
                        <Form.Control type="text" name="itemPrice" value={itemPrice} onChange={(e)=>handleChange(e)} placeholder="Enter Item Price " />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image </Form.Label>
                        <Form.Control type="text" name="itemImage" value={itemImage} onChange={(e)=>handleChange(e)} placeholder="Enter A URL For Image" />
                    </Form.Group>
                        <Form.Label>Available </Form.Label>
                        <Form.Check type="checkbox" name="itemAvailable" checked={itemAvailable} onChange={(e)=>handleChange(e)}/>
                    <Button className='button' variant='primary' type='submit'>Add</Button>
                </Form>
        </section>
     )
}
 
export default MenuForm