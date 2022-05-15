import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export default function footer() {
    return (
        <div className='h-fit w-full bg-white dark:bg-gray-800 mt-20 text-black dark:text-white p-5 flex flex-row justify-evenly pb-10'>
            <div className='flex flex-col text-center gap-2'>
                <h1 className='text-lg'>Important Links</h1>
                <a href="#">Contact</a>
                <a href="#">Contact</a>
                <a href="#">Contact</a>
            </div>
            <div className='flex flex-col text-center justify-around'>
                <div>
                    <div className='flex flex-row gap-3 justify-evenly'>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} size="xl"/></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} size="xl"/></a>
                    <a href="#"><FontAwesomeIcon icon={faFacebook} size="xl"/></a>
                    </div>
                </div>
                <div>
                    <h1>Copyrights © 2022. Harambe Productions. All rights reserved.</h1>
                </div>
            </div>
        </div>
    )
}
