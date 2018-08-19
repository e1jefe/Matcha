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
			target: props.target
		}
		this.handleProfile = this.handleProfile.bind(this)
		// console.log("state in like ", this.state)
	}
	
	handleProfile(e){
		// e.preventDefault()
		// console.log("I clicked on profile: ", e.target.name)
		this.conn.send(JSON.stringify({
			event: 'view',
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
				this.setState({
					curentUserId: user.userId,
					fromWho: user.userName + ' ' + user.userSurname,
					target: this.props.target
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