import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import Home from './user/home/Home';
import SignIn from './user/signin/Signin.js';
import history from './user/history/history';
import Chat from './user/chat/chat.js'
import Search from "./user/home/Search.js";
import Profile from "./user/profile/Profile";
import Cabinet from "./user/cabinet/Cabinet";
import Header from './user/main/components/headerComponents/Header.jsx';
import Footer from './user/main/components/footerComponents/Footer';
import jwtDecode from 'jwt-decode';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authorize: false
		}
		this.conn = new WebSocket('ws://localhost:8090')
        this.conn.onmessage = this.onMessage.bind(this)
	}

	сomponentWillUnmount () {
        this._mounted = false
    }

	componentDidMount(){
        this._mounted = true;
        if (localStorage.hasOwnProperty('token')){
        	this.setState({
				authorize: true
        	})
        }
	}

	onMessage(event){
		if (this._mounted) {
			if (localStorage.hasOwnProperty('token')){
				const token = localStorage.getItem('token');
				const user = jwtDecode(token);
				const data = JSON.parse(event.data);
				if (data.event === 'login' && data.user_id === user.userId){
					this.setState({
						authorize: true
					})
				}
			} else {
				this.setState({
					authorize: false
				})
			}
		}
	}

	render(){
		return(
			<Router history={history}>
				<main>
					<Header authorize={this.state.authorize}/>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/home' component={Home}/>
						<Route path='/signin' component={SignIn}/>
						<Route path="/cabinet" component={Cabinet} />
						<Route path='/chat' component={Chat}/>
						<Route path='/search' component={Search}/>
						<Route path="/profile/:id" component={Profile} />
					</Switch>
					<Footer/>
				</main>
			</Router>
		)
	}
}

export default Main