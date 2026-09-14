import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import { URL } from '../../helpers/url'

export default function Navigation() {

  // 2.1 Hook Area
  const [logo,setLogo] = useState('')

  useEffect(()=>{
    fetch(`${URL}/api/website?populate=*`,{})
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log('logo------->',data.data.attributes.logo.data.attributes.url);
      setLogo(data.data.attributes.logo.data.attributes.url)
    })
    .catch(err=>err)

  },[])

  // 2.2 function definition Area

  let LogoutUser=()=>{
    window.localStorage.removeItem('jwt_token')
    window.location.href= '/login';
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>

        {/* Logo - Left */}
        <Navbar.Brand href="#" className="p-0 m-0">
          <img
            alt="Logo"
            src={`${URL}${logo}`}
            width="80"
            height="80"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">

          {/* Search - Center */}
          <Form className="d-flex mx-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: '300px' }}
            />

            <Button variant="outline-success">
              Search
            </Button>
          </Form>

          {/* Links - Right */}
          <Nav>
            <Link to="/" className='btn btn-link'>Home</Link>
            {
              window.localStorage.getItem('jwt_token') === null &&
              <>
              <Link to="/login" className='btn btn-link'>Login</Link>
              <Link to="/register" className='btn btn-link'>Register</Link>
              </>

            }
            {
              window.localStorage.getItem('jwt_token') !== null &&
              <>
              <Nav.Link onClick={()=>{ LogoutUser() }} className='btn btn-link'>Logout</Nav.Link>
              <Link className='btn btn-link'  to='/business_register'>Register Business</Link>
              </>

            }
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}