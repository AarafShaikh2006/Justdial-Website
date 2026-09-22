// 1.import Area

import React, { useEffect, useState } from 'react'

import Carousel from 'react-bootstrap/Carousel';

import { URL } from '../helpers/helper';


// 2 Definition Area

export default function Detail() {

    // 2.1 Hook Area

    const [business, setBusinesses] = useState([])

    

    // 2.2 function Definition Area

    useEffect(() => {

      
        fetch(`${URL}/api/businesses?locale=hi&populate=*&filters[id][$eq]=+businessid`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {

                console.log('detail page', data.data);

                setBusinesses(data.data)

            })
            .catch((err) => {
                console.log(err)
            })

    }, [])


    // Return Statement

    return (
        <>

            <h1>Detail</h1>


            {
                business.map((cv, idx, arr) => {

                    return (

                        <Carousel
                            key={cv.id || idx}
                            indicators={false}
                        >

                            <Carousel.Item>

                                <img
                                    className="d-block w-100"
                                    src={
                                        URL +
                                        cv.attributes.photo.data[0].attributes.url
                                    }
                                    alt=''
                                />

                            </Carousel.Item>

                        </Carousel>

                    )

                })
            }


        </>

    )

}


// Export Area