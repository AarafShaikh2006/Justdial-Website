import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import logo from '../../logo.svg'
import { Link } from 'react-router-dom' 

export default function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>

        {/* Logo - Left */}
        <Navbar.Brand href="#" className="p-0 m-0">
          <img
            alt="Logo"
            src={logo}
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
            <Link to="/login" className='btn btn-link'>Login</Link>
            <Link to="/register" className='btn btn-link'>Register</Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}