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
// import Search from "./Search.js";
// import Profile from "../profile/Profile";

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			author: false,
			userLogin: '',
			userId: '',
			fullProfile: false,
			errMsg: ''
			// unreadMsg: []
		};
		// this.onMessage = this.onMessage.bind(this);
  //       this.conn = new WebSocket('ws:/\/localhost:8090')
  //       this.conn.onmessage = this.onMessage.bind(this)
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
			});
		}
	}

 //    onMessage(event){
 //    	const data = JSON.parse(event.data);
 //    	if (data.event === 'message' && data.user_id !== this.state.userId) {
 //            const newMsg = [{who: data.user_id, content: data.myVar}]
 //            const oldMsg = this.state.unreadMsg
 //            // console.log("old unread messagies: ", oldMsg)
 //            if (oldMsg !== undefined && oldMsg.who !== "") {
 //                this.setState({
 //                    unreadMsg: oldMsg.concat(newMsg)
 //                })
 //            } else {
 //                this.setState({
 //                    unreadMsg: new Array(newMsg)
 //                })
 //            }
 //        }
	// }

	render() {
        // console.log("in home before render ", this.state.notifications)

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
				<Header />
				<Router history={history}>
					<div>
						<Route path="/home/cabinet" render={()=><Cabinet login={this.state.userLogin} userId={this.state.userId}/>} />
						<Route exact path="/chat" render={()=><Chat />}/>
					</div>
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