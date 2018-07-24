import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Signin.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import { Router, Route } from 'react-router-dom';
import history from "../history/history"
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';
import Content from './Content';


// class ToFill extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			login: '',
// 			pass: '',
// 			loginErrMsg: '',
// 			loginStatuse: false
// 		}
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		this.onChange = this.onChange.bind(this);
// 	}

// 	handleSubmit(event) {
// 		event.preventDefault();
// 		if (this.state.login !== '' && this.state.pass !== '')
// 		{
// 			PostData('auth/signin', this.state).then ((result) => {
// 				if (result === false) {
// 					this.setState({ loginErrMsg: 'invalid login or password' });
// 					console.log(result);
// 				} else {
// 					localStorage.setItem('token', result.jwt);
// 					this.setState({loginStatuse: true});
// 					console.log(result);
// 					history.push('/home');
// 				}
// 			});
// 		}
// 	}

// 	onChange(e) {
// 		this.setState({[e.target.name]: e.target.value});
// 		console.log(this.state);
// 	}

// 	render() {
// 		return (

// 				<form onSubmit={this.handleSubmit}>
// 					<h5 className="card-title text-center">Sign in</h5>
// 					<div className="form-group position-relative">
// 						<label className="image-replace login" htmlFor="signin-email"><i className="far fa-user"></i></label>
// 						<input type="text" className="form-control dop-pad" id="signin-email" name="login" onChange={this.onChange} aria-describedby="emailHelp" placeholder="Login"></input>
// 					</div>
// 					<div className="form-group position-relative">
// 						<label className="image-replace password" htmlFor="signin-pass"></label>
// 						<input type="password" className="form-control dop-pad" id="signin-pass" name="pass" onChange={this.onChange} placeholder="Password"></input>
// 					</div>
// 					<button type="submit" className="btn btn-primary btn-block btn-my-color">Submit</button>
// 					<div className="margin-top">
// 						<NavLink to="/signUp" className="badge badge-light pull-left">Register here</NavLink>
// 						<NavLink to="/reset" className="badge badge-light pull-right">I forgot password</NavLink>
// 					</div>
// 				</form>

// 		);
// 	}
// }

// class SignIn extends Component{
// 	constructor(props) {
// 	 super(props);
// 		 this.state = {
// 			mounted: false,
// 		 };
// 	 }
	
// 	componentDidMount() {
// 		this.setState({ mounted: true });
// 	}
	
// 	handleSubmit(e) {
// 		this.setState({ mounted: false });
// 		e.preventDefault();
// 	}

// 	render() {

// 		var child;

// 		if(this.state.mounted) {
// 			child = <ToFill />;
// 		}
		
// 		return(
// 			<div className="form-holder">
// 				<ReactCSSTransitionGroup
// 					transitionName="example"
// 					transitionEnterTimeout={500}
// 					transitionLeaveTimeout={300}>
// 						{child}
// 				</ReactCSSTransitionGroup>
// 			</div>
// 		);
// 	}
// };

export const SignIn = () => (
	<div>
		<Header />
		<Content />
		<Footer />
	</div>
)

export default SignIn;