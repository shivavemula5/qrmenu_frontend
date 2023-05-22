import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Logout = () => {

    const {authValue} = useContext(AuthContext)

    useEffect(()=>{
        authValue.Logout()
    },[])

    return ( 
        <section className='logoutSection'>
            <h1>
                Thank you for using our website 
            </h1>
        </section>
     )
}
 
export default Logout