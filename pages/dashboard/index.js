/* eslint-disable */

import React from 'react'
import Sidebar from '../../components/sidebar'
import SoundButton from '../../components/playSound'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { useSession, signIn, signOut } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export default function dashboard({ admins }) {

    const { data: session } = useSession()

    //Load audio controllers
    const [playControllers, setPlayControllers] = useState([])
    var playControllersList = ([])


    //Loading sounds and active sound state
    const [PlayingSound, setPlayingSound] = useState(false)
    const [sound, setSound] = useState()


    //Loading songs
    const [loadingError, setLoadingError] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [songs, setSongs] = useState([]);
    const [noSongs, setNoSongs] = useState(false)

    //Loading Audio Controllers
    const [controllersError, setControllersError] = useState(null)

    const [admin, setAdmin] = useState(false)

    //Loop fetching songs until the are loaded

    useEffect(() => {

        //if (noSongs == false) {

        async function fetchSongs() {
            if (session) {
                fetch(`/api/userSounds/${session.user.name}`)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            if (result.status === 200) {
                                setIsLoaded(true)
                                setSongs(result.message.songs)

                            }

                            else if (result.message === "User not found") {
                                setNoSongs(true)
                                // setTimeout(() => {setLoadingError(true);}, [100])
                            }
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


    //Add controlers to a list to be able to set states

    const addObject = (object) => {
        playControllersList.push(object)
    }

    //Set state of all audio controller buttons

    const changeState = (state) => {
        let currentControllers = playControllers
        for (var x = 0; x < currentControllers.length; x++) {
            currentControllers[x].state.displayPlayButton = state
        }
        setPlayControllers(currentControllers)
    }

    //Create new audio and store it. Set playing sound to true

    const audio = async (url, id) => {
        var newAudio = new Audio(url)
        newAudio.id = id
        await setSound(newAudio)
        setPlayingSound(true)
    }

    //Get all states of playbuttons to be able to set them 

    useEffect(() => {
        if (playControllersList.length == 0) {
            setControllersError(true)
        }
        else
            setPlayControllers(playControllersList)

    }, [controllersError])


    //Check if a sound has been loaded to play and if it has, play it

    useEffect(() => {
        if (sound != null) {
            if (PlayingSound) {
                sound.play()
            } else {
                sound.pause()
                setSound(null)
            }
        }

    }, [PlayingSound])

    return (
        <div className='w-full h-full'>
            {session ?
                <div>
                    <div className='flex'>
                        <Sidebar admin={admin} />
                        <section className=' text-black dark:text-white w-full dark:bg-black relative top-0'>
                            <h1>{session.user.role}</h1>
                            <div className='p-10 w-full flex flex-row flex-wrap gap-10'>
                                {!noSongs ?
                                    <>
                                        {isLoaded && songs ? songs?.map((data) => (<div key={data._id} className='bg-gray-100 dark:bg-gray-500 w-dasbhoard-card min-w-dashboard-card h-dasbhoard-card min-h-dasbhoard-card rounded-lg'>
                                            <div className='min-w-full max-w-full min-h-full h-full flex flex-col'>
                                                <div className='bg-gray-200 dark:bg-gray-800 rounded-t-lg p-1 h-fit text-black dark:text-white flex flex-row flex-nowrap justify-between items-baseline px-2    '>
                                                    <h1 className='' >{data.title}</h1>
                                                    <div className='flex flex-row items-baseline gap-3'>
                                                    <a href={data.productionSound} ><FontAwesomeIcon icon={faDownload} className="text-orange-500" size="md"/>download</a>
                                                    
                                                    <SoundButton passedFunction={() => setPlayingSound(!PlayingSound)} soundPlaying={PlayingSound} changeState={changeState} addObject={addObject} audio={audio} id={data.title} audioSource={data.productionSound} />
                                                    </div>
                                                </div>
                                                <div className='h-full flex items-center justify-center'>
                                                    <img src={data.image} className='rounded-lg w-8/12'></img>
                                                </div>
                                            </div>
                                        </div>)) :
                                            <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 inline-flex items-center">
                                                <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                                </svg>
                                                Loading...
                                            </button>
                                        }
                                    </>
                                    : <h1>No Songs Purchased</h1>}
                            </div>
                        </section>
                        {/* {PlayingSound ? <AudioPlayer
                    className='rounded-t-lg fixed bottom-0'
                    src={sound}
                // other props here
                /> : null} */}
                    </div>
                </div> :
                <div className='flex justify-center items-center h-screen w-screen'>
                    <div className='border-2 border-neutral-800 h-3/6 w-3/6 rounded-lg p-3 flex flex-col justify-center items-center gap-4'>
                        <h1 className='font-bold'>You must sign in</h1>
                        <button onClick={() => signIn()} className="bg-green-400 rounded-lg p-2 w-4/5">Sign in</button>
                        <Link href="/"><span className="bg-blue-400 rounded-lg p-2 w-4/5 flex justify-center cursor-pointer">Home</span></Link>
                    </div>
                </div>

            }
        </div>
    )
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