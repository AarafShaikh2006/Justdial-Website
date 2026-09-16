import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MAPTILER_API_KEY, URL } from '../../helpers/helper'

export default function Navigation() {

  const [logo, setLogo] = useState('')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)


  // Get Logo
  useEffect(() => {

    fetch(`${URL}/api/website?populate=*`)
      .then((res) => res.json())
      .then((data) => {

        setLogo(
          data.data.attributes.logo.data.attributes.url
        )

      })
      .catch((error) => {

        console.log(error)

      })

  }, [])


  // Current Location
  let getCurrentLocation = () => {

    setLoading(true)

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        let latitude = position.coords.latitude
        let longitude = position.coords.longitude

        console.log('Latitude:', latitude)
        console.log('Longitude:', longitude)


        // MapTiler Reverse Geocoding
        let response = await fetch(
          `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=${MAPTILER_API_KEY}`
        )

        let data = await response.json()

        console.log('MapTiler Data:', data)


        // Get Address
        let address = data.features[0]?.place_name || 'Unknown'


        // Get City
        let cityData = data.features.find((item) =>
          item.place_type?.includes('place')
        )

        let city = cityData?.text || 'Unknown'


        // Show City in Search Box
        setLocation(city)


        // Store Location
        localStorage.setItem(
          'location',
          JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            address: address
          })
        )


        // Check LocalStorage
        console.log(
          'Stored Location:',
          JSON.parse(localStorage.getItem('location'))
        )


        setLoading(false)

      },

      (error) => {

        console.log('Location Error:', error.message)

        setLoading(false)

      }

    )

  }


  // Search Location
  let searchLocation = async (e) => {

    let value = e.target.value

    setLocation(value)


    if (value.length < 2) {

      setLocations([])

      return

    }


    let response = await fetch(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(value)}.json?key=${MAPTILER_API_KEY}`
    )

    let data = await response.json()

    setLocations(data.features || [])

  }


  // Select Location
  let selectLocation = (item) => {

    let latitude = item.geometry.coordinates[1]

    let longitude = item.geometry.coordinates[0]

    let address = item.place_name


    // Show selected city
    setLocation(item.text)

    setLocations([])


    // Store in LocalStorage
    localStorage.setItem(
      'location',
      JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        address: address
      })
    )


    console.log('Stored Location:', {

      latitude: latitude,
      longitude: longitude,
      address: address

    })

  }


  // Logout
  let LogoutUser = () => {

    window.localStorage.removeItem('jwt_token')

    window.location.href = '/login'

  }


  return (

    <Navbar expand="lg">

      <Container fluid>


        {/* Logo */}

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


          <Form className="d-flex mx-auto align-items-center">


            {/* LOCATION SEARCH */}

            <div
              style={{
                position: 'relative',
                width: '280px'
              }}
              className="me-2"
            >

              <Form.Control
                type="search"
                placeholder="Search location"
                value={location}
                onChange={searchLocation}
                style={{
                  paddingRight: '45px'
                }}
              />


              {/* Current Location */}

              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '4px',
                  height: '34px',
                  width: '38px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >

                {
                  loading ?

                  <Spinner
                    animation="border"
                    size="sm"
                  />

                  :

                  <i
                    className="fa-solid fa-location-crosshairs"
                    style={{
                      fontSize: '18px'
                    }}
                  ></i>

                }

              </button>


              {/* Location Results */}

              {
                locations.length > 0 &&

                <div
                  style={{
                    position: 'absolute',
                    top: '42px',
                    left: '0',
                    width: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    zIndex: '1000',
                    overflow: 'hidden'
                  }}
                >

                  {
                    locations.slice(0, 5).map((item, index) => (

                      <div
                        key={index}
                        onClick={() => selectLocation(item)}
                        style={{
                          padding: '10px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #eee'
                        }}
                      >

                        <i className="fa-solid fa-location-dot me-2"></i>

                        {item.place_name}

                      </div>

                    ))
                  }

                </div>

              }

            </div>


            {/* BUSINESS SEARCH */}

            <Form.Control
              type="search"
              placeholder="Search Business"
              className="me-2"
              style={{
                width: '250px'
              }}
            />


            <Button variant="outline-success">
              Search
            </Button>


          </Form>


          {/* Navigation */}

          <Nav>

            <Link
              to="/"
              className="btn btn-link"
            >
              Home
            </Link>


            {
              window.localStorage.getItem('jwt_token') === null &&

              <>

                <Link
                  to="/login"
                  className="btn btn-link"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-link"
                >
                  Register
                </Link>

              </>

            }


            {
              window.localStorage.getItem('jwt_token') !== null &&

              <>

                <Nav.Link
                  onClick={LogoutUser}
                  className="btn btn-link"
                >
                  Logout
                </Nav.Link>

                <Link
                  className="btn btn-link"
                  to="/business_register"
                >
                  Register Business
                </Link>

              </>

            }

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  )

}