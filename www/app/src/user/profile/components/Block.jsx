import React, { Component } from 'react';
import { Tooltip, Button, Icon } from 'antd';
import { PostData } from '../../main/components/PostData';
import jwtDecode from 'jwt-decode';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Block extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			target: props.target
		}
		this.handleblock = this.handleblock.bind(this)
	}

	componentDidMount() {
		this.conn = new WebSocket('ws://localhost:8090')
		this.conn.handleblock = this.handleblock.bind(this)
	}
	
	handleblock(event) {
		this.conn.send(JSON.stringify({
			event: event,
			payload: this.state.curentUserId + ' blocked ' + this.state.target,
			ava: '',
			user_id: this.state.curentUserId,
			target_id: parseInt(this.state.target, 10)
		}))
	}

	onClick(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			PostData('user/block', {uId: user.userId, target: this.state.target}).then((res) => {
				this.setState({
					curentUserId: user.userId,
					msg: res.msg
				}, this.handleblock(res.event))
				iziToast.info({
				    message: res.msg,
				    position: 'topRight',
				    progressBar: false
				})
			})
		}
	}

	render(){
		return(
			<Tooltip placement="topLeft" title="Never show me">
				<Button type="primary" className="target-btn" onClick={this.onClick.bind(this)}>
					<Icon type="close-circle-o" />
				</Button>
			</Tooltip>
		)
	}
}

export default Block;