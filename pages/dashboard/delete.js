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
                {session && admin ? <div className='flex flex-col md:flex-row bg-white dark:bg-neutral-900 pb-20'>
                    <Sidebar admin={admin} />
                    <div className='w-5/6 md:w-9/12  mx-auto h-fit rounded-lg justify-start items-start p-4 mt-10 gap-5 bg-gray-100 dark:bg-gray-800 dark:text-white'>
                        <h1 className='font-bold text-lg mb-5 dark:text-white'>All Sounds <span className='mx-'><FontAwesomeIcon icon={faMusic} /></span> </h1>
                        <div className='flex flex-row flex-wrap gap-1 md:gap-5 justify-around md:justify-start'>
                            {songs ? songs?.map((data) => (
                                <div key={data._id}>
                                    <div className='rounded-lg  p-2 flex flex-col justify-around drop-shadow-lg max-w-cards' key={data._id}>
                                        <div className='border-2 border-black/25 dark:border-white/25 rounded-lg p-1 w-small-cards md:min-w-cards mb-3'>
                                            <h1 className='text-center'>{data.title}</h1>
                                        </div>
                                        <div className='w-small-cards md:min-w-cards mb-4 overflow-hidden flex flex-col justify-center rounded-lg p-1 drop-shadow-lg border-2 border-black/25 dark:border-white/25'>
                                            <img src={data.image} className='rounded-md min-w-full'></img>
                                        </div>
                                        <div className='flex gap-2 items-baseline  rounded-lg justify-between drop-shadow-lg border-2 border-black/25 dark:border-white/25 p-1 w-small-cards md:min-w-cards flex-col md:flex-row'>
                                            <button onClick={() => { fetch(`/api/products/delete/${data._id}`); window.location.reload() }} className="bg-red-400 min-w-full min-h-full rounded-md">Delete</button>
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