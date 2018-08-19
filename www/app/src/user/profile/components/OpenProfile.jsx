import React, { Component } from 'react'
import history from "../../history/history"
import { Tooltip, Button, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import jwtDecode from 'jwt-decode'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class OpenProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			fromWho: '',
			fromWhoPic: '',
			target: props.target
		}
		this.handleProfile = this.handleProfile.bind(this)
	}
	
	handleProfile(e){
		this.conn.send(JSON.stringify({
			event: 'view',
			ava: this.state.fromWhoPic,
			payload: this.state.fromWho + ' checked your profile',
			user_id: this.state.curentUserId,
			target_id: this.state.target
		}))
		history.push('/profile/' + e.target.name)
	}

	componentWillMount(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			if (user.userLogin !== '')
			{
				PostData('user/getAva', {uId: user.userId}).then((res) => {
					this.setState({
						curentUserId: user.userId,
						fromWho: user.userName + ' ' + user.userSurname,
						fromWhoPic: res.fromWhoPic,
						target: this.props.target
					})
				})
			}
		}
		this.conn = new WebSocket('ws:/\/localhost:8090')
		this.conn.handleProfile = this.handleProfile.bind(this)
	}

	render(){
		return(
			<Tooltip placement="topLeft" title="Review profile">
				<Button name={this.state.target} type="primary" className="my-card-btn-width" onClick={this.handleProfile}>
					<Icon type="info-circle-o" />
				</Button>
			</Tooltip>
		)
	}
}

export default OpenProfile;