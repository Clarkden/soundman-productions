/* eslint-disable */

import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export default function test() {
   
    const { data: session } = useSession()
    const [songs, setSongs] = useState(null)
    const [loaded, setLoaded] = useState(false)

    async function testing() {

        fetch(`/api/userSounds/${session.user.name}`)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.status === 200)
                    {
                        setLoaded(true)
                        setSongs(result.message.songs)
                    }
                        
                    else if(result.status === 404)
                        console.log(result.message)
                },
                (error) => {
                    console.log(error)
                }
            )

        
    }

return (
        //   <Link href="/api/userSounds/pinky">Test</Link>
        <div>
            <button onClick={() => testing()}>User:</button>
            {loaded ? songs?.map((data) => (
                <div key={data._id}>
                    <text>{data.title}</text>
                    <img src={data.image}></img>
                </div>
                
            )) : null}
        </div>
        
    )   
    
}

