import React from 'react'
import CustomNavbar from './Navbar'

const Layout = (props) => {
    return ( 
        <section className='layoutSection'>
            <header>
                <CustomNavbar />
            </header>
            <main className='container'>
                {props.children}
            </main>
            <footer>

            </footer>
        </section>
     )
}
 
export default Layout