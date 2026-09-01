//1. Import Area
import React from 'react'
import { Button, Form } from 'react-bootstrap'

// Definition Area
export default function Login() {

  // Hook Area

  // 2.2 function definition Area

  // let LoginUser = ()=>{
  //   alert("Login");
  // } 

  // Return Statement 
  return (
      <>
      <h1 className='text-center'>Login Page</h1>
       <Form className='container mt-5 shadow-lg p-4 mb-4 bg-white w-25 rounded-4'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="button">
        Submit
      </Button>
    </Form>
    </>
  )
}

// Export Area