// 1.import Area

import React, { useEffect, useState } from 'react'

import Carousel from 'react-bootstrap/Carousel';

import { URL } from '../helpers/helper';
import { useSearchParams } from 'react-router-dom';


// 2 Definition Area

export default function Detail() {

    // 2.1 Hook Area

    const [busDetail, setBusDetail] = useState([])
    const [busPhotos,setBusPhotos] = useState([])
    const [searchParams] = useSearchParams()

    // 2.2 function Definition Area

    useEffect(() => {

          console.log('hotel_id-------->',searchParams.get('hotel_id'));

          let hotelid=searchParams.get('hotel_id');
      
        fetch(`${URL}/api/businesses?&populate=*&filters[id][$eq]=`+hotelid)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log('detail page', data);
                if (data.data.length>0) {
                    setBusPhotos(data.data[0].attributes.photo.data)
                    //  busDetail[0].attributes.photo.data
                    setBusDetail(data.data)                  
                }else{

                }

            })
            .catch((err) => {
                console.log(err)
            })

    }, [])


    // Return Statement

    return (
        <>

            <h1>Detail</h1>
                        <Carousel
                            indicators={false}
                        >

                        {
                           busPhotos.map((cv,idx,arr)=>{
                            console.log('images',cv);
                            
                                return <Carousel.Item key={idx}>
                                        <img
                                            src={URL + cv.attributes.url}
                                            style={{
                                                width: '100%',
                                                height: '400px',
                                                objectFit: 'cover'
                                            }}
                                            alt=''
                                        />

                                    </Carousel.Item>
                            })
                        }


                        </Carousel>

        </>

    )

}


// Export Area