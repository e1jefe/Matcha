import React, { Component } from 'react';
import './Chat.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChatComponents from './ChatComponents'

class Chat extends Component {
    render(){
        return(
            <div>
                <ChatComponents login={this.props.login}/>)}/>
            </div>
        );
    }
}

export default Chat;