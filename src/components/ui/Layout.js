import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
   <>
   <Container className='layout'>
        <Header/>
        <main>
            <Outlet />
        </main>
        <Footer/>
    </Container>   
   </>
  )
}
