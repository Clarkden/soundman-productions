import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { useRouter } from "next/router"

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

export default function SignIn({ providers }) {
    const router = useRouter()

    return (
        <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
            <div className="bg-slate-100 w-4/12 h-1/2 rounded-lg p-2 flex flex-col gap-4 justify-center">
                <h1 className="font-bold text-black text-2xl mx-auto mb-10">Sign In</h1>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name} className="min-w-full">
                        <button className="text-gray-800 bg-slate-400 p-2 rounded-lg w-full mx-auto" onClick={() => signIn(provider.id, {
                            callbackUrl: '/'
                        })}>Sign in with {provider.name} {
                                {
                                    'GitHub': <FontAwesomeIcon icon={faGithub} />,
                                    'Twitter': <FontAwesomeIcon icon={faTwitter} />,

                                }[provider.name]
                            }</button>
                    </div>

                )
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const providers = await getProviders()
    return {
        props: { providers },
    }
}