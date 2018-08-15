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
				this.conn.send(JSON.stringify({
		            event: 'setLike',
		            payload: 'Like you',
		            who: user.userLogin,
		            user_id: this.state.curentUserId,
		            target_id: this.state.target
		        }))
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