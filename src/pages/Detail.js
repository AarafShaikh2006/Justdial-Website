// 1.import Area

import React, { useEffect, useState } from 'react'

import Carousel from 'react-bootstrap/Carousel';

import { URL } from '../helpers/helper';
import { useSearchParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// 2 Definition Area

export default function Detail() {

    // 2.1 Hook Area

    // const [setBusDetail] = useState([])
    const [reviewPayload,setReviewPayload] = useState({
                       
                            "data": {
                                "rate_scale": 5,
                                "description": "very good",
                                "business": "2",
                                "users_permissions_users": 9,
                            }

    })
    const [busPhotos,setBusPhotos] = useState([])
    const [searchParams] = useSearchParams()

    // 2.2 function Definition Area

    
    const businessid=searchParams.get('business_id');

    useEffect(() => {  

        setReviewPayload(prev => ({
            ...prev,
            data:{
                ...prev.data,
                users_permissions_users:parseInt(window.localStorage.getItem('user_id'))
            }
        }));

        //   svg.addEventListener('mouseover', ()=> console.log('Event: mouseover'));


        //   console.log('business_id-------->',searchParams.get('business_id'));

      
        fetch(`${URL}/api/businesses?&populate=*&filters[id][$eq]=${businessid}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log('detail page', data);
                if (data.data.length>0) {
                    setBusPhotos(data.data[0].attributes.photo.data)
                    //  busDetail[0].attributes.photo.data                 
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [businessid]);

    const handleSubmit=(value) => {
        // evt.preventDefault();
        console.log(value);
           setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:value
            }
    })

}

    let star=(e)=>{

        console.log(e.currentTarget);
    
          let elem = e.currentTarget;
          
        // Reset all stars
        let stars = elem.parentElement.children;
    
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('text-warning');
            stars[i].classList.add('text-secondary');
        }
    
        // Color clicked/hovered star
        elem.classList.remove('text-secondary');
        elem.classList.add('text-warning');
     
        console.log(elem.getAttribute('data-rateno'));
    
        let desc = document.querySelector('textarea.review_desc').value;
    
        console.log('desc', desc);
    
        setReviewPayload({
            ...reviewPayload,
            data: {
                ...reviewPayload.data,
                rate_scale: parseInt(elem.getAttribute("data-rateno")),
                description: desc
            }
        });
    
        //  Color previous stars
         let prev = elem.previousElementSibling;
    
        while (prev) {
    
          prev.classList.remove('text-secondary');
           prev.classList.add('text-warning');
    
          prev = prev.previousElementSibling;
    
         }
    }

   
    let submitReview=(e)=>{
        // let desc=document.querySelector('textarea.review_desc').value;
        // console.log('desc',desc);

        //    setReviewPayload({
        //     ...reviewPayload,
        //     data:{
        //         ...reviewPayload.data,
        //         description:desc
        //     }
            

      //  })

        fetch(`${URL}/api/reviews`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+window.localStorage.getItem('jwt_token')
            },
            body:JSON.stringify(reviewPayload)
        })
        .then((res)=>{
            return res.json()
        })
        .then(data=>{
            console.log('data',data);
        }).catch(err=>{
            console.log('err',err);
        })
    }


    // Return Statement

    return (
        <>

            <h1>Detail</h1>
                        <Carousel
                            indicators={false}
                        >
                        {   
                           busPhotos &&  busPhotos.map((cv,idx,arr)=>{
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

              <Form>
                <Form.Group className="mb-3 mt-5">
                    <Form.Label>
                    <FontAwesomeIcon icon={faStar} className='text-secondary fs-1 aaraf1' data-rateno='1'  onMouseEnter={(e)=>{star(e)}}/>
                    <FontAwesomeIcon icon={faStar} className='text-secondary fs-1 aaraf2' data-rateno='2'  onMouseEnter={(e)=>{star(e)}} />
                    <FontAwesomeIcon icon={faStar} className='text-secondary fs-1 aaraf3' data-rateno='3' onMouseEnter={(e)=>{star(e)}} />
                    <FontAwesomeIcon icon={faStar} className='text-secondary fs-1 aaraf4' data-rateno='4' onMouseEnter={(e)=>{star(e)}} />
                    <FontAwesomeIcon icon={faStar} className='text-secondary fs-1 aaraf5' data-rateno='5' onMouseEnter={(e)=>{star(e)}} />
                    </Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tell us about your experience</Form.Label>
                    <Form.Control className='review_desc' as="textarea" rows={3} onChange={e => handleSubmit(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                    Submit
                </Button>
             </Form>           

        </>

    )

}


// Export Area