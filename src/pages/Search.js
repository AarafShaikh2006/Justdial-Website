import React, { useEffect, useState } from 'react'

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Dropdown
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faStar,
  faFilter,
  faPhone
} from '@fortawesome/free-solid-svg-icons'

import { Link, useSearchParams , useNavigate } from 'react-router-dom'

import { URL } from '../helpers/helper'

import img from '../assets/img/download.png'

export default function Search() {

  // Hooks Area

  const [businesses, setBusinesses] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate();

  // Fetch Businesses

  useEffect(() => {
    const categoryName = searchParams.get('category_name')

    if (!categoryName) {
      setBusinesses([])
      return
    }

    fetch(
      `${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${encodeURIComponent(categoryName)}`
    )
      .then(res => res.json())
      .then(data => {
        console.log('Business Data:', data.data)
        setBusinesses(data.data || [])
      })
      .catch(err => {
        console.log(err)
      })

  }, [searchParams])


  return (

    <Container fluid className="py-4 px-3 px-md-4">

      {/* Page Heading */}

      <Row className="mb-4">

        <Col xs={12}>

          <h2 className="fw-bold mb-1">
            Search Results
          </h2>

          <p className="text-muted mb-0">
            Find the best businesses for your needs.
          </p>

        </Col>

      </Row>


      {/* Filter Bar */}

      <Row className="mb-4">

        <Col xs={12}>

          <div className="d-flex flex-wrap align-items-center gap-2">

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


            {/* All Filters */}

            <Dropdown>

              <Dropdown.Toggle variant="outline-success">

                <FontAwesomeIcon
                  icon={faFilter}
                  className="me-2"
                />

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

        </Col>

      </Row>


      {/* Main Content */}

      <Row className="g-4">

        {/* Left Side: Business Results */}

        <Col xs={12} lg={9}>

          {businesses.length > 0 ? (

            businesses.map(cv => {

              const business = cv.attributes || {}

              const photos = business.photo?.data

              const photoUrl = Array.isArray(photos)
                ? photos[0]?.attributes?.url
                : photos?.attributes?.url

              return (

                <Card
                  key={cv.id}
                  className="mb-3 shadow-sm"
                  onClick={()=>{ navigate(`/detail?business_id=${cv.id}`)}}
                >

                  <Row className="g-0">

                    {/* Business Image */}

                    <Col xs={12} sm={4} md={3}>

                     

                        <Card.Img
                          src={
                            photoUrl
                              ? `${URL}${photoUrl}`
                              : img
                          }
                          alt={business.name || 'Business'}
                          className="h-100 rounded-start"
                          style={{
                            objectFit: 'cover',
                            minHeight: '200px',
                            maxHeight: '240px'
                          }}
                        />


                    </Col>


                    {/* Business Details */}

                    <Col xs={12} sm={8} md={9}>

                      <Card.Body className="p-3 p-md-4">

                        <Link
                          to={`/detail?business_id=${cv.id}`}
                          className="text-decoration-none text-dark"
                        >

                          <Card.Title className="fw-bold mb-2">

                            {business.name}

                          </Card.Title>

                        </Link>


                        {/* Rating */}

                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">

                          <Badge
                            bg="success"
                            className="p-2 fs-6"
                          >
                            {business.star ?? 'N/A'}
                          </Badge>

                          <span className="text-warning">

                            {[1, 2, 3, 4, 5].map(number => (

                              <FontAwesomeIcon
                                key={number}
                                icon={faStar}
                                className={
                                  number <= Number(business.star || 0)
                                    ? 'text-warning'
                                    : 'text-secondary opacity-25'
                                }
                              />

                            ))}

                          </span>

                          <span className="text-muted small">
                            Rating
                          </span>

                        </div>


                        {/* Description */}

                        <Card.Text className="text-muted mb-3">

                          {business.desc || 'No description available.'}

                        </Card.Text>


                        {/* Phone */}

                        <div className="d-flex flex-wrap gap-2">

                          {business.phone && (

                            <Button
                              as="a"
                              href={`tel:${business.phone}`}
                              variant="success"
                              onClick={e => e.stopPropagation()}
                            >

                              <FontAwesomeIcon
                                icon={faPhone}
                                className="me-2"
                              />

                              {business.phone}

                            </Button>

                          )}

                          <Button
                            as={Link}
                            to={`/detail?business_id=${cv.id}`}
                            variant="outline-success"
                          >
                            View Details
                          </Button>

                        </div>

                      </Card.Body>

                    </Col>

                  </Row>

                </Card>

              )

            })

          ) : (

            <Card className="border-0 shadow-sm">

              <Card.Body className="text-center py-5">

                <h5 className="fw-bold">
                  No Businesses Found
                </h5>

                <p className="text-muted mb-0">
                  Try searching for another category.
                </p>

              </Card.Body>

            </Card>

          )}

        </Col>


        {/* Right Side: Sidebar */}

        <Col xs={12} lg={3}>

          <Card className="shadow-sm p-3">

            <h5 className="fw-bold mb-3">
              Featured Businesses
            </h5>

            <Row className="g-3">

              {[1, 2].map(item => (

                <Col
                  key={item}
                  xs={6}
                  lg={12}
                >

                  <Card className="h-100">

                    <Card.Img
                      variant="top"
                      src={img}
                      alt="Featured business"
                      style={{
                        height: '140px',
                        objectFit: 'cover'
                      }}
                    />

                    <Card.Body className="p-2">

                      <Card.Title className="fs-6">
                        Featured Business
                      </Card.Title>

                      <Button
                        as="a"
                        href="tel:9839393922"
                        variant="success"
                        size="sm"
                        className="w-100"
                      >

                        <FontAwesomeIcon
                          icon={faPhone}
                          className="me-1"
                        />

                        Call Now

                      </Button>

                    </Card.Body>

                  </Card>

                </Col>

              ))}

            </Row>

          </Card>

        </Col>

      </Row>

    </Container>

  )

}