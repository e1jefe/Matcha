import React, { Component } from 'react'
import ProfileContent from './ProfileContent';
import Header from '../main/components/headerComponents/Header.jsx'
import Footer from '../main/components/footerComponents/Footer'

class Profile extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		login: 'Ira',
	// 		userId: '91',
	// 		fullProfile: '',
	// 		avatar: '',
	// 		whoLikedMe: []
	// 	}
	// }
	// componentWillMount(){
	// 	console.log("in profile", this.state.login)
	// }
	// componentDidMount(){
	// 	console.log("in profile")
	// }
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