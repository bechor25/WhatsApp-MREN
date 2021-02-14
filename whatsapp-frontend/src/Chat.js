import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React, { useState } from 'react';
import axios from './axios';
import './Chat.css';
import MicIcon from '@material-ui/icons/Mic';
function Chat({ messages }) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) =>{
        e.preventDefault();

        await axios.post("/messages/new",{
            message: input,
            name:"bechor app",
            timestamp:`${new Date().toUTCString()}`,
            received:false,
        });

        setInput('');
    };
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://avatars.dicebear.com/4.5/api/male/avnar.svg"/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at {new Date().toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__massage ${message.received && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                        {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a massage" 
                    type="text" />
                    <button onClick={sendMessage} 
                    type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat