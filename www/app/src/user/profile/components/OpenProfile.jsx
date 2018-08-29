import React, { Component } from 'react'
import history from "../../history/history"
import { Tooltip, Button, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import jwtDecode from 'jwt-decode';

class OpenProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			fromWho: '',
			fromWhoPic: ''
		}
	}
	
	handleProfile(e){
		history.push('/profile/' + e.target.name)
	}

	render(){
		return(
			<Tooltip placement="topLeft" title="Review profile">
				<Button name={this.props.target} type="primary" className="my-card-btn-width" onClick={this.handleProfile}>
					<Icon type="info-circle-o" />
				</Button>
			</Tooltip>
		)
	}
}

export default OpenProfile;