import React, { Component } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';
import 'antd/dist/antd.css';
import ButtonSend from './ButtonSend';

class Dialog extends Component {
	
	componentDidMount() {
		this.scrollToBottom()
	}

	componentDidUpdate() {
		this.scrollToBottom()
	}

	scrollToBottom() {
		scrollIntoView(this.node, {
			block: 'end',
			behavior: 'smooth',
		});
	}

	render(){
		let conversation = this.props.conversation;
		if (conversation !== undefined) {
			if (conversation[0].sender === '') {
				conversation = conversation.slice(1);
			}
		}
		return(
			<div className="message-content__holder">
				<div className="message-content">
					<ScrollIntoViewIfNeeded options={{ scrollMode: 'always' }}>
						<div className="message-box" ref={node => this.node = node} >
							{conversation.length !== 0 && conversation[0].sender !== '' ?
								conversation.map((twit, i) => 
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
					</ScrollIntoViewIfNeeded>
				</div>
				<ButtonSend txtmsg={this.props.txtmsg} name={this.props.withWho} updateData={this.props.updateData}/>
			</div>
		)
	}
}

export default Dialog;
