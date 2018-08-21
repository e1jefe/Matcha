import React, { Component } from 'react';
import './chat.css';
import ChatComponents from './ChatComponents';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';

class Chat extends Component {
    render(){
        console.log(" props in chat ", this.props)

        return(
            <div>
                <Header/>
                <ChatComponents login={this.props.login}/>
                <Footer />
            </div>
        );
    }
}

export default Chat;