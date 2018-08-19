import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';
import './chat.css';
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

class ChatComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.conn = new WebSocket('ws:/\/localhost:8090')
        this.conn.onmessage = this.onMessage.bind(this)
        const user = jwtDecode(localStorage.getItem('token'));
        this.state = {
            currentUserId: user.userId
        }
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
                }, this.forceUpdate())
                
                // this.forceUpdate(console.log("TUT"))
            })
        }
    }

    // componentDidUpdate(){
    //    this.forceUpdate()
    // }

    // componentDidMount(){
    // //     PostData('message/historyInit', {userId: this.state.currentUserId}).then ((result) => {
    // //             this.setState({
    // //                 conversations: result.conversation
    // //             })

    // //         })
    //     this.forceUpdate(console.log("TUT"))
    // }

    onMessage(){

    }

    render() {
        const conversations = this.state.conversations
        console.log("perepiska ", conversations)
        return (
            <div id="wrapper" className="chatComponent">
                <div className="messages">
                    {conversations !== undefined ?
                        conversations.map((conversation, i) => {
                        <NavLink to="_" className="messages__item" key={i}>
                            <div className="name-img">
                                <img className="name-img__src" src={conversation.ava}></img>
                            </div>
                            <div className="name">
                                <b>{conversation.name}</b>
                            </div>
                        </NavLink>
                        }) : null
                    }
                </div>

                <div className="message-content">

                    <div className="message-box">
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>

                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                            
                        </div>
                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                            
                        </div>
                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                            
                        </div>
                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                            
                        </div>
                        <div className="message-box__item outgoing">

                            <div className="box-text">
                                Гріла під серцем вовчат,
                                Молода вовчиця
                                <div className="time">18:36</div>
                            </div>
                            
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-box__item incoming">
                            <div className="name"><b>Алежа</b></div>

                            <div className="box-text">
                                Падав безжалісно град,
                                Била блискавиця...
                                <div className="time">18:36</div>
                            </div>
                        </div>
                        <div className="message-form">
                            <textarea name="text" rows="2" wrap="soft" placeholder="Write smth for young female wolves..."/>
                            <Button type="primary">send</Button>
                        </div>
                        
                    </div>
                     
                </div>

            </div>


        );
    }
}
export default ChatComponents;