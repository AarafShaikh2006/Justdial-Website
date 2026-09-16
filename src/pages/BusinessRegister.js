// import Area
import React, { useEffect, useState } from 'react'
import { Form , Button} from 'react-bootstrap'
import Swal from 'sweetalert2';
import { URL } from '../helpers/helper';


// Definition Area
export default function BusinessRegister() {

  //2.1 Hook Area

  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [businessCategories,setBusinessCategories] = useState([])


  useEffect(()=>{

    // call the city api

    // fetch(`${URL}/api/cities`,{

    // })
    // .then((res)=>{
    //   return res.json()
    // })
    // .then((cityData)=>{
    //   console.log('City---->',cityData.data);
    //   setCities(cityData.data)
    // })
    // .catch((error)=>console.log(error)

    // )


    // call the Country api

    fetch(`${URL}/api/countries`,{

    })
    .then((res)=>{
      return res.json()
    })
    .then((countryData)=>{
      console.log('Country---->',countryData.data);
      setCountries(countryData.data)
    })
    .catch((error)=>console.log(error)

    )

    // fetch(`${URL}/api/states`,{

    // })
    // .then((res)=>{
    //   return res.json()
    // })
    // .then((stateData)=>{
    //   console.log('State---->',stateData.data);
    //   setStates(stateData.data)
    // })
    // .catch((error)=>console.log(error)

    // )

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
    // e.preventDefault();
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

    //Get the Token from localstorage

    let token=window.localStorage.getItem('jwt_token')

    // call the Api
    fetch(`${URL}/api/businesses`,{// string interpolation
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token // concatenation
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
           "Failed!",
            `${data.error.message}`,
            "error"
        );
      }

    })
    .catch(error=> console.log(error)
    )
  }



  let getStates = (e) =>{
    // alert('Hii')
    console.log(e.target.value);

    let country_id=e.target.value

    // Get the state from country id

    fetch(`${URL}/api/states?filters[country][id][$eq]=${country_id}&populate=*`,{})
    .then((res)=>{
      return res.json()
    })
    .then((stateData)=>{
      console.log('State----->',stateData.data);
      setStates(stateData.data)
    })
    .catch(error=>console.log(error))
    
  }

  let getCities=(e)=>{

     // alert('Hii')
    console.log(e.target.value);

    let state_id=e.target.value

    // Get the state from country id

    fetch(`${URL}/api/cities?filters[state][id][$eq]=${state_id}&populate=*`,{})
    .then((res)=>{
      return res.json()
    })
    .then((cityData)=>{
      console.log('Cities----->',cityData.data);
      setCities(cityData.data)
    })
    .catch(error=>console.log(error))
    

  }

  // return Statement
  return (
    <>
      <h1 className='text-center'>Business Register</h1>
             <Form className='container mt-5 shadow-lg p-4 mb-4 bg-white w-50 rounded-4'>
            <Form.Label>Country</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Select name='country_id' aria-label="Default select example" onChange={(e)=>{ getStates(e) }}>
                <option value="">Select Country</option>
                {
                  // array.map(function(currentValue, index, arr), thisValue)
                  countries.map((cv,idx,arr)=>{
                      return <option key={cv.id} value={cv.id}>{cv.attributes.name}</option>
                  })
                }
            </Form.Select>
            </Form.Group>

                {
                  states.length !== 0 &&
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>State</Form.Label>
                    <Form.Select name='state_id' aria-label="Default select example" onChange={ (e)=>{getCities(e)} }>
                        <option value="">Select State</option>
                        {
                          // array.map(function(currentValue, index, arr), thisValue)
                          states.map((cv,idx,arr)=>{
                              return <option key={cv.id} value={cv.id}>{cv.attributes.name}</option>
                          })
                        }
                    </Form.Select>
                  </Form.Group>
           } 

          {
                cities.length !== 0 &&
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>City</Form.Label>
                <Form.Select name='city_id' aria-label="Default select example">
                    <option value="">Select City</option>
                    {
                      // array.map(function(currentValue, index, arr), thisValue)
                      cities.map((cv,idx,arr)=>{
                          return <option key={cv.id} value={cv.id}>{cv.attributes.name}</option>
                      })
                    }
                </Form.Select>
                </Form.Group>
          }
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