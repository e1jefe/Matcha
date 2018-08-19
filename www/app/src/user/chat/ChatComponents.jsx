import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';
import './chat.css';
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

const ChatContent = (props) => {
    console.log("experiment props ", props)
    // if (props.show === undefined) {
    //     props.show = 
    // }
    return(
        <div className={props.show === props.withWho ? "message-content" : "visibleChat-hidden"}>

            <div className="message-box">
                {props.conversation.map((twit, i) => 
                    twit.sender === props.withWho ? (
                        <div className="message-box__item incoming" key={i}>
                            <div className="name"><b>{props.withWhoName}</b></div>

                            <div className="box-text">
                                { twit.content }
                                <div className="time">{ twit.time }</div>
                            </div>
                        </div>
                    ) : (
                        <div className="message-box__item outgoing" key={i}>
                            <div className="box-text">
                                { twit.content }
                                <div className="time">{ twit.time }</div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="message-form">
                <textarea name="text" rows="2" wrap="soft" placeholder="Write smth for young female wolves..."/>
                <Button type="primary">send</Button>
            </div>
        </div>
    )
}


class ChatComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.conn = new WebSocket('ws:/\/localhost:8090')
        // this.conn.onmessage = this.onMessage.bind(this)
        const user = jwtDecode(localStorage.getItem('token'));
        this.state = {
            currentUserId: user.userId
        }
        this.showMessageHistory = this.showMessageHistory.bind(this)
    }

    componentWillMount(){
        const token = localStorage.getItem('token');
        if (token !== null) {
            const user = jwtDecode(token);

            PostData('user/isFull', {userId: user.userId}).then ((result) => {
                if (result.error !== '' || result.error !== undefined) {
                    this.setState({ 
                        errMsg: result.error
                    });
                } else {
                    this.setState({ 
                        full: result
                    }, () =>{this.setState({full: result})});
                }
            });
            console.log("state in chat ", this.state)
            if (this.state.full === false) {
                history.push('/cabinet');
            }
            PostData('message/historyInit', {userId: this.state.currentUserId}).then ((result) => {
                this.setState({
                    conversations: result.data
                })
                // console.log(result.check, result.data)
            })
        }
    }

    showMessageHistory(e){
        console.log(e.target) 
        console.log(e.target.name)
        if (e.target.name) {
              this.setState({withWho: parseInt(e.target.name)})
        }
      
    }

    render() {
        const conversations = this.state.conversations
        // console.log("perepiska ", conversations)
        // conversations !== undefined ? conversations.map((conversation) => {console.log(conversation)}) : null
     
        return (
            <div id="wrapper" className="chatComponent">
                <div className="messages">
                    {conversations !== undefined && conversations.length > 0 ? 
                        conversations.map((conversation) => (
                            <Button className="messages__item" key={conversation.withWho} name={conversation.withWho} onClick={this.showMessageHistory}>
                                <div className="name-img" name={conversation.withWho}>
                                    <img className="name-img__src" src={conversation.ava} name={conversation.withWho}></img>
                                </div>
                                <div className="name" name={conversation.withWho}>
                                    {conversation.name}
                                </div>
                            </Button>
                        )) 
                        : null
                    }
                </div>
                    {conversations !== undefined && conversations.length > 0  && this.state.withWho > 0 ? 
                        conversations.map((conversation) => (
                            <ChatContent key={conversation.ava} withWho={conversation.withWho} withWhoName={conversation.name} me={this.state.currentUserId} conversation={conversation.messagies} show={this.state.withWho}/>
                        ))
                        : null
                    }
                    


            </div>


        );
    }
}
export default ChatComponents;