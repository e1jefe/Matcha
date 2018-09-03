import React, { Component } from 'react'
import { Tooltip, Button, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import jwtDecode from 'jwt-decode'
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
			PostData('user/hasAva', {userId: user.userId}).then((res) => {
				if (res) {
					PostData('user/like', {uId: user.userId, target: this.state.target}).then((res) => {
						res.check === true ? this.setState({liked: true}) : this.setState({liked: false})
						this.setState({
							curentUserId: user.userId
						})
						iziToast.info({
							message: res.msg,
							position: 'topRight',
							progressBar: false
						})
						if (res.check === true && res.match === undefined) {
							this.conn.send(JSON.stringify({
								event: 'setLike',
								payload: res.fromWhoName + ' like you',
								ava: res.fromWhoPic,
								user_id: this.state.curentUserId,
								target_id: parseInt(this.state.target, 10)
							}))
						} else if (res.removedMatch1 || res.removedMatch2) {
							this.conn.send(JSON.stringify({
								event: 'disLike',
								payload: res.fromWhoName + ' unlike you',
								ava: res.fromWhoPic,
								user_id: this.state.curentUserId,
								target_id: parseInt(this.state.target, 10)
							}))
						}
						else if (res.match !== undefined) {
							this.conn.send(JSON.stringify({
								event: 'match',
								payload: 'You got a match with ' + res.fromWhoName,
								ava: res.fromWhoPic,
								user_id: parseInt(res.match.partner1, 10),
								target_id: parseInt(res.match.partner2, 10)
							}))
						}
					})
				}
				else {
					iziToast.info({
						message: 'You need to set up a profile photo to be able do this action',
						position: 'topRight',
						progressBar: false
					})
				}
			});
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