import React, { Component } from 'react';
import FormSignIn from './FormSignIn';
import FormSignUp from './FormSignUp';
import FormResetPass from './FormResetPass';

class Content extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showSignIn: true,
			showSignUp: false,
			showResetPass: false,
			activeIn: false,
			activeUp: false,
			activeReset: false
		}
		this.clicShowSignIn = this.clicShowSignIn.bind(this);
		this.clicShowSignUp = this.clicShowSignUp.bind(this);
		this.clicShowResetPass = this.clicShowResetPass.bind(this);
	}

	clicShowSignIn() {
		const currentState = this.state.active;

		this.setState({
			showSignIn: true,
			showSignUp: false,
			showResetPass: false,
			activeIp: !currentState,
			activeUp: false,
			activeReset: false
		});
		// console.log("show sign in", !currentState);

	}

	clicShowSignUp() {
		const currentState = this.state.active;
		this.setState({
			showSignIn: false,
			showSignUp: true,
			showResetPass: false,
			activeUp: !currentState,
			activeReset: false,
			activeIp: false
		});
		// console.log("show sign up", currentState);

	}

	clicShowResetPass() {
		const currentState = this.state.active;

		this.setState({
			showSignIn: false,
			showSignUp: false,
			showResetPass: true,
			activeReset: !currentState,
			activeUp: false,
			activeIp: false
		});
		// console.log(this.state);
	}

	render() {
		return(
			<div className="sign-in__holder">
				<div className="flex-wrap">
					<ul className="nav nav-pills nav-push-down">
						<li className="nav-item">
							<a onClick={this.clicShowSignIn} className={"nav-link " + (this.state.activeIn ? 'active' : null)} >Sign in</a>
						</li>
						<li className="nav-item">
							<a onClick={this.clicShowSignUp} className={"nav-link " + (this.state.activeUp ? 'active': null)} >Sign up</a>
						</li>
						<li className="nav-item">
							<a onClick={this.clicShowResetPass} className={"nav-link " + (this.state.activeReset ? 'active': null)} >Reset</a>
						</li>
					</ul>
					<div>
						{ this.state.showSignIn !== false && <FormSignIn /> }
					</div>
					<div>
						{ this.state.showSignUp && <FormSignUp /> }
					</div>
					<div>
						{ this.state.showResetPass && <FormResetPass /> }
					</div>
				</div>
			</div>
		);
	}

}

export default Content;
