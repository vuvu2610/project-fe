import { usePubSub } from '@videosdk.live/react-sdk'
import React, { MutableRefObject, useEffect, useRef } from 'react'

interface Props {}

function Chat(props: Props) {

    const {messages, publish} = usePubSub("CHAT")
    const input = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if (input.current) {
            const message = input.current.value;
            publish(message, {persist: true});
            input.current.value = "";
            
        }
    }
   
    useEffect(() => {

    }, [messages])

    return (
        <>
        <ul className='border-solid border-2 border-red-50' >
            <h1>CHAT ROOM</h1>
            {messages.map((message, index) => (
                <li key={index}>
                    <p>{message.message}</p>
                </li>
            ))}
        </ul>
        <input ref={input} type="text"  />
        <button onClick={handleClick} >SUBMIT</button>
        </>
    )
}

export default Chat
