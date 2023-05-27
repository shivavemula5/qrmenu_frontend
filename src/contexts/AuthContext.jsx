import React, { createContext , useState } from 'react'
import { toast  } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

export const AuthContext = createContext()

const AuthProvider= (props) => {

    const [token,setToken] = useState(localStorage.getItem('token'))
    const [name,setName] = useState(localStorage.getItem('name'))
    const [loading,setLoading] = useState(false)

    const Request = async(path,method='GET',data=null) => {
        try{
            const response = await fetch(path,{
                method : method,
                headers : {
                    Authorization: token ? `Token ${token}` : '',
                    "content-type" : "application/json",
                },
                body : (method!=='GET' && method!=='DELETE') ? JSON.stringify(data) : null,
            })
            if(response.status >= 500){
                toast('server error : '+response.status)
                throw new Error(response)
            }
            const json = method !== 'DELETE' ? await response.json() : null
            console.log(json)
            if(response.status === 400){
                Object.keys(json).map(err => (
                    toast('client error : ' + err)
                ))
                throw new Error(response)
            }
            if(json && response.status !== 204)
                return json 
        }catch(error){
            console.log(error)
            return 'error'
        }
    }

    const handleError = (message) => {
        if(typeof(message)==='string' && message === 'error')
            return true
        return false
    }

    const createSpinner = (message) =>{
        if(loading)
            return (<Spinner className='spinner' size='sm' animation="border" /> )
        else
            return message
    }

    const Register = async(name,dob,email,password,re_password,callback) => {
        setLoading(true)
        const path = '/users/'
        const method = 'POST'
        const data = {'name':name,'dob':dob,'email': email,'password':password,'re_password':re_password}
        const message = await Request(path,method,data)
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        callback()
    }   

    const Login = async(email,password,callback) => {
        setLoading(true)
        const path = '/token/login/'
        const method = 'POST'
        const data = {'email': email, 'password': password}
        const message = await Request(path,method,data)
        if(handleError(message)){
            setLoading(false)
            return 
        }
        localStorage.setItem('token',message.auth_token)
        setToken(message.auth_token)
        setLoading(false)
        callback()
    } 

    const Logout = () => {
        setLoading(true)
        setName('')
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setLoading(false)
    }   

    const Profile = async() => {
        const path = '/users/me/'
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message))
            return 
        setName(message.name)
        localStorage.setItem('name',message.name)
        setLoading(false)
    }   

    const GetPlaces = async() => {
        const path = '/places/'
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message))
            return 
        return message 
    }

    const AddPlace = async(name,image) => {
        const path = '/places/'
        const method = 'POST'
        const data = {'name': name, 'image': image}
        const message = await Request(path,method,data)
        if(handleError(message))
            return 
    }

    const GetPlace = async(id) => {
        const path = `/places/${id}/`
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message))
            return 
        return message
    }

    const GetCategories = async(place_id) => {
        const path   = `/places/${place_id}/categories/`
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message)) 
            return 
        return message
    }

    const AddCategory = async(place_id,category_name) => {
        const path    = `/places/${place_id}/categories/`
        const method  = 'POST'
        const data    = {'place':place_id,'name':category_name}
        const message = await Request(path,method,data)
        if(handleError(message))
            return 
        return message
    }

    const AddMenuItems = async(place_id,category_id,item_name,item_description,item_price,item_image,item_available) =>{
        const path = `/places/${place_id}/categories/${category_id}/menu/`
        const method = 'POST'
        const data = {'place':place_id,'category':category_id,'name':item_name,'description':item_description,'image':item_image,'price':item_price,'available':item_available}
        const message = await Request(path,method,data)
        console.log(message)
        if(handleError(message))
            return 
        return message
    }

    const GetMenuItem = async(place_id,category_id,item_id) => {
        const path = `/places/${place_id}/categories/${category_id}/menu/${item_id}/`
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message))
            return
        return message
    }

    const UpdateMenuItem = async(place_id,category_id,item_id,item_name,item_description,item_price,item_image,item_available) => {
        const path = `/places/${place_id}/categories/${category_id}/menu/${item_id}/`
        const method = 'PATCH'
        const data =  {'place':place_id,'category':category_id,'name':item_name,'description':item_description,'image':item_image,'price':item_price,'available':item_available}
        const message = await Request(path,method,data)
        if (handleError(message))
            return 
        return message 
    }

    const DeletePlace = async(place_id) => {
        const path = `/places/${place_id}/`
        const method = 'DELETE'
        const message = await Request(path,method)
        if(handleError(message))
            return 
        return place_id
    }
    
    const DeleteCategory = async(place_id,category_id) => {
        const path = `/places/${place_id}/categories/${category_id}/`
        const method = 'DELETE'
        const message = await Request(path,method)
        if (handleError(message))
            return 
        return category_id
    }
    
    const DeleteMenuItem = async(place_id,category_id,menuitem_id) => {
        const path = `/places/${place_id}/categories/${category_id}/menu/${menuitem_id}/`
        const method = 'DELETE'
        const message = await Request(path,method)
        if (handleError(message))
            return 
        return menuitem_id   
    }

    const IncreaseTables = async(place_id,place_name,place_image,tables)=>{
        const path = `/places/${place_id}/`
        const method = 'PUT'
        const data = {'name':place_name,'image':place_image,'number_of_tables':tables}
        const message = await Request(path,method,data)
        if(handleError(message))
            return 
        return message 
    }

    const DecreaseTables = async(place_id,place_name,place_image,tables)=>{
        const path = `/places/${place_id}/`
        const method = 'PUT'
        const data = {'name':place_name,'image':place_image,'number_of_tables':tables}
        const message = await Request(path,method,data)
        if(handleError(message))
            return 
        return message 
    }

    const Menu = async(place_id) => {
        const path = `/menu/${place_id}/`
        const method = 'GET'
        const message = await Request(path,method)
        if(handleError(message))
            return 
        return message 
    }

    const authValue = {
        token,
        name,
        loading,
        createSpinner,
        Register,
        Login,
        Logout,
        Profile,
        AddPlace,
        AddCategory,
        AddMenuItems,
        GetPlaces,
        GetPlace,
        GetCategories,
        GetMenuItem,
        UpdateMenuItem,
        DeletePlace,
        DeleteCategory,
        DeleteMenuItem,
        IncreaseTables,
        DecreaseTables,
        Menu,
    }

    return ( 
        <AuthContext.Provider value={{authValue}}> {props.children} </AuthContext.Provider>
     )
}
 
export default AuthProvider