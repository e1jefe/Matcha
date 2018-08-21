import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';
import './chat.css';
import 'antd/dist/antd.css'
import { Button } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class ChatContent extends Component{
    constructor(props){
        super(props);
        this.handleTxtArea = this.handleTxtArea.bind(this)
    }

    componentDidMount() {
        this.scrollToBottom()

    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom() {
        this.el.scrollIntoView({ block: "end", behavior: 'smooth' });

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

                <div className="message-box" ref={el => { this.el = el; }}>
                    {this.props.conversation.sender !== '' ?
                        this.props.conversation.map((twit, i) => 
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
                        ) : (
                                <div className="message-box__item">Don't be shy, send a wink -_o </div>
                            )
                    }
                    <div className="message-form">
                        <textarea ref={this.props.txtmsg} name="msgcontent" rows="2" wrap="soft" placeholder="Write smth for young female wolves..."
                            onChange={this.handleTxtArea}/>
                        <Button type="primary" name={this.props.withWho} onClick={() => {this.props.updateData(this.state.txtmsg)}}>send</Button>
                    </div>
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
        this.addNewChat = this.addNewChat.bind(this)
        // this.showMorePeople = this.showMorePeople.bind(this)
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
                        toPrint: result.data[0],
                        myMatches: result.myMatches
                    }),
                    console.log("myMatches  ", result.myMatches)
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

    addNewChat (e) {
        // e.preventDefault()
        // console.log(e.key)
        const identifier = e.key
        const toChat = this.state.myMatches[identifier].withWho
        console.log(toChat)

        this.setState({
            withWho: toChat
        })
    }

    // showMorePeople(e) {
    //     e.preventDefault()
    //     console.log("my ID ", e.currentTarget.name)
    //     PostData('user/getMatches', {uId: e.currentTarget.name}).then((res) => {
    //         console.log("matches ", res.myMatches)
    //     })
    // }

    render() {
        const conversations = this.state.conversations
        let toPrint = new Object()
        if (conversations !== undefined && this.state.withWho !== undefined){
            // let withWho = this.state.withWho
            toPrint = conversations.filter(conversation => conversation.withWho === this.state.withWho)
            const nameMatch = this.state.myMatches.filter(match => match.withWho === this.state.withWho)
            const tmp = {
                    name: nameMatch[0].name,
                    withWho: nameMatch[0].withWho,
                    ava: nameMatch[0].ava,
                    messagies: {
                        sender: '',
                        time: '',
                        content: '',
                    }
                }
            if (toPrint.length === 0) {
                toPrint = new Array()
                toPrint.push(tmp)
                conversations.push(tmp)
            }
            // console.log("toPrint ", toPrint)
        }
        else if (conversations !== undefined && conversations.length > 0) {
            toPrint = conversations[0]
            // console.log("toPrint2 ", toPrint)
        }

        const menu = (
            <Menu onClick={this.addNewChat}>
                    {this.state.myMatches !== undefined && this.state.myMatches !== null ?
                        this.state.myMatches.map((match, i) => 
                            <Menu.Item key={i}>
                                <div className="messages__item" myprop={match.withWho}>
                                    <div className="name-img" myprop={match.withWho}>
                                        <img className="name-img__src" src={match.ava} myprop={match.withWho} alt="Chat with this person"></img>
                                    </div>
                                    <div className="name" myprop={match.withWho}>
                                        <b>{match.name}</b>
                                    </div>
                                </div>
                            </Menu.Item>
                        )
                        : 
                        <Menu.Item key="0">
                            <p id="notifTxt-null">This list is empty for now</p>
                        </Menu.Item>
                    }
            </Menu>
        )

        return (
            <div id="wrapper" className="chatComponent">
                <div className="messages">
                    
                    <Dropdown overlay={menu} trigger={['click']} onClick={this.showMorePeople} >
                        <Button name={this.state.currentUserId} className="morePeople" icon="plus" size="large">See all possible users for chat</Button>
                    </Dropdown>
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
                        (<ChatContent updateData={this.updateData} withWho={this.state.withWho} withWhoName={toPrint[0].name} me={this.state.currentUserId} conversation={toPrint[0].messagies}/>)
                        :
                        (<div className="message-content">Start conversation</div>)
                    }
            </div>
        );
    }
}
export default ChatComponents;