// import React from 'react';
import React, { Component } from 'react';
import './SigninForm.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class ToFill extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			cpassword: '',
			fname: '',
			lname: '',
			email: ''
		}
		this.action = this.action.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	action(event) {
		event.preventDefault();
		if (this.state.fname === '' && this.state.login !== '')
		{
			const user = {
				login: this.state.login,
				pass: this.state.password
			};
			axios.post(`http://localhost:8001/login`, { user })
		      .then(res => {
		        if (res)
		        {
		        	// if (res.data.user.hasOwnProperty('check') === false)
		        		console.log(res);
                    // console.log(res.data.Array(1).login);
		        	localStorage.setItem('token', res.data.user);
		        }
		    })
		}
		else if (this.state.login !== '' && this.state.fname !== '')
		{
			const user = {
				login: this.state.login,
				pass: this.state.password,
				cpass: this.state.cpassword,
				fname: this.state.fname,
				lname: this.state.lname,
				email: this.state.email
			};
			axios.post(`http://localhost:8001/sign-up`, { user })
		      .then(res => {
		        console.log(res);
		    })
		}
		else
		{
			const user = {
				email: this.state.email
			};
			axios.post(`http://localhost:8001/resetPass`, { user })
		      .then(res => {
		        console.log(res);
		    })
		}	
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
			            <input className="sign-up" type="name" name="fname" onChange={this.onChange} placeholder ="First Name" pattern="[a-zA-Z]{1-20}" required/>
			            <input className="sign-up" type="name" name="lname" onChange={this.onChange} placeholder ="Last Name" pattern="[a-zA-Z]{1-20}" required/>
			            <input className="sign-up sign-in" type="name" name="login" onChange={this.onChange} placeholder ="Login" required/>

			            <input className="sign-up reset" type="email" name="email" onChange={this.onChange} placeholder="Email" required/>
			            <input className="sign-up sign-in" type="password" name="password" onChange={this.onChange} placeholder ="Password" required/>
			            <input className="sign-up" type="password" name="cpassword" onChange={this.onChange} placeholder ="Repeat Password" required/>
			            <button onClick={this.action}>Submit</button>
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