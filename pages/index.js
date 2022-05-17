/* eslint-disable */

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState, useEffect } from 'react'

import ProductInteractions from '../components/mainPlaySound'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCaretDown, faPlayCircle, faPlay, faX, faClose } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Home({ }) {

  //Load audio controllers
  const [playControllers, setPlayControllers] = useState([])
  var playControllersList = ([])


  //Loading sounds and active sound state
  const [PlayingSound, setPlayingSound] = useState(false)
  const [sound, setSound] = useState()


  //Loading songs
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [songs, setSongs] = useState([]);

  //Loading Audio Controllers
  const [controllersError, setControllersError] = useState(null)

  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    async function fetchSongs() {
      fetch("/api/products")
        .then(res => res.json())
        .then(
          (result) => {

            if (Object.keys(result).length != 0) {
              setIsLoaded(true);
              setSongs(result);
            } else {
              setError(c => !c)
            }

          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
    if (error) {
      setTimeout(() => {
        fetchSongs();
      }, [2000])// 1 second
    } else {
      fetchSongs();
    }
  }, [error])

  //Add controlers to a list to be able to set states

  const addObject = (object) => {
    playControllersList.push(object)
    setPlayControllers(playControllersList)
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

  // useEffect(() => {
  //   if (playControllersList.length == 0) {
  //     setControllersError(true)
  //   }
  //   else
  //     setPlayControllers(playControllersList)

  // }, [controllersError])


  //Check if a sound has been loaded to play and if it has, play it

  useEffect(() => {
    if (sound != null) {
      if (PlayingSound) {
        sound.play()
      } else {
        sound.pause()
        setSound(null)
        let currentControllers = playControllers
        for (var x = 0; x < currentControllers.length; x++) {
          currentControllers[x].state.displayPlayButton = true
        }
        setPlayControllers(currentControllers)
      }
    }

  }, [PlayingSound])


  return (
    <div className='h-fit bg-gray-100 dark:bg-slate-900'>
      <Head>
        <title>Soundman Productions</title>
        <meta property="og:title" content="Harambe Productions"></meta>
      </Head>
      <Navbar />
      <div className='w-4/5 mx-auto mt-10'>
        {/* <div className='fixed w-52 h-20'><h1>Check out cancled {status}</h1></div> */}
        {status ?
          {
            'success': <div className='w-5/6 h-16 border-2 border-green-400 bg-green-400/25 rounded-lg flex justify-center items-center mx-auto relative'><div className='absolute top-1 left-2 hover:cursor-pointer text-red-400' onClick={() => router.push('/')}><FontAwesomeIcon icon={faClose} size="lg" className='text-red' /></div><h1 className='text-slate-600 dark:text-slate-200 font-bold ' >Check out completed <span className='underline text-slate-400'><Link href="/dashboard">Access dashboard</Link></span></h1></div>,
            'cancel': <div className='w-5/6 h-16 border-2 border-red-400 bg-red-400/25 rounded-lg flex justify-center items-center mx-auto relative'><div className='absolute top-1 left-2 hover:cursor-pointer text-red-400' onClick={() => router.push('/')}><FontAwesomeIcon icon={faClose} size="lg" className='text-red' /></div><h1 className='text-slate-600 dark:text-slate-200 font-bold '>Check out canceled</h1></div>,

          }[status]
          : null}
        <div className='flex flex-row min-w-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg items-center justify-between my-5 p-10'>
          <div className='flex flex-col justify-start'>
            <h1 className='justify-self-end text-white text-4xl'>Find the perfect beat for you</h1>
            <h2 className='text-white/75 text-2xl'>Shop our seasoned inventory of sounds to see what fits</h2>
            <a href="#main" className=' rounded-lg my-5 text-xl text-white'>Take a listen <FontAwesomeIcon icon={faCaretDown} size="sm" className='animate-bounce ml-2' /></a>
          </div>
          <div>
            <img src="img/music-note.jpeg" className='h-40 rounded-lg'></img>
          </div>
        </div>

        <section id="main" className='w-full h-fit'>
          <div id="popular" className=' text-black dark:text-white my-10'>
            {/* <h1 className='text-2xl mb-5 font-bold'>Popular Tracks</h1> */}
            <div id="popular-cards" className='flex flex-row flex-wrap gap-10 overflow-scroll py-5'>
              {isLoaded ? songs?.map((data) => (
                // border-2 border-gray-300 dark:border-gray-700
                <div className='rounded-lg  p-2 flex flex-col justify-around drop-shadow-lg ' key={data._id}>
                  <div className='w-44 h-44 min-w-cards mb-4 overflow-hidden flex flex-col justify-center rounded-lg p-1 drop-shadow-lg border-2 border-black/25 dark:border-white/25'>
                    <img src={data.image} className='rounded-md min-w-full'></img>
                  </div>
                  <ProductInteractions passedFunction={() => setPlayingSound(!PlayingSound)} soundPlaying={PlayingSound} changeState={changeState} addObject={addObject} audio={audio} product={data} />
                  {/* <button className='hover:text-red-500 transition'>
                      <FontAwesomeIcon icon={faPlayCircle} />
                    </button> */}

                </div>
              )) :
                <button disabled type="button" className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 inline-flex items-center">
                  <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                  </svg>
                  Loading...
                </button>
              }
            </div>

          </div>
          {/* <div id="new" className='text-black dark:text-white my-10'>
            <h1 className='text-2xl mb-5'>New Tracks</h1>
            <div id="new-cards" className='flex flex-row flex-nowrap gap-10 overflow-scroll py-5'>
              {isLoaded ? songs?.map((data) => (
                <div className='rounded-lg' key={data.key}>
                  <div className='w-44 h-44 min-w-cards mb-4 overflow-hidden'>
                    <img src="img/music-note.jpeg" className='rounded-md min-w-full min-h-full'></img>
                  </div>
                  <div className='flex flex-row justify-between'>
                  <a href="#" className='hover:text-red-500 transition'><h1>{data.title}</h1></a>
                  <FontAwesomeIcon icon={faPlayCircle} className="text-red-500"/>
                    </div>
                </div>
              )) :
                <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 inline-flex items-center">
                  <svg role="status" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                  </svg>
                  Loading...
                </button>
              }
            </div>

          </div> */}
        </section>
      </div>
      <Footer />
    </div>
  )
}
