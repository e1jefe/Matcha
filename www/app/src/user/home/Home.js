import React, { Component } from 'react';
import './home.css';
import '../fonts/fonts.css';
import UnAuthorize from './UnAuthorize';
import MainPage from './MainPage';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';

class Home extends Component {

	constructor(props) {
        super(props);
        this.state = {author: false};
    }

	render() {
		if (this.state.author === false)
		{
			return(
				<div>
					<Header/>
					<UnAuthorize />
					<Footer />
				</div>
			);
		}
		else
		{
			return(
				<div>
					<Header/>
					<MainPage />
					<Footer />
				</div>
			);
		}
	}
	
}

export default Home;