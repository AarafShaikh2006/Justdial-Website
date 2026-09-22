import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

    const [businessCategory, setBusinessCategory] = useState([]);

    useEffect(() => {

        fetch('http://localhost:1337/api/business-categories?populate=*')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                setBusinessCategory(data.data)
            })
            .catch((error) => console.log(error))

    }, [])

    return (
        <>
            <h1>Home page</h1>

            <ul className='nav  gap-3'>

                {
                    businessCategory.map((cv, idx) => {

                        return (
                            <li key={idx} className='text-center'>

                                <Link to={'/search?category_name='+cv.attributes.name}>

                                    <img className='img-fluid rounded shadow-sm bg-light p-2 border'
                                        src={
                                            'http://localhost:1337' +
                                             cv?.attributes?.image?.data?.[0]?.attributes?.url
                                        }
                                        alt=''
                                        height='70px'
                                        width='70px'
                                    /><br />

                                    {cv.attributes.name}

                                </Link>

                            </li>
                        )

                    })
                }

            </ul>
        </>
    )
}