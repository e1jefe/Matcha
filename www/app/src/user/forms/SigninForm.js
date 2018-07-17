// import React from 'react';
import React, { Component } from 'react';
import './SigninForm.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ToFill extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: ''
		}
		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);

	}

	login() {
console.log("tut");
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
		console.log(this.state);
	}

	render() {
		return (
			<div className="flex-wrap">
			    <fieldset>
				<form onSubmit={this.props.onSubmit}>
			            <input  type="radio" name="rg" id="sign-in" defaultChecked/>
			            <input  type="radio" name="rg" id="sign-up" />
			            <input  type="radio" name="rg" id="reset" />        

			            <label htmlFor="sign-in">Sign in</label>
			            <label htmlFor="sign-up">Sign up</label>
			            <label htmlFor="reset">Reset</label>  
			            <input className="sign-up" type="name" placeholder ="First Name" pattern="[a-zA-Z]{1-20}" required/>
			            <input className="sign-up" type="name" placeholder ="Last Name" pattern="[a-zA-Z]{1-20}" required/>
			            <input className="sign-up sign-in" type="name" name="login" onChange={this.onChange} placeholder ="Login" required/>

			            <input className="sign-up reset" type="email" placeholder="Email" required/>
			            <input className="sign-up sign-in" type="password" placeholder ="Password" required/>
			            <input className="sign-up" type="password" name="password" onChange={this.onChange} placeholder ="Repeat Password" required/>
			            <button onClick={this.login}>Submit</button>
			        </form>
			        </fieldset>
			</div>
		);
	}
}

class SignIn extends Component{
	constructor(props) {
     super(props);
         this.state = {
             mounted: false,
         };
     }
	
	componentDidMount() {
		this.setState({ mounted: true });
	}
	
	handleSubmit(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	}

	render() {
		console.log(this.state);
		console.log(this.props);

		var child;

		if(this.state.mounted) {
			child = <ToFill />;
		}
		
		return(
			<div className="form-holder">
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
};

export default SignIn;