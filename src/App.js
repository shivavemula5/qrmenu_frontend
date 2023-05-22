import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import global from './global.css'

import Layout  from './core/Layout'

import Register from './authentication/Register'
import Login from './authentication/Login'
import Logout from './authentication/Logout'
import Profile from './authentication/Profile'

import EmailActivation from './authentication/EmailActivation'
import ResendEmailActivation from './authentication/ResendEmailActivation'
import EmailActivationDone from './authentication/EmailActivationDone'

import ChangePassword from './authentication/ChangePassword'
import ChangePasswordDone from './authentication/ChangePasswordDone'

import ResetPassword from './authentication/ResetPassword'
import ResetPasswordConfirm from './authentication/ResetPasswordConfirm'
import ResetPasswordDone from './authentication/ResetPasswordDone'

import ResetUsername from './authentication/ResetUsername'
import ResetUsernameConfirm from './authentication/ResetUsernameConfirm'
import ResetUsernameDone from './authentication/ResetUsernameDone'

import AccountDelete from './authentication/AccountDelete'

import PrivateRoute from './privateroutes/PrivateRoute'
import Places from './qrmenu/Places'
import Home from './core/Home'
import Place from './qrmenu/Place'

const App = () => {
    return ( 
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>

                        <Route path="/register" element={<Register />} /> 
                        <Route path="/login" element={<Login />} /> 
                        <Route path="/logout" element={<Logout />} /> 
                        
                        <Route path="/email_activation/:uid/:token" element={<EmailActivation />} /> 
                        <Route path="/resend_activation_mail" element={<ResendEmailActivation />} />                 
                        <Route path="/email_activation_done" element={<EmailActivationDone />} /> 
                    
                        <Route path="/change_password" element={<ChangePassword/>} /> 
                        <Route path="/change_password_done" element={<ChangePasswordDone />} /> 

                        <Route path="/reset_password" element={<ResetPassword />} /> 
                        <Route path="/reset_password_confirm/:uid/:token" element={<ResetPasswordConfirm />} /> 
                        <Route path="/reset_password_done" element={<ResetPasswordDone />} /> 

                        <Route path="/reset_username" element={<ResetUsername />} />
                        <Route path="/reset_username_confirm/:uid/:token" element={<ResetUsernameConfirm />} /> 
                        <Route path="/reset_username_done" element={<ResetUsernameDone />} /> 

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/account_delete" element={<AccountDelete />} />

                        <Route path='/' element={<Home />} />
                        <Route path='/places' element={<PrivateRoute> <Places/> </PrivateRoute>} />
                        <Route path='/places/:id' element={<PrivateRoute> <Place/> </PrivateRoute>} />

                    </Routes>
                </Layout>
            </BrowserRouter>
            <ToastContainer />
        </AuthProvider>
     )
}
 
export default App