import React, { Component } from 'react'
import './userProfile.css'
import ProfileContent from './components/ProfileContent';
import Header from '../main/components/headerComponents/Header.jsx'
import Footer from '../main/components/footerComponents/Footer'

class Profile extends Component {

	render(){
		return(<div>
				<Header/>
				<ProfileContent target={this.props.match}/>
				<Footer />
			</div>
		)
	}
}

export default Profile;