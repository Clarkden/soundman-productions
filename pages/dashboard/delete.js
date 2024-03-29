/* eslint-disable */

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import Sidebar from '../../components/sidebar'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faDeleteLeft, faMusic, faX } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false



export default function createSound({ admins }) {
    const { data: session } = useSession()

    const [songs, setSongs] = useState([])
    const [admin, setAdmin] = useState(false)
    const [loadingError, setLoadingError] = useState(0)

    useEffect(() => {

        //if (noSongs == false) {

        async function fetchSongs() {
            if (session) {
                fetch(`/api/products`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setSongs(result)
                        },
                        (error) => {
                            setLoadingError(loadingError++)
                            console.log(error)
                        }
                    )
            }
            else {
                setTimeout(() => { setLoadingError(true); }, [100])
            }
        }
        //}

        function checkAdmin() {
            if (session) {
                for (let x = 0; x < admins.length; x++) {
                    if (session.user.email === admins[x].email)
                        setAdmin(true)
                }
            }
        }


        setTimeout(() => {
            fetchSongs();
            checkAdmin();
        }, [500])

    }, [loadingError])

    if (admin) {

        return (
            <>
                {session && admin ? <div className='w-screen h-screen flex flex-row dark:bg-black'>
                    <Sidebar admin={admin} />
                    <div className='w-9/12  mx-auto h-fit rounded-lg justify-start items-start p-4 mt-10 gap-5 bg-gray-100'>
                        <h1 className='font-bold text-lg mb-5 dark:text-white'>All Sounds <span className='mx-'><FontAwesomeIcon icon={faMusic} /></span> </h1>
                        <div className='flex flex-row gap-5'>
                            {songs ? songs?.map((data) => (
                                <div>
                                    <div className='rounded-lg  p-2 flex flex-col justify-around drop-shadow-lg max-w-cards' key={data._id}>
                                                    <div className='border-2 border-black/25 dark:border-white/25 rounded-lg p-1 w-44 mb-3'>
                                                        <h1 className='text-center'>{data.title}</h1>
                                                    </div>
                                                    <div className='w-44 h-44 min-w-cards mb-4 overflow-hidden flex flex-col justify-center rounded-lg p-1 drop-shadow-lg border-2 border-black/25 dark:border-white/25'>
                                                        <img src={data.image} className='rounded-md min-w-full'></img>
                                                    </div>
                                                    <div className='flex flex-row justify-between border-2 border-black/25 dark:border-white/25 rounded-lg w-44'>
                                                    <button onClick={() => { fetch(`/api/products/delete/${data._id}`); window.location.reload() }} className="bg-red-400 w-44 rounded-md">Delete</button>
                                                    </div>
                                                </div>
                                </div>

                            )) : <a href="/dashboard/create" className=''>Create a product</a>}
                        </div>
                    </div>
                </div> : <h1>You are not permitted.</h1>}
            </>
        )

    }
}

export async function getServerSideProps(context) {
    const client = await clientPromise;

    const db = client.db("soundmanproductions");

    let admins = await db.collection("admins").find({}).toArray();
    admins = JSON.parse(JSON.stringify(admins));

    return {
        props: { admins },
    };
}