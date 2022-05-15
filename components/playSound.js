import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class playSound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayPlayButton: true,
        }
        this.audio = {
            source: this.props.audioSource
        }
        this.props.addObject(this)
    }


    setSound = (source) => {

        if(!this.props.soundPlaying)
        {
            this.setState({displayPlayButton: false})
            // this.props.passedFunction(true)
            this.props.audio(source, this.props.id)
        }
        else
        {
            this.setState({displayPlayButton: true})
            this.props.changeState(true)
            this.props.passedFunction(false)
            //this.props.audio(source, this.id)
        }
    }

    render() {
        return (
            <div>
                <a onClick={() => {this.setSound(this.audio.source);} } className="hover:cursor-pointer">
                    {this.state.displayPlayButton ?  <FontAwesomeIcon icon={faPlay} size="lg" className='text-green-300' /> : <FontAwesomeIcon icon={faStop} size="lg" className='text-red-300' /> }
                </a>
                {/* {!this.state.displayPlayButton ? <AudioPlayer
                    className='rounded-t-lg fixed bottom-0 left-0'
                    src={'https://docs.google.com/uc?export=download&id=184FHIt9zcGgY-62FNvVEIvhmqLrxxrrf'}
                // other props here
                /> : null}  */}
            </div>

        )
    }
}
