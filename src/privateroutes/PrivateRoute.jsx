import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({children}) {
    
    const {authValue} = useContext(AuthContext)

    return (
        authValue.token ? children : <Navigate to='/login/' />
  )
}
