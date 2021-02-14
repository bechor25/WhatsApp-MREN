import { Avatar } from '@material-ui/core';
import React from 'react';
import "./SidebarChat.css";
//user detalis
function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar src="https://avatars.dicebear.com/4.5/api/male/avsar.svg"/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
