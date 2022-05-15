/* eslint-disable */

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import Sidebar from '../../components/sidebar'


export default function createSound({ admins }) {
  const { data: session } = useSession()

  if (session) {

    let admin = false

    for (let x = 0; x < admins.length; x++) {
      if (session.user.email === admins[x].email)
        admin = true
    }

    if (admin) {

      return (
        <div className='w-screen h-screen flex flex-row dark:bg-black'>
          <Sidebar admin={admin} />
          <div className='flex justify-center items-center mx-auto'>
            <form method="post" action="/api/products" className='flex flex-col gap-5  w-full justify-center items-center'>
              <input type="text" id="title" name="title" placeholder='Title' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <input type="text" id="description" name="description" placeholder='Description' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <input type="text" id="image" name="image" placeholder='Image' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <input type="text" id="previewSound" name="previewSound" placeholder='Preview Sound' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <input type="text" id="productionSound" name="productionSound" placeholder='Production Sound' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <input type="text" id="price" name="price" placeholder='Price' className='border-2 border-neutral-600 rounded-lg p-1 w-72 dark:bg-neutral-900' required></input>
              <button className='bg-green-400 rounded-lg p-2 w-72'>Create Product</button>
            </form>
          </div>
        </div>

      )
    }
    else {
      return (
        <h1>You are not permitted.</h1>
      )
    }
  } else {
    return (
      <h1>You are not permitted.</h1>
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