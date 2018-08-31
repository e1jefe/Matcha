import React, { Component } from 'react';
import history from "../history/history";
import { PostData } from '../main/components/PostData';
import jwtDecode from 'jwt-decode';
import FacebookLogin from 'react-facebook-login';
import { Button } from 'antd';

class FormSignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: '',
			pass: '',
			errMsg: '',
			loginStatuse: false
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.conn = new WebSocket('ws:/\/localhost:8090');
		this.conn.handleLogin = this.handleLogin.bind(this);
		this.facebookResponse = this.facebookResponse.bind(this)

	}

	facebookResponse(response){
		PostData('auth/signinFB', response).then ((result) => {
				if (result === false) {
					this.setState({ errMsg: 'invalid login or password' });
				} else {
					localStorage.setItem('token', result.jwt);
					this.setState({loginStatuse: true});
					this.handleLogin(result.id);
				}
			});
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
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
			PostData('auth/signin', this.state).then ((result) => {
				if (result === false) {
					this.setState({ errMsg: 'invalid login or password' });
				} else {
					localStorage.setItem('token', result.jwt);
					this.setState({loginStatuse: true});
					this.handleLogin(result.id);
				}
			});
		}
	}

	render() {
		 const { errMsg } = this.state
		return(
			<form onSubmit={this.handleSubmit}>
				<div>
					{ this.state.errMsg !== '' && ( <span className="alert alert-danger">{this.state.errMsg}</span>) }
				</div>
				<div className="form-group position-relative">
					<label className="image-replace login" htmlFor="signin-email"><i className="far fa-user"></i></label>
					<input type="text" className="form-control dop-pad" id="signin-email" name="login" onChange={this.onChange} aria-describedby="emailHelp" placeholder="Login"></input>
				</div>
				<div className="form-group position-relative">
					<label className="image-replace password" htmlFor="signin-pass"></label>
					<input type="password" className="form-control dop-pad" id="signin-pass" name="pass" onChange={this.onChange} placeholder="Password"></input>
				</div>
				<div className="form-group position-relative">
					<Button type="submit" className="ant-btn-block" onClick={this.handleSubmit}>Sign in</Button>
				</div>
				<div className="fbButton">
				<FacebookLogin
                    appId="435835890273066"
                    autoLoad={false}
                    fields="name,email,picture.type(large)"
                    callback={this.facebookResponse}
                    icon="fa-facebook"
                    textButton="Sign in with facebook"/>
                    </div>
			</form>
		);
	}

}

export default FormSignIn;
