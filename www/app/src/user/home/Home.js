import React, { Component } from 'react';
import './home.css';
import '../fonts/fonts.css';
import UnAuthorize from './UnAuthorize';
import MainPage from './MainPage';

class Home extends Component {

	constructor(props) {
        super(props);
        this.state = {author: false};
    }

	render() {
		if (this.state.author === false)
		{
			return(<UnAuthorize />);
		}
		else
		{
			return(<MainPage />);
		}
	}
	
}

export default Home;