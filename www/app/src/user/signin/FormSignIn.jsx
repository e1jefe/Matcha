import React, { Component } from 'react';
import history from "../history/history";
import { PostData } from '../main/components/PostData';

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
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		if (this.state.login !== '' && this.state.pass !== '')
		{
			PostData('auth/signin', this.state).then ((result) => {
				if (result === false) {
					this.setState({ errMsg: 'invalid login or password' });
					console.log(result);
				} else {
					localStorage.setItem('token', result.jwt);
					this.setState({loginStatuse: true});
					console.log(result);
					history.push('/home');
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
				<button type="submit" className="btn btn-primary btn-block btn-my-color">Submit</button>
			</form>
		);
	}

}

export default FormSignIn;
