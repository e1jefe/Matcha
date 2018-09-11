import React, { Component } from 'react';
import Nav from './Nav';
import './header.css';

class Header extends Component {

	render(){
		return(
			<div>
				<Nav authorize={this.props.authorize}/>
			</div>
		);
	}
}

export default Header;