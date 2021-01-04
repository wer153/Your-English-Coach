import React, {useState} from 'react'
import './STT.styles.scss'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useSpeechSynthesis } from 'react-speech-kit';

const STT = () => {
    const { transcript } = useSpeechRecognition()
    const [ script, setScript] = useState('This is my script');
    const { speak, voices } = useSpeechSynthesis();

    const voice = voices[1]

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const handleClick = () => {
        fetch('https://puzzle.mead.io/puzzle')
        .then(response => response.json())
        .then(json => setScript(()=>json.puzzle))
        }

    return (
        <div className="container">

            <h1>Your English Speech Coach</h1>
            <h2>Script</h2>
            <button className='action-button shadow animate color' onClick={handleClick}>next</button>
            <div className="paper">
                <p>{script}</p>
            </div>
            
            <h2>How You Sound</h2>
            <div>
                <button className='action-button shadow animate color' onClick={SpeechRecognition.startListening}>Start</button>
                <button className='action-button shadow animate color' onClick={SpeechRecognition.stopListening}>Stop</button>
            </div>
            <div className="paper">
                <p>{transcript}</p>
            </div>
            <div 
                className='action-button shadow animate color' 
                onClick={() => speak({text: script, voice:voice})}>
                Click me to hear native speaker's speech
            </div>
            
        </div>
    )
}

export default STT