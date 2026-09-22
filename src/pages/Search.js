import React, { useEffect, useState } from 'react'
import {
  Card,
  Row,
  Col,
  Button,
  Badge,
  Dropdown
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faFilter, faPhone  } from '@fortawesome/free-solid-svg-icons'
import { Link, useSearchParams } from 'react-router-dom'
import { URL } from '../helpers/helper'

export default function Search() {

  //2.1 Hooks Area

  const [businesses,setBusinesses] = useState([])

  const [searchParams]=useSearchParams()
  
  useEffect(()=>{
      console.log('category_name-------->',searchParams.get('category_name'));

        fetch(`${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get('category_name')}`)
        .then(res=>res.json())
        .then(data=>{
            console.log('data.data -------->',data.data);
            setBusinesses(data.data);
            
        })
        .catch(err=>{
            console.log(err)
        })
        //http://localhost:1337/api/businesses?populate=*&filters[business_categories][name][$containsi]=home decore
    },[]);
   


  return (
    <>
      <h1>Search Filter</h1>

      {/* Filter Bar */}
      <div className='d-flex gap-2 mb-3 flex-wrap p-2'>

        {/* Sort By */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            Sort By
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Relevance</Dropdown.Item>
            <Dropdown.Item>Rating - High to Low</Dropdown.Item>
            <Dropdown.Item>Distance - Near to Far</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* Ratings */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            Ratings
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>4+ Rating</Dropdown.Item>
            <Dropdown.Item>3+ Rating</Dropdown.Item>
            <Dropdown.Item>2+ Rating</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* Fees */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            Fees
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Free</Dropdown.Item>
            <Dropdown.Item>Below ₹500</Dropdown.Item>
            <Dropdown.Item>₹500 - ₹1000</Dropdown.Item>
            <Dropdown.Item>Above ₹1000</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* Stream */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            Stream
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Information Technology</Dropdown.Item>
            <Dropdown.Item>Commerce</Dropdown.Item>
            <Dropdown.Item>Science</Dropdown.Item>
            <Dropdown.Item>Arts</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* Degree Type */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">
            Degree Type
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Graduation</Dropdown.Item>
            <Dropdown.Item>Post Graduation</Dropdown.Item>
            <Dropdown.Item>Diploma</Dropdown.Item>
            <Dropdown.Item>Certificate</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* More Filters */}
        <Dropdown>
          <Dropdown.Toggle variant="outline-success">
            <FontAwesomeIcon icon={faFilter} className='me-2' />
            All Filters
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Top Rated</Dropdown.Item>
            <Dropdown.Item>Quick Response</Dropdown.Item>
            <Dropdown.Item>JD Verified</Dropdown.Item>
            <Dropdown.Item>JD Trust</Dropdown.Item>
            <Dropdown.Item>Managed By</Dropdown.Item>
            <Dropdown.Item>Student Gender</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>


      {/* Search Result */}
      <Row>

        <Col sm={9}>


            {
              businesses.map((cv,idx,arr)=>{
                return <Link key={cv.id} to='/detail' style={{textDecoration: 'none'}}>
                <Card className='p-3 mb-3 '>

                  <Row>

                    <Col sm={3}>
                      <Card.Img
                        className='img-fluid'
                        variant="top"
                        src={URL+cv.attributes.photo.data[0].attributes.url}
                      />

                    </Col>

                    <Col sm={9}>

                      <Card.Body>

                        <Card.Title>
                        {cv.attributes.name}
                        </Card.Title>

                        <Badge className='p-2 fs-6' bg="success">
                          4.8
                        </Badge>

                        <span className='ms-2'>
                          <FontAwesomeIcon icon={faStar} className='text-warning' />
                          <FontAwesomeIcon icon={faStar} className='text-warning'/>
                          <FontAwesomeIcon icon={faStar} className='text-warning'/>
                          <FontAwesomeIcon icon={faStar} className='text-warning'/>
                          <FontAwesomeIcon icon={faStar} className='text-secondary'/>
                        </span>

                        <span className='ms-2'>
                          97 Rating
                        </span>

                        <Card.Text>
                          {cv.attributes.desc}
                        </Card.Text>
                      
                      <div className='d-flex gap-2'>
                        <Button className='btn btn-success'>
                        <FontAwesomeIcon icon={faPhone} /> {cv.attributes.phone}
                        </Button>
                      </div>

                      </Card.Body>

                    </Col>

                  </Row>

                </Card>
                </Link>
                
              })
            }

            

        </Col>


        {/* Right Side */}
        <Col sm={3}>

          <Card>

            <Row>

              <Col sm={6}>
              <Card.Img
                  className='img-fluid'
                  variant="top"
                  src="https://content.jdmagicbox.com/v2/comp/mumbai/a9/022pxx22.xx22.260424215513.d6a9/catalogue/parsi-table-restaurant-anand-nagar-jogeshwari-west-mumbai-parsi-restaurants-5if7za84eh-250.jpg?w=640&q=75"
                  />

                   <Button variant="success" className='w-100'>
                  <FontAwesomeIcon icon={faPhone} /> 9839393922
                  </Button>

              </Col>

              <Col sm={6}>
              <Card.Img
                  className='img-fluid'
                  variant="top"
                  src="https://content.jdmagicbox.com/v2/comp/mumbai/a9/022pxx22.xx22.260424215513.d6a9/catalogue/parsi-table-restaurant-anand-nagar-jogeshwari-west-mumbai-parsi-restaurants-5if7za84eh-250.jpg?w=640&q=75"
                  />

                   <Button variant="success" className='w-100'>
                  <FontAwesomeIcon icon={faPhone} /> 9839393922
                  </Button>

                  

              </Col>

                  </Row>

          </Card>

        </Col>

      </Row>

    </>
  )
}
