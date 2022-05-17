/* eslint-disable */

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import Sidebar from '../../components/sidebar'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { faDeleteLeft, faDollar, faDollarSign, faMusic, faX } from '@fortawesome/free-solid-svg-icons'
config.autoAddCss = false



export default function createSound({ admins }) {
    const { data: session } = useSession()

    const [orders, setOrders] = useState([])
    const [admin, setAdmin] = useState(false)
    const [loadingError, setLoadingError] = useState(0)
    const [totalSales, setTotalSales] = useState(0)

    useEffect(() => {

        //if (noSongs == false) {

        async function fetchSongs() {
            if (session) {
                fetch(`/api/orders`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setOrders(result)

                            let total = 0
                            for (var x = 0; x < result.length; x++) {
                                total += result[x].amount_total / 100
                            }
                            setTotalSales(Math.round(total * 100) / 100)
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
                {session && admin ? <div className='flex flex-col md:flex-row bg-white dark:bg-neutral-900 pb-20 '>
                    <Sidebar admin={admin} />
                    <div className='w-5/6 md:w-9/12  mx-auto h-fit rounded-lg justify-start items-start p-4 mt-10 gap-5 bg-gray-100 dark:bg-gray-800 dark:text-white'>
                        <div className='flex justify-between'>
                         <h1 className='text-lg mb-5 dark:text-white'>All Orders <span className='text-green-500'><FontAwesomeIcon icon={faDollar} /></span></h1>
                        <h1 className='text-green-400'>${totalSales}</h1>   
                        </div>
                        
                        {/* <div className='flex flex-row flex-wrap gap-5'> */}
                        <div className='flex flex-row justify-around'>
                            <h1>Email</h1>
                            <h1>Amount</h1>
                        </div>
                        {orders ? orders?.map((data) => (
                            <div className='rounded-lg  p-2 flex flex-row gap-5 justify-around drop-shadow-lg border-2 border-slate-400 my-3' key={data._id}>
                                <h1 className='w-1/2 justify-center overflow-scroll'>{data.metadata.email}</h1>
                                <h1 className='text-green-400 w-1/2 text-center overflow-scroll'>${data.amount_total / 100}</h1>
                            </div>


                        )) : <a href="/dashboard/create" className=''>Nothing to see here...</a>}
                        {/* </div> */}
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