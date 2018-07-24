import React, { Component } from 'react';
import history from "../history/history";
import { PostData } from '../main/components/PostData';

class FormResetPass extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
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
		if (this.state.email !== '')
		{
			PostData('auth/reset', this.state).then ((result) => {
				if (result === false) {
					this.setState({ errMsg: 'invalid email' });
					console.log(result);
				} else {
					localStorage.setItem('token', result.jwt);
					this.setState({loginStatuse: true});
					console.log(result);
					history.push('/');
				}
			});
		}
	}

	render() {
		const { errMsg } = this.state
		return(
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<div className="form-group position-relative">
						<label className="image-replace email" htmlFor="signin-email"><i className="far fa-envelope"></i></label>
						<input type="email" name="email" className="form-control dop-pad" id="signin-email" onChange={this.onChange} aria-describedby="emailHelp" placeholder="email" required></input>
					</div>
					<button type="submit" className="btn btn-primary btn-block btn-my-color">Submit</button>
						{ errMsg && ( <span className="alert alert-danger">{this.state.errMsg}</span>)}
				</fieldset>
			</form>

		);
	}

}

export default FormResetPass;
