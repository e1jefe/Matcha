import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import { Button } from 'antd';
import FacebookLogin from 'react-facebook-login';
import history from "../history/history";

class FormSignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: '',
			pass: '',
			cpass: '',
			fname: '',
			lname: '',
			email: '',
			errMsg: '',
	
			eLogin: '',
			ePass: '',
			eCPass: '',
			eFname: '',
			eLname: '',
			eEmail: '',

			regStatuse: false
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.conn = new WebSocket('ws://localhost:8090');
		this.conn.handleLogin = this.handleLogin.bind(this);
		this.facebookResponse = this.facebookResponse.bind(this)
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	facebookResponse(response){
		response.event = 'registration';
		PostData('auth/signinFB', response).then ((result) => {
				if (result === false) {
					this.setState({ errMsg: 'Something went wrong' });
				} else if (result.err !== undefined) {
					this.setState({ errMsg: result.err });
				} else {
					localStorage.setItem('token', result.jwt);
					this.setState({regStatuse: true});
					this.handleLogin(result.id);
				}
			});
	}

	handleLogin(id){
		this.conn.send(JSON.stringify({
						event: 'login',
						payload: '',
						user_id: id
					}));
		history.push('/home');
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.login !== '' && this.state.pass !== '')
		{
			this.setState({
				errMsg: '',
				eLogin: '',
				ePass: '',
				eCPass: '',
				eFname: '',
				eLname: '',
				eEmail: '',
				regStatuse: false
			});
			PostData('auth/signup', this.state).then ((result) => {			
				if (result.fromDbErr !== undefined) {
					this.setState({ errMsg: result.fromDbErr });
				} else if (result !== true){
					this.setState({
						eLogin: result.eLogin,
						ePass: result.ePass,
						eCPass: result.eCPass,
						eFname: result.eFname,
						eLname: result.eLname,
						eEmail: result.eEmail,
					});
				}
				else {
					this.setState({regStatuse: true});
				}
			});
		}
	}

	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				{ this.state.errMsg !== '' && ( <span className="alert alert-danger">{this.state.errMsg}</span>) }
				{ this.state.regStatuse && ( <span className="alert alert-success">Registration successful, check your email</span>) }					
				<div className="form-group position-relative">
					<label className="image-replace login" htmlFor="signin-email"><i className="far fa-user"></i></label>
					<input type="text" className="form-control dop-pad" id="signup-fname" name="fname" onChange={this.onChange} placeholder="First name" required></input>
				</div>
					{this.state.eFname !== undefined && this.state.eFname !== '' && ( <span className="alert alert-danger">{this.state.eFname}</span>)}

				<div className="form-group position-relative">
					<label className="image-replace login" htmlFor="signin-email"><i className="far fa-user"></i></label>
					<input type="text" className="form-control dop-pad" id="signup-lname" name="lname" onChange={this.onChange} placeholder="Last name" required></input>
				</div>
					{this.state.eLname !== undefined && this.state.eLname !== '' && ( <span className="alert alert-danger">{this.state.eLname}</span>)}

				<div className="form-group position-relative">
					<label className="image-replace email" htmlFor="signup-email"><i className="far fa-envelope"></i></label>
					<input type="email" name="email" className="form-control dop-pad" id="signup-email" onChange={this.onChange} aria-describedby="emailHelp" placeholder="email" required></input>
				</div>
					{this.state.eEmail !== undefined && this.state.eEmail !== '' && ( <span className="alert alert-danger">{this.state.eEmail}</span>)}						

				<div className="form-group position-relative">
					<label className="image-replace login" htmlFor="signup-login"><i className="far fa-user"></i></label>
					<input type="text" className="form-control dop-pad" id="signup-login" name="login" onChange={this.onChange} placeholder="Login"></input>
				</div>
					{this.state.eLogin !== undefined && this.state.eLogin !== '' && ( <span className="alert alert-danger">{this.state.eLogin}</span>)}											

				<div className="form-group position-relative">
					<label className="image-replace password" htmlFor="signup-pass"></label>
					<input type="password" className="form-control dop-pad" id="signup-pass" name="pass" onChange={this.onChange} placeholder="Password"></input>
				</div>
					{this.state.ePass !== undefined && this.state.ePass !== '' && ( <span className="alert alert-danger">{this.state.ePass}</span>)}																	

				<div className="form-group position-relative">
					<label className="image-replace password" htmlFor="signup-pass2"></label>
					<input type="password" className="form-control dop-pad" id="signup-pass2" name="cpass" onChange={this.onChange} placeholder="Confirm password"></input>
				</div>
					{this.state.eCPass !== undefined && this.state.eCPass !== '' && ( <span className="alert alert-danger">{this.state.eCPass}</span>)}
				<div className="form-group position-relative">
					<Button type="submit" className="my-btn-block" onClick={this.handleSubmit}>Sign up</Button>
				</div>
				<div className="fbButton">
					<FacebookLogin
	                    appId="435835890273066"
	                    autoLoad={false}
	                    fields="name,email,picture.type(large)"
	                    callback={this.facebookResponse}
	                    icon="fa-facebook"
	                    textButton="Sign up with facebook"/>
				</div>
			</form>
		);
	}

}

export default FormSignUp;
