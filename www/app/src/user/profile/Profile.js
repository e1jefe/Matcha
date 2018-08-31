import React, { Component } from 'react'
import './Userprofile.css'
import ProfileContent from './components/ProfileContent';

class Profile extends Component {

	render(){
		return(
			<div>
				<ProfileContent target={this.props.match}/>
			</div>
		)
	}
}

export default Profile;