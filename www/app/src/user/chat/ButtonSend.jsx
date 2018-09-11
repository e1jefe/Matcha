import React, { Component } from 'react';
import { Button } from 'antd';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class ButtonSend extends Component{
	constructor(props) {
		super(props);
		this.state = {
			txtmsg: ''
		}
		this.handleTxtArea = this.handleTxtArea.bind(this)
		this.handleTxtSend = this.handleTxtSend.bind(this)
		this.handleEnter = this.handleEnter.bind(this)
	}

	handleTxtSend() {
		const cyrillicPattern = /[\u0400-\u04FF]/;
		if (!cyrillicPattern.test(this.state.txtmsg)) {
			const mesage = this.state.txtmsg.trim();
			if (mesage !== '') {
				this.props.updateData(this.state.txtmsg);
			}
		} else {
			iziToast.warning({
				title: 'Warning',
				message: 'No cyrillic letters',
				position: 'center',
				timeout: 3000,
				progressBar: false
			})
		}
		this.setState({
			txtmsg: ''
		});
	}

	handleEnter(event) {
		if (event.keyCode === 13) {
			this.handleTxtSend();
		}
	}

	handleTxtArea(event) {
		this.setState({
			txtmsg: event.target.value
		})
	}

	render() {
		return(
			<div className="message-form" onKeyUp={this.handleEnter}>
				<textarea ref={this.props.txtmsg} name="msgcontent" rows="2" wrap="soft" placeholder="Write smth..."
					onChange={this.handleTxtArea} value={this.state.txtmsg !== "" ? this.state.txtmsg : ""}/>
				<Button type="primary" name={this.props.name} onClick={this.handleTxtSend}>send</Button>
			</div>
		)
	}
}

export default ButtonSend;