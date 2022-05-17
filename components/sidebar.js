/* eslint-disable */

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDollarSign, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


export default function sidebar({ admin }) {

    const { data: session } = useSession()
    if (session) {


        return (
            <div className='h-screen min-h-full sticky flex bg-white dark:bg-neutral-900'>
                <aside className="w-48 h-5/6 ml-7 my-3 mt-10" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-gray-100 dark:bg-gray-800 min-h-full rounded-lg pt-10">
                        <ul className="space-y-2">
                            {/* <a href="/" className="flex justify-start flex-wrap">
                                <img src="img/headphones.png" className="mr-3 h-6" alt="Sandman Productions Logo" />
                                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Sandman Productions</span>
                            </a> */}
                            <li>
                                <a href="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Shop</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
                                </a>
                            </li>
                            {admin ?
                                <>

                                    <li>
                                        <a href="/dashboard/create" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faPlusCircle} className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Create</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/delete" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faMinusCircle} className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Delete</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/dashboard/orders" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FontAwesomeIcon icon={faDollarSign} className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
                                        </a>
                                    </li>
                                </>
                                :
                                null}
                            <li className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer' onClick={() => signOut()}>
                                <FontAwesomeIcon icon={faArrowLeft} className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Sign Out
                                </span>
                            </li>
                        </ul>
                    </div>
                </aside>

            </div>
        )
    }
}
