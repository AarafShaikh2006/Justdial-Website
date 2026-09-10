//1. Import Area
import React from 'react'
import { Button, Form } from 'react-bootstrap'

// Definition Area
export default function Login() {

  // Hook Area

  // 2.2 function definition Area

  let LoginUser = ()=>{
    // alert("Login");
    let payload={ 
        "identifier": document.querySelector('input[type=email]').value,
        "password": document.querySelector('input[type=password]').value
    }
    console.log(payload);

    fetch(`http://localhost:1337/api/auth/local`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    .then(res=>res.json())
    .then((data)=>{
      if(data["jwt"] !== undefined){
        // Login success
        console.log('token------>',data["jwt"]);
        
        // alert("login successful")

        window.location.href='/business_register';

        // Store the token in the localStorage
        window.localStorage.setItem('jwt_token',data["jwt"])
      }else{
        //Login failed
        alert("failed")

      }     
    })
    .catch(err=>err)
    
  } 

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
      <Button variant="primary" type="button" onClick={ LoginUser }>
        Login
      </Button>
    </Form>
    </>
  )
}

// Export Area