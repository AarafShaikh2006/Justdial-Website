import React from 'react'

import { Dropdown, Badge } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card';


export default function Filter() {

  return (

    <div className='container mt-4'>

      {/* Filter Buttons */}

<div className='filter-buttons d-flex align-items-center gap-2 mb-4 flex-nowrap'>
  {/* Sort By */}

  <Dropdown>

    <Dropdown.Toggle
      variant='white'
      className='border rounded-pill px-3 shadow-sm'
    >
      Sort by
    </Dropdown.Toggle>

    <Dropdown.Menu>

      <Dropdown.Item>Top Rated</Dropdown.Item>
      <Dropdown.Item>Most Popular</Dropdown.Item>
      <Dropdown.Item>Newest</Dropdown.Item>

    </Dropdown.Menu>

  </Dropdown>


  {/* Normal Filters */}

  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    Fees Available
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    Stream
  </Button>


  {/* <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    Degree type
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    Student gender
  </Button> 


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    Managed by
  </Button> */}


  {/* Icon Filters */}

  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    <img
      src="https://akam.cdn.jdmagicbox.com/images/icons/iphone/filter_toprated_3x.png"
      width="20"
      alt="Top Rated"
      className='me-2'
    />

    Top Rated
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    <img
      src="https://akam.cdn.jdmagicbox.com/images/icons/iphone/filter_responsive_3x.png"
      width="20"
      alt="Quick Response"
      className='me-2'
    />

    Quick Response
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    <img
      src="https://akam.cdn.jdmagicbox.com/images/icons/iphone/filter_jdverified_3x.png"
      width="20"
      alt="JD Verified"
      className='me-2'
    />

    JD Verified
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    ⭐ Ratings
  </Button>


  <Button
    variant='white'
    className='border rounded-pill px-3 shadow-sm text-nowrap'
  >
    <img
      src="https://akam.cdn.jdmagicbox.com/images/icons/iphone/filter_jdtrust_3x.png"
      width="20"
      alt="JD Trust"
      className='me-2'
    />

    JD Trust
  </Button>


  {/* All Filters */}

  <Button
    variant='dark'
    className='rounded-pill px-4 shadow-sm text-nowrap'
  >
    <i className="fa-solid fa-sliders me-2"></i>

    All Filters
  </Button>

</div>

      {/* Business Card */}

      <Card className='shadow-sm border-0 rounded-3'>

        <div className='row g-0'>


          {/* Business Image */}

          <div className='col-md-4'>

            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300"
              className='h-100'
            />

          </div>


          {/* Business Details */}

          <div className='col-md-8'>

            <Card.Body>


              <div className='d-flex justify-content-between'>

                <Card.Title>

                  ABC Restaurant

                </Card.Title>


                <Badge bg="success" className='h-25'>

                  ⭐ 4.5

                </Badge>

              </div>


              <Card.Text className='text-muted'>

                📂 Restaurant

              </Card.Text>


              <Card.Text>

                📍 Mira Road, Mumbai

              </Card.Text>


              <Card.Text className='text-muted'>

                Delicious food and good service.

              </Card.Text>


              <Button
                variant='success'
                className='me-2'
              >

                <i className="fa-solid fa-phone me-2"></i>

                Call

              </Button>


              <Button variant='success'>

                <i className="fa-brands fa-whatsapp me-2"></i>

                WhatsApp

              </Button>


            </Card.Body>

          </div>

        </div>

      </Card>

    </div>

  )
}
