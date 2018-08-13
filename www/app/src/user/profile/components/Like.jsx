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
		this.onClick = this.onClick.bind(this)
		console.log("state in like ", this.state)
	}
	
	onClick(){
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
			})
		}
	}	

	render(){
		return(
			<Tooltip placement="topLeft" title="Like profile">
				<Button type="primary" className="target-btn" onClick={this.onClick}>
					<Icon type="like-o" />
				</Button>
			</Tooltip>
		)
	}
}

export default Like;