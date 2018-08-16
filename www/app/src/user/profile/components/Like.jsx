import React, { Component } from 'react'
import { Tooltip, Button, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import jwtDecode from 'jwt-decode'
import {findDOMNode} from 'react-dom'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class Like extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			target: props.target
		}
		this.handleLike = this.handleLike.bind(this)
		console.log("state in like ", this.state)
	}

	componentWillMount(){
		this.conn = new WebSocket('ws:/\/localhost:8090')
		this.conn.handleLike = this.handleLike.bind(this)
		this.setState({target: this.props.target})
	}
	
	handleLike(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			PostData('user/like', {uId: user.userId, target: this.state.target}).then((res) => {
				console.log("you liked user ")
				res.check == true ? this.setState({liked: true}) : this.setState({liked: false})
				this.setState({
					curentUserId: user.userId,
					msg: res.msg
				})
				iziToast.info({
					message: res.msg,
					position: 'topRight',
					progressBar: false
				})
				if (res.check == true && res.match == undefined) {
					this.conn.send(JSON.stringify({
						event: 'setLike',
						payload: res.fromWhoName + ' like you',
						ava: res.fromWhoPic,
						user_id: this.state.curentUserId,
						target_id: this.state.target
					}))
				} else if (res.removedMatch1 || res.removedMatch2) {
					this.conn.send(JSON.stringify({
						event: 'disLike',
						payload: res.fromWhoName + ' unlike you',
						ava: res.fromWhoPic,
						user_id: this.state.curentUserId,
						target_id: this.state.target
					}))
				}
				else if (res.match != undefined) {
					this.conn.send(JSON.stringify({
						event: 'match',
						payload: 'You got a match with ' + res.fromWhoName,
						ava: res.fromWhoPic,
						user_id: res.match.partner1,
						target_id: res.match.partner2
					}))
				}
			})
		}
	}	

	render(){
		return(
			<Tooltip placement="topLeft" title={this.state.liked === true ? "Unlike profile" : "Like profile"}>
				<Button type="primary" className="target-btn" onClick={this.handleLike}>
					<Icon type="like-o" />
				</Button>
			</Tooltip>
		)
	}
}

export default Like;