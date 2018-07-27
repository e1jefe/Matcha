import React, { Component } from 'react';
import './Chat.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChatComponents from './ChatComponents'

class Chat extends Component {
    render(){
        return(
            <div>
                <ChatComponents />
            </div>
        );
    }
}

export default Chat;