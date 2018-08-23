import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

class Dialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            txtmsg: ''
        }
        this.handleTxtArea = this.handleTxtArea.bind(this)
        this.handleTxtSend = this.handleTxtSend.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        console.log("props in dialog ", props)
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

    handleTxtSend() {
        this.props.updateData(this.state.txtmsg);
        this.setState({
            txtmsg: ''
        });
    }

    handleEnter(event) {
    	console.log("hit a key ", event.keyCode);
    	if (event.keyCode === 13) {
    		this.handleTxtSend();
    	}
    }

    handleTxtArea(event) {
        this.setState({
            txtmsg: event.target.value
        })
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
                </div>
                <div className="message-form" onKeyUp={this.handleEnter}>
                    <textarea ref={this.props.txtmsg} name="msgcontent" rows="2" wrap="soft" placeholder="Write smth for young female wolves..."
                        onChange={this.handleTxtArea} value={this.state.txtmsg !== "" ? this.state.txtmsg : ""}/>
                    <Button type="primary" name={this.props.withWho} onClick={this.handleTxtSend}>send</Button>
                </div>
            </div>
        )
    }
}

export default Dialog;
