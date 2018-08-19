import React, { Component } from 'react';
import Nav from './Nav';
import './header.css';

class Header extends Component {
	constructor(props) {
        super(props);
    }

	render(){
		return(
			<div>
				<Nav />
			</div>
		);
	}
}

export default Header;