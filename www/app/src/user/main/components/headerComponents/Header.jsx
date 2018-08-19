import React, { Component } from 'react';
import Nav from './Nav';
import './header.css';

class Header extends Component {
	constructor(props) {
        super(props);
        console.log("in header ", this.props.notifications)
    }

	render(){
		return(
			<div>
				<Nav notifications={this.props.notifications}/>
			</div>
		);
	}
}

export default Header;