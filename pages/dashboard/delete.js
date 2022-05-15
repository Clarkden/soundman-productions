/* eslint-disable */

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import Sidebar from '../../components/sidebar'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXbox } from '@fortawesome/free-brands-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faDeleteLeft, faX } from '@fortawesome/free-solid-svg-icons'
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
                    <div className='flex w-full justify-start items-start mx-auto p-5 gap-5'>
                        {songs ? songs?.map((data) => (
                            <div key={data._id} className='bg-gray-100 dark:bg-gray-500 w-dasbhoard-card min-w-dashboard-card h-dasbhoard-card min-h-dasbhoard-card rounded-lg'>
                                <div className='min-w-full max-w-full min-h-full h-full flex flex-col'>
                                    <div className='bg-gray-200 dark:bg-gray-800 rounded-t-lg p-1 h-fit text-black dark:text-white flex flex-row flex-nowrap justify-between items-baseline px-2    '>
                                        <h1 className='' >{data.title}</h1>
                                        <div className='flex flex-row items-baseline gap-3'>
                                            <button onClick={() => {fetch(`/api/products/delete/${data._id}`); window.location.reload()}}><FontAwesomeIcon icon={faX} className="text-red-500 cursor-pointer" /></button>
                                        </div>
                                    </div>
                                    <div className='h-full flex items-center justify-center'>
                                        <img src={data.image} className='rounded-lg w-8/12'></img>
                                    </div>
                                </div>
                            </div>
                        )) : null}
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