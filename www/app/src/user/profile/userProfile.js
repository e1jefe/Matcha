import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import { PostData } from '../main/components/PostData'
// import Profile from './userProfile';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 'Ira',
			userId: '91',
			fullProfile: '',
			avatar: '',
			whoLikedMe: []
		}
		this.setAvatar = this.setAvatar.bind(this)
	}
	componentWillMount(){
		console.log("in profile", this.state.login)
	}
	componentDidMount(){
		console.log("in profile")
	}
	render(){
		return(<div>{this.state.login}in profile</div>)
	}
}

export default Profile;