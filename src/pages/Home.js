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

            <ul className='nav'>

                {
                    businessCategory.map((cv, idx) => {

                        return (
                            <li key={idx} className='me-3'>

                                <Link to={'/search?category_name='+cv.attributes.name}>

                                    <img
                                        src={
                                            'http://localhost:1337' +
                                             cv?.attributes?.image?.data?.[0]?.attributes?.url
                                        }
                                        alt=''
                                        width='50px'
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