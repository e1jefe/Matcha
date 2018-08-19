import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import jwtDecode from 'jwt-decode';

import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

import './home.css';
import '../fonts/fonts.css';

import UnAuthorize from './UnAuthorize';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';
import Cabinet from '../cabinet/Cabinet';
import Chat from '../chat/chat';
import Search from "./Search.js";
import Profile from "../profile/Profile";

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			author: false,
			userLogin: '',
			userId: '',
			fullProfile: false,
			errMsg: '',
			notifications: localStorage.getItem('notification')
		};
		this.onMessage = this.onMessage.bind(this)
		this.updateIt = this.updateIt.bind(this)
	}
	

	componentWillMount() {
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			// console.log("user", user);
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
			});
			this.conn = new WebSocket('ws:/\/localhost:8090')
			this.conn.onmessage = this.onMessage.bind(this)
			let notifArray = localStorage.getItem('notification')
			this.setState({notifications: notifArray}, this.updateIt(notifArray))
		}
	}

	updateIt (notifArray) {
		this.setState({notifications: notifArray})
	}

	onMessage(event){
		console.log("on MSG")
		const data = JSON.parse(event.data);
		let notifArray = localStorage.getItem('notification')
		if (data.event === 'setLike' && data.user_id != this.state.userId) {
			// console.log("notification array ", notifArray)
			// console.log("ngot msg")

			if (notifArray == null)
				localStorage.setItem('notification', JSON.stringify(data))
			else if (notifArray.includes("setLike") === false || (notifArray.includes("setLike") && notifArray.includes('"user_id":' + data.user_id) === false))
				localStorage.setItem('notification', notifArray + JSON.stringify(data))
			iziToast.show({
				theme: 'dark',
				icon: 'icon-like',
				image: data.ava,
				imageWidth: 50,
				maxWidth: '500px',
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
		if (data.event === 'disLike' && data.user_id != this.state.userId) {
			if (notifArray == null)
				localStorage.setItem('notification', JSON.stringify(data))
			else if (notifArray.includes("disLike") === false || (notifArray.includes("disLike") && notifArray.includes('"user_id":' + data.user_id) === false))
				localStorage.setItem('notification', notifArray + JSON.stringify(data))
			iziToast.show({
				theme: 'light',
				iconUrl: 'http://i66.tinypic.com/241312b.png',
				image: data.ava,
				imageWidth: 50,
				maxWidth: '500px',
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
		if (data.event === 'match' && data.target_id == this.state.userId) {
			if (notifArray == null)
				localStorage.setItem('notification', JSON.stringify(data))
			else if (notifArray.includes("match") === false || (notifArray.includes('match') && notifArray.includes('"user_id":' + data.user_id) === false))
				localStorage.setItem('notification', notifArray + JSON.stringify(data))
			iziToast.show({
				theme: 'dark',
				icon: 'icon-match',
				image: data.ava,
				imageWidth: 50,
				maxWidth: '500px',
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
		if (data.event === 'view' && data.target_id == this.state.userId) {
			if (notifArray == null)
				localStorage.setItem('notification', JSON.stringify(data))
			else if (notifArray.includes("view") === false || (notifArray.includes("view") && notifArray.includes('"user_id":' + data.user_id) === false))
				localStorage.setItem('notification', notifArray + JSON.stringify(data))
			iziToast.info({
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
		// notifArray = localStorage.getItem('notification')
        // console.log("notifications befor send ", notifArray)

		// this.setState({notifications: notifArray}, (notifArray) => {
		// 	this.setState({notifications: notifArray})
		// })
	}

	render() {
        console.log("in home before render ", this.state.notifications)

		if (this.state.author === false)
		{
			return(
				<div>
					<Header/>
					<UnAuthorize />
					<Footer />
				</div>
			)
		}
		else 
		{
			return(
			<div>
				<Header notifications={this.state.notifications}/>
				<Router history={history}>
					<Route path="/home/cabinet" render={()=><Cabinet login={this.state.userLogin} userId={this.state.userId}/>} />				
				</Router>
				<Footer />				
			</div>
			)
		}
		// else
		// {
		// 	return(
		// 		<div>
		// 			<Router history={history}>
		// 				<div>
		// 					<Header notifications={this.state.notifications}/>
		// 					<Route path="/home/cabinet" component={(props) => (<Cabinet login={this.state.userLogin} userId={this.state.userId}/>)} />
		// 					<Route path="/home/chat" component={(props) => (<Chat login={this.state.userLogin}/>)} />
		// 					<Route path="/profile/:id" component={(props) => (<Profile />)} />
		// 					<Route path='/search' component={(props) => (<Search login={this.state.userLogin}/>)} />
		// 					<Footer />
		// 				</div>
		// 			</Router>
		// 		</div>
		// 	)
		// }
	}
	
}

export default Home;