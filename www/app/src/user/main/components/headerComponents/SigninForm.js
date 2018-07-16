// import React from 'react';
import React, { Component } from 'react';
import './SigninForm.css';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SignIn extends Component {
	render() {
		return(
			<div>Hellow, pls register</div>
		);
	}

}

// class Input extends Component{
// 	render() {
// 		return (
// 			<div className="Input">
// 				<input 
// 					id={this.props.id}
// 					autoComplete="false"
// 					required
// 					type={this.props.type}
// 					placeholder={this.props.placeholder}
// 				/>	
// 				<label htmlFor={this.props.id}></label>
// 			</div>
// 		);
// 	}
// };

// class Modal extends Component{

// 	render() {
// 		return (
// 			<div className="Modal">
// 				<form 
// 					onSubmit={this.props.onSubmit}
// 					className="ModalForm">
// 					<Input
// 						id="name"
// 						type="text"
// 						placeholder="login" />
// 					<Input
// 						id="password"
// 						type="password"
// 						placeholder="password" />

// 					<button>
// 						Log in <i className="fa fa-fw fa-chevron-right"></i>
// 					</button>
// 					<p className="message">Not registered? <a href="http://localhost:8001/signin">Create your account</a></p>
// 					<p className="message"><a href="">Forgot password?</a></p>
// 					<p className="message"><a img src="/application/templates/img/fb+icon.png" href=""></a></p>
// 				</form>
// 			</div>
// 		);
// 	}
// };

// class SignIn extends Component{
	
// 	getInitialState() {
// 		return { mounted: false };
// 	}
	
// 	componentDidMount() {
// 		this.setState({ mounted: true });
// 	}
	
// 	handleSubmit: function(e) {
// 		this.setState({ mounted: false });
// 		e.preventDefault();
// 	}

// 	render() {
// 		var child;

// 		if(this.state.mounted) {
// 			child = (<Modal onSubmit={this.handleSubmit} />);
// 		}
		
// 		return(
// 			<div className="SignIn">
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

export default SignIn;