// import Area
import React, { useEffect, useState } from 'react'
import { Form , Button} from 'react-bootstrap'
import Swal from 'sweetalert2';
import { URL } from '../helpers/url';


// Definition Area
export default function BusinessRegister() {

  //2.1 Hook Area

  const [cities,setCities] = useState([]);
  const [businessCategories,setBusinessCategories] = useState([])


  useEffect(()=>{

    // call the city api

    fetch(`${URL}/api/cities`,{

    })
    .then((res)=>{
      return res.json()
    })
    .then((cityData)=>{
      console.log('City---->',cityData.data);
      setCities(cityData.data)
    })
    .catch((error)=>console.log(error)

    )

    // call the Business Category api
    
    fetch(`${URL}/api/business-categories`,{})
    .then((res)=>{
      return res.json()
    })
    .then((businessCategoriesData)=>{
      console.log('businessCategories---->',businessCategoriesData.data);

      setBusinessCategories(businessCategoriesData.data)

      
    })
    .catch((error)=>console.log(error)
    )

  },[])




  //2.2 function Definition Area

  let busReg=(e)=>{
    e.preventDefault();
    // alert('hii')

    let payload={
          "data": {
            "name": document.querySelector('input[name="business_name"]').value,
            "business_category": document.querySelector('select[name="business_cat_id"]').value,
            "cities": [
               document.querySelector('select[name="city_id"]').value
            ]
          }
        
    }

    // call the Api
    fetch(`${URL}/api/businesses`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);

      if(data.data !==null){
        Swal.fire({
        title: "Business Registered  successfully",
        icon: "success",
        draggable: true
    });
      }else{
        Swal.fire(
           "Bad job!",
            `${data.error.message}`,
            "error"
        );
      }

    })
    .catch(error=> console.log(error)
    )
  }


  // return Statement
  return (
    <>
      <h1 className='text-center'>BusinessRegister Page</h1>
             <Form className='container mt-5 shadow-lg p-4 mb-4 bg-white w-25 rounded-4'>
            <Form.Label>City</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select name='city_id' aria-label="Default select example">
                <option value="">Select City</option>
                {
                  cities.map((cv,idx,arr)=>{
                      return <option key={cv.id} value={cv.id}>{cv.attributes.name}</option>
                  })
                }
            </Form.Select>
            </Form.Group>
            <Form.Label>Business Category</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select name='business_cat_id' aria-label="Default select example">
              <option value="">Select Business Category</option>
              {
                businessCategories.map((cv,idx,arr)=>{
                  return <option key={cv.id} value={cv.id}>{cv.attributes.name}</option>
                })
              }
            </Form.Select>
            </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Business Name</Form.Label>
              <Form.Control name='business_name' type="text" placeholder="Enter Business Name" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={ (e)=>{busReg(e)} }>
              Register Business
            </Button>
          </Form>
    </>
  )
}

// Export Area