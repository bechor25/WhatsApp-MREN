import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined }  from '@material-ui/icons';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
                <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQHqWNAhWaqE4A/profile-displayphoto-shrink_200_200/0/1605612270313?e=1617840000&v=beta&t=GtP1QEcchLPyC_JfIu-SwSFbC7t64Lk0whbQvVJYz5M" />
            <div className="sidebar__headerRight">
                <IconButton>
                <DonutLargeIcon />
                </IconButton>
                <IconButton>
                <ChatIcon />
                </IconButton>
                <IconButton>
                <MoreVertIcon />
                </IconButton>
            </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>

            </div>
            <div className="sidebar__chats">
    <SidebarChat />
    <SidebarChat />
    <SidebarChat />
</div>
        </div>
    )
}

export default Sidebar
