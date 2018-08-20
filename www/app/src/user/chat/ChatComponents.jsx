import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';
import './chat.css';
import 'antd/dist/antd.css'
import { Button } from 'antd';
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class ChatContent extends Component{
    constructor(props){
        super(props);
        this.handleTxtArea = this.handleTxtArea.bind(this)

    }
    // if (props.show === undefined) {
    //     props.show = 
    // }

    handleTxtArea(event) {
        this.setState({
            txtmsg: event.target.value
        })
        // this.props.txtmsg = event.target.value
        // console.log("input msg ", event.target.value)
    }

    render(){
        return(
            <div className="message-content">

                <div className="message-box">
                    {this.props.conversation.map((twit, i) => 
                        twit.sender === this.props.withWho ? (
                            <div className="message-box__item incoming" key={i}>
                                <div className="name"><b>{this.props.withWhoName}</b></div>

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
                    <textarea ref={this.props.txtmsg} name="msgcontent" rows="2" wrap="soft" placeholder="Write smth for young female wolves..."
                        onChange={this.handleTxtArea}/>
                    <Button type="primary" name={this.props.withWho} onClick={() => {this.props.updateData(this.state.txtmsg)}}>send</Button>
                </div>
            </div>
        )
    }
}


class ChatComponents extends Component {
    constructor(props) {
        super(props);
        const user = jwtDecode(localStorage.getItem('token'));
        this.state = {
            currentUserId: user.userId,
            txtmsg: '',
            withWho: ''
        }
        this.conn = new WebSocket('ws:/\/localhost:8090')
        this.onMessage = this.onMessage.bind(this);
        this.conn.onmessage = this.onMessage.bind(this)
        this.updateData = this.updateData.bind(this)
        this.conn.handleSendMsg = this.updateData.bind(this)
        this.showMessageHistory = this.showMessageHistory.bind(this)
        console.log("chat props ", this.props)
        
    }

    componentWillMount(){
        const token = localStorage.getItem('token');
        if (token !== null) {
            const user = jwtDecode(token);
            // console.log("data in token ", user)

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
            }, PostData('message/historyInit', {userId: this.state.currentUserId}).then ((result) => {
                    this.setState({
                        withWho: result.data[0].withWho,
                        userName: user.userName + ' ' + user.userSurname,
                        myPic: result.myAva,
                        conversations: result.data,
                        toPrint: result.data[0]
                    })
                    // console.log("result data  ", result.data[0])
                })
            );
            // console.log("state in chat ", this.state)
            if (this.state.full === false) {
                history.push('/cabinet');
            }
        }
    }

    showMessageHistory(e){
        // console.log(e.currentTarget) 
        // console.log(e.currentTarget.name)
        if (e.currentTarget.name) {
            this.setState({
                withWho: parseInt(e.currentTarget.name, 10),
                toPrint: this.state.conversations.filter(conversation => conversation.withWho === parseInt(e.currentTarget.name, 10))
            })
        }
      
    }

    onMessage(event){
        const data = JSON.parse(event.data);
        const date = new Date()
        if (data.event === 'message' && data.user_id !== this.state.currentUserId) {
            PostData('message/get', {
                    sender: data.user_id, 
                    reciever: this.state.currentUserId,
                }). then ((res) => {
                    let newMsg = this.state.conversations.filter(conversation => conversation.withWho === parseInt(data.user_id, 10))
                    // const arrayA = newMsg.messages;
                    // console.log("catch obj ", newMsg)
                    // console.log("catch obj and its mesagies ", newMsg[0].messagies)
                    const arrayB = {sender: data.user_id, content: data.myVar.trim(), time: date.getHours() + ':' + date.getMinutes()};
                    // console.log("array to push ", arrayB)
                    newMsg[0].messagies.push(arrayB)
                    // console.log("messagies after push ", newMsg)
                    const forPrint = this.state.conversations.map(obj => newMsg.find(o => o.withWho === obj.withWho) || obj)
                        this.setState({
                            conversations: forPrint,
                            withWho: data.user_id
                        })
                   })
            
            // iziToast.show({
            //     theme: 'dark',
            //     icon: 'icon-msg',
            //     image: data.ava,
            //     imageWidth: 50,
            //     maxWidth: '500px',
            //     message: data.payload,
            //     position: 'topRight',
            //     progressBar: false
            // })
        }
    }

    updateData(value) {
        const date = new Date()
        this.setState({txtmsg: value}, 
            this.conn.send(JSON.stringify({
                event: 'message',
                payload: this.state.userName + ' sent you a message',
                ava: this.state.myPic,
                user_id: this.state.currentUserId,
                target_id: this.state.withWho,
                myVar: value
            }), PostData('message/send', {uId: this.state.currentUserId, 
                    target: this.state.withWho, 
                    time: date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(), 
                    msg: value.trim()}).then ((res) => {
                        this.setState({
                            conversations: res.data
                        })
                    })
            )
        )
    }

    // handleSendMsg(event){
        // console.log("click send ", this.txtmsg)
        // this.conn.send(JSON.stringify({
        //     event: 'message',
        //     payload: 'SOme message txt',
        //     ava: 'https:/\/i.pinimg.com/564x/a6/3b/8c/a63b8c2cb33e56e5e30cb2a6f79373b5.jpg',
        //     user_id: this.state.currentUserId,
        //     target_id: 17
        // }))
    // }

    render() {
        const conversations = this.state.conversations
        let toPrint = new Object()
        if (conversations !== undefined && this.state.withWho !== undefined){
            // let withWho = this.state.withWho
            toPrint = conversations.filter(conversation => conversation.withWho === this.state.withWho)
            // console.log("toPrint ", toPrint)
        }
        else if (conversations !== undefined && conversations.length > 0) {
            toPrint = conversations[0]
            // console.log("toPrint2 ", toPrint)
        }        
        return (
            <div id="wrapper" className="chatComponent">
                <div className="messages">
                    <div>
                        <Button className="morePeople" icon="plus" size="large">See all possible users for chat</Button>
                    </div>
                    {conversations !== undefined && conversations.length > 0 ? 
                        conversations.map((conversation) => (
                            <Button className={ this.state.withWho === conversation.withWho ? "messages__item messages__item-actieve" : "messages__item"} key={conversation.withWho} name={conversation.withWho} onClick={this.showMessageHistory}>
                                <div className="name-img" name={conversation.withWho}>
                                    <img className="name-img__src" src={conversation.ava} name={conversation.withWho} alt="Chat with this person"></img>
                                </div>
                                <div className="name" name={conversation.withWho}>
                                    <b>{conversation.name}</b>
                                </div>
                            </Button>
                        )) 
                        : null
                    }
                </div>
                    {conversations !== undefined && conversations.length > 0 && this.state.withWho !== undefined ?    
                        (<ChatContent updateData={this.updateData} withWho={toPrint[0].withWho} withWhoName={toPrint[0].name} me={this.state.currentUserId} conversation={toPrint[0].messagies}/>)
                        :
                        (<div className="message-content"></div>)
                    }
                    


            </div>


        );
    }
}
export default ChatComponents;