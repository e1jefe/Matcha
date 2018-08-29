import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';

import './home.css';
import '../fonts/fonts.css';

import UnAuthorize from './UnAuthorize';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';
import Cabinet from '../cabinet/Cabinet';
import Chat from '../chat/chat';
import Profile from '../profile/Profile';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			author: false,
			userLogin: '',
			userId: '',
			fullProfile: false,
			errMsg: ''
		};
	}
	

	componentWillMount() {
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			if (user.userLogin !== '')
			{
				this.setState({
					author: true,
					userLogin: user.userLogin,
					userId: user.userId,
				}, ()=>{this.setState({author: true})});
			};
			//postdata to usercontroller to get is profile full, setstate fullProfile = true
			PostData('user/isFull', {userId: user.userId}).then ((result) => {
				if (result.error !== '' || result.error !== undefined) {
					this.setState({ errMsg: result.error });
				} else
					this.setState({ fullProfile: result });
				if (result === false) {
					history.push('/cabinet');
				} else {
					history.push('/search');
				}
			});
		}
	}

	render() {
		if (this.state.author === false)
		{
			return(
				<UnAuthorize />
			)
		}
		else 
		{
			return(
				<Router history={history}>
					<div>
						<Route path="/cabinet" render={()=><Cabinet login={this.state.userLogin} userId={this.state.userId}/>} />
						<Route path="/chat" render={(props) => (<Chat login={this.state.userLogin}/>)} />
		 				<Route path="/profile/:id" component={(props) => (<Profile />)} />
					</div>
				</Router>
			)
		}
	}
	
}

export default Home;