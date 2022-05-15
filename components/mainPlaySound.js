import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPauseCircle, faPlay, faPlayCircle, faShoppingBag, faStop, faStopCircle } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

import { withRouter } from 'next/router'

class playSound extends Component {

    //Stripe Data


    constructor(props) {
        super(props)
        this.state = {
            displayPlayButton: true,
        }
        this.audio = {
            source: this.props.product.previewSound
        }
        this.product = {
            name: this.props.product.title,
            description: this.props.product.description,
            image: this.props.product.image,
            quantity: 1,
            price: this.props.product.price
        }
        this.props.addObject(this)

        this.router = this.prosp

        //Stripe Data
        this.publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        this.stripePromise = loadStripe(this.publishableKey);
    }


    setSound = (source) => {

        if (!this.props.soundPlaying) {
            this.setState({ displayPlayButton: false })
            // this.props.passedFunction(true)
            this.props.audio(source, this.props.product.id)
        }
        else {
            this.setState({ displayPlayButton: true })
            this.props.changeState(true)
            this.props.passedFunction(false)
            //this.props.audio(source, this.id)
        }
    }

    createCheckOutSession = async () => {
        const stripe = await this.stripePromise;
        await axios.post('/api/create-stripe-session', {
            item: this.product,
        }).then((response) => {
            stripe.redirectToCheckout({
                sessionId: response.data.id,
            });
        })
        .catch((error) => { 
            
            if (error.response) {
                this.props.router.push("/dashboard")
                // console.log(error.response.data.message)
        }  else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        })

        
    };

    render() {
        return (
            <div>
                {/* border-2 border-gray-300 dark:border-gray-700  flex flex-row justify-between*/}
                <div className='flex gap-2 items-baseline  rounded-lg px-2 justify-between drop-shadow-lg border-2 border-black/25 dark:border-white/25 p-2'>
                    <div><h1 className=''>{this.props.product.title}</h1></div>
                    <div className='flex gap-2'>
                        <button onClick={this.createCheckOutSession} className='text-gray-500 dark:text-red/75'><FontAwesomeIcon icon={faShoppingBag} className="text-green-500 dark:text-green-300  hover:scale-125 transition" /></button>
                        <a onClick={() => { this.setSound(this.audio.source); }} className="hover:cursor-pointer">
                            {this.state.displayPlayButton ? <FontAwesomeIcon icon={faPlayCircle} size="lg" className='text-red-500 hover:scale-125 transition' /> : <FontAwesomeIcon icon={faStopCircle} size="lg" className='text-yellow-500 hover:scale-125 transition' />}
                        </a>
                    </div>


                </div>
                {/* {!this.state.displayPlayButton ? <AudioPlayer
                    className='rounded-t-lg fixed bottom-0 left-0'
                    src={'https://docs.google.com/uc?export=download&id=184FHIt9zcGgY-62FNvVEIvhmqLrxxrrf'}
                // other props here
                /> : null}  */}
            </div>

        )
    }
}

export default withRouter(playSound)