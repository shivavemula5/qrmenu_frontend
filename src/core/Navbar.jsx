import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const CustomNavbar = () => {

    const {authValue} = useContext(AuthContext)

    return ( 
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to=''>QR Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/places'>Places</Nav.Link>
                    </Nav>
                    {
                            authValue.token ?
                            (<Nav>
                                <NavDropdown title={authValue.name} id="collasible-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile/">Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/change_password/">Change Password</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/reset_email/">Reset Username</NavDropdown.Item>                            
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to='/logout/' >Log out</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>) :
                            (<></>)
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
 
export default CustomNavbar;