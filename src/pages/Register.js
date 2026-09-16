import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Swal from 'sweetalert2';
import { URL } from '../helpers/helper';

export default function Register() {

    //2.1 Hook area
    const [payload, setPayload] = useState();

    //2.2 Function definition area
    let RegisterUser = () => {

        let u = document.querySelector('input[name=username]').value;
        let e = document.querySelector('input[name=email]').value;
        let p = document.querySelector('input[name=password]').value;

        console.log(u);
        console.log(e);
        console.log(p);

        setPayload({
            "username": u,
            "email": e,
            "password": p
        });

        console.log(payload);

        // Promise Chain
        fetch(`${URL}/api/auth/local/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": u,
                "email": e,
                "password": p
            }),
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if (data.data !== null) {
                Swal.fire(
                    "Good job!",
                    "User Created Successfully!",
                    "success"
                );
            } else {
                Swal.fire(
                    "Bad job!",
                    `${data.error.message}`,
                    "error"
                );
            }

        })
        .catch(err => console.log(err));

    }

    // Return Statement
    return (
        <>
            <h1 className='text-center'>Register Page</h1>

            <Form className='container mt-5 shadow-lg p-4 mb-4 bg-white w-25 rounded-4'>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>

                    <Form.Control
                        name='username'
                        type="text"
                        placeholder="Enter Username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>

                    <Form.Control
                        name='email'
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        name='password'
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    onClick={() => { RegisterUser() }}
                >
                    Submit
                </Button>

            </Form>
        </>
    )
}

// Export Area