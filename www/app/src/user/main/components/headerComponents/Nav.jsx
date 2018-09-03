import React, { Component } from 'react';
import './header.css';
import '../../../fonts/fonts.css';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import Badge from 'antd/lib/badge';
import 'antd/dist/antd.css';
import jwtDecode from 'jwt-decode';
import history from "../../../history/history";
import { PostData } from '../PostData';
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class ForUnauthor extends Component{
	render() {
		return (
			<li className="item">
				<NavLink to="/signin" title="log in">
					<img className="userImage" src="http://i63.tinypic.com/259vjpk.png" alt="login"/>
				</NavLink>
			</li>
		)
	}
}

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: false,
			userLogin: '',
			userId: '',
			notifications: '',
			unreadMsg: [],
			authorize: props.authorize
		};
		this.handleLogout = this.handleLogout.bind(this);
		this.handleNotif = this.handleNotif.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.conn = new WebSocket('ws:/\/localhost:8090')
		this.conn.onmessage = this.onMessage.bind(this)
		this.clearUnread = this.clearUnread.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if (prevState.authorize !== nextProps.authorize) {
			return {authorize: nextProps.authorize}
		}
		return null
	}

	сomponentWillUnmount () {
		this._mounted = false
	}

	clearUnread(){
		this.setState({ unreadMsg: [] });
	}

	handleLogout() {
		localStorage.removeItem('token');
		this.setState({author: false});
		PostData('auth/logOut', {uId: this.state.userId}).then ((result) => {
			if (result === true) {
				this.conn.send(JSON.stringify({
						event: 'logout',
						payload: '',
						user_id: this.state.userId
					}))
			}
		})
	}

	handleNotif() {
		setTimeout(()=> {
			this.setState(()=> ({ notifications: null }))
		}, 5000);
		localStorage.removeItem('notification');
	}

	onMessage(event){
		if (this._mounted && localStorage.hasOwnProperty('token')){
			let token = localStorage.getItem('token');
			const user = jwtDecode(token);
			const data = JSON.parse(event.data);
			let notifArray = localStorage.getItem('notification')
			if (data.event === 'message' && data.target_id === user.userId && data.user_id !== user.userId) {
				if (window.location.href.includes('chat') === false){
					const newMsg = [{who: data.user_id, content: data.myVar}]
					const oldMsg = this.state.unreadMsg
					if (oldMsg !== undefined && oldMsg.who !== "") {
						this.setState({
							unreadMsg: oldMsg.concat(newMsg)
						})
					} else {
						this.setState({
							unreadMsg: new Array(newMsg)
						})
					}
				}
				if (window.location.href.includes('chat') === false){
					iziToast.show({
						theme: 'dark',
						icon: 'icon-msg',
						image: data.ava,
						imageWidth: 50,
						maxWidth: '500px',
						message: data.payload,
						position: 'topRight',
						progressBar: false
					})
				}
			}
			if (data.event === 'setLike' && data.target_id === user.userId && data.user_id !== user.userId) {
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
			if (data.event === 'disLike' && data.target_id === user.userId && data.user_id !== user.userId) {
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
			if (data.event === 'match' && (data.target_id === user.userId || data.user_id === user.userId)) {
				if (notifArray === null) {
					if (data.user_id !== user.userId) {
						localStorage.setItem('notification', JSON.stringify(data));	
					}
				} else if (notifArray.includes("match") === false || (notifArray.includes('match') && notifArray.includes('"user_id":' + data.user_id) === false)) {
					if (data.user_id !== user.userId) {	
						localStorage.setItem('notification', notifArray + JSON.stringify(data))
					}
				}
				if (data.target_id === user.userId) {
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
				} else {
					iziToast.show({
						theme: 'dark',
						icon: 'icon-match',
						maxWidth: '500px',
						message: 'You got a match just now',
						position: 'topRight',
						progressBar: false
					})
				}
			}
			if (data.event === 'view' && data.target_id === user.userId && data.user_id !== user.userId) {
				if (notifArray === null)
					localStorage.setItem('notification', JSON.stringify(data))
				else if (notifArray.includes("view") === false || (notifArray.includes("view") && notifArray.includes('"user_id":' + data.user_id) === false))
					localStorage.setItem('notification', notifArray + JSON.stringify(data))
				iziToast.info({
					message: data.payload,
					position: 'topRight',
					progressBar: false
				})
			}
			notifArray = localStorage.getItem('notification')
			if (notifArray != null) {
				if (notifArray.includes('}{')) {
					notifArray = notifArray.split('}{');
					for (let i = 0; i < notifArray.length; i++) {
						if (i === 0)
							notifArray[i] = notifArray[i] + '}'
						else if (i === notifArray.length - 1)
							notifArray[i] = '{' + notifArray[i]
						else
							notifArray[i] = '{' + notifArray[i] + '}'
						notifArray[i] = JSON.parse(notifArray[i])
					}
				}
				else
					notifArray = new Array(JSON.parse(notifArray));
				this.setState({notifications: notifArray})
			}
		}
	}

	componentDidMount() {
		this._mounted = true;
		if (localStorage.hasOwnProperty('token')){
			let token = localStorage.getItem('token');
			let notifArray = localStorage.getItem('notification')
				console.log("notifications:");

			if (notifArray !== null)
			{
				if (notifArray.includes('}{')) {
					notifArray = notifArray.split('}{');
					for (let i = 0; i < notifArray.length; i++) {
						if (i === 0)
							notifArray[i] = notifArray[i] + '}'
						else if (i === notifArray.length - 1)
							notifArray[i] = '{' + notifArray[i]
						else
							notifArray[i] = '{' + notifArray[i] + '}'
						notifArray[i] = JSON.parse(notifArray[i])
					}
				}
				else
					notifArray = new Array(JSON.parse(notifArray));
			}
			if (token !== undefined && token !== null)
			{
				let user = jwtDecode(token);
				if (user.user_login !== '')
				{
					PostData('user/isFull', {userId: user.userId}).then ((result) => {
						if (result.error !== '' || result.error !== undefined) {
							this.setState({ errMsg: result.error });
						}
						this.setState({ 
							author: true,
							userLogin: user.login,
							userId: user.userId,
							notifications: notifArray,
							fullProfile: result 
						});
					});
				}
			}
		}
	}

	render() {
		const notifications = this.state.notifications
		if (this.state.authorize === false
		) {
			return(
				<nav className="menu">
					<ul>
						<li className="item">                            
							<NavLink to="/home" className="logo">
								Matcha
							</NavLink>
						</li>
						<div className="menu-right no-autho">
							<ForUnauthor/>
						</div>
						<div className="clearfix"></div>
					</ul>
				</nav>
			)
		}
		else {
			const menu = (
				<Menu>
					{Array.isArray(notifications) && notifications !== undefined && notifications !== null ?
						notifications.map((notif, i) => 
							<Menu.Item key={i}>
								<NavLink to={"profile/" + notif.user_id}>
									{notif.ava !== undefined ?
										<img className="notifImg" src={notif.ava} alt="Who done this" />
										: null
									}
									<p className="notifTxt">{notif.payload}</p>
								</NavLink>
							</Menu.Item>
						)
						: 
						<Menu.Item key="0">
							<p id="notifTxt-null">No unread notifications</p>
						</Menu.Item>
					}
				</Menu>
			)
			
			return(
				<nav className="menu" role="navigation">
					<ul>
						<li className="item">                            
							<NavLink to={this.state.author === true ? (this.state.fullProfile === true ? "/search" : "/cabinet") : "/home"} className="logo">
								Matcha
							</NavLink>
						</li>
						<div className="menu-right" id="menuToggle">
							<input type="checkbox" />
							<span></span>
							<span></span>
							<span></span>
							<ul id="menu">
								<li className="item">
									<NavLink to="/cabinet">
										<img className="userImage" src="http://i64.tinypic.com/2nl4p5v.png" alt="My Profile"/>
									</NavLink>
								</li>
								<li className="item">
									<NavLink to="/chat" unread={this.state.unreadMsg} test="test" >
										<Badge count={this.state.unreadMsg !== null && this.state.unreadMsg.length !== 0 ? this.state.unreadMsg.length : 0} >
											<button className="unread-msg-btn" onClick={this.clearUnread}>
												<img className="shopaImage" src="http://i66.tinypic.com/xnw035.png" alt="messagies"/>
											</button>
										</Badge>
									</NavLink>
								</li>
								<li className="item">
								<Dropdown overlay={menu} trigger={['click']} onClick={this.handleNotif} >
									<a className="ant-dropdown-link" href="_">
										<Badge count={this.state.notifications !== null && this.state.notifications.length !== 0 ? this.state.notifications.length : 0} >
											<img className="notificationImage" src="http://i66.tinypic.com/qod01l.png" alt="notifications"/>
										</Badge>
									</a>
								</Dropdown>
									
								</li>
								<li className="item">
									<NavLink to="" onClick={this.handleLogout.bind(this)}>
										<img className="notificationImage" src="http://i68.tinypic.com/2ly5q36.png" alt="logout"/>
									</NavLink>
								</li>
							</ul>
						</div>
					</ul>
				</nav>                            
			)
		}
	}
}

export default Nav;