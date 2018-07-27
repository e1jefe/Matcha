import React, { Component } from 'react';
import history from "../history/history";
import { PostData } from '../main/components/PostData';

class FormResetPass extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			pass: '',

			ePass: '',
			errMsg: '',
			resetStatuse: false
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
			this.setState({
				ePass: '',				
				errMsg: '',
				resetStatuse: false
			});
			PostData('auth/reset', this.state).then ((result) => {
				if (result.eEmail !== undefined) {
					this.setState({ errMsg: result.eEmail });
					console.log(result);
				} else if (result.ePass !== undefined || result.wrongEmail !== undefined){
					this.setState({
						ePass: result.ePass,				
						errMsg: result.wrongEmail
					});
				}
				else {
					this.setState({resetStatuse: true});
					console.log(result);
				}
			});			
		}
	}

	render() {
		const { errMsg } = this.state
		return(
			<form onSubmit={this.handleSubmit}>
				<fieldset>
				{ this.state.resetStatuse && ( <span className="alert alert-success">Check your email to confirm your new password</span>) }				
				{ this.state.errMsg !== '' && ( <span className="alert alert-danger">{this.state.errMsg}</span>) }				
					<div className="form-group position-relative">
						<label className="image-replace email" htmlFor="reset-email"><i className="far fa-envelope"></i></label>
						<input type="email" name="email" className="form-control dop-pad" id="reset-email" onChange={this.onChange} aria-describedby="emailHelp" placeholder="email" required></input>
					</div>
					<div className="form-group position-relative">
						<label className="image-replace password" htmlFor="reset-pass"></label>
						<input type="password" className="form-control dop-pad" id="reset-pass" name="pass" onChange={this.onChange} placeholder="Password"></input>
					</div>
						{this.state.ePass !== undefined && this.state.ePass !== '' && ( <span className="alert alert-danger">{this.state.ePass}</span>)}
					<button type="submit" className="btn btn-primary btn-block btn-my-color">Submit</button>
				</fieldset>
			</form>

		);
	}

}

export default FormResetPass;
