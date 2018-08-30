import React, { Component } from 'react';
import history from '../history/history';
import { PostData } from '../main/components/PostData';
import jwtDecode from 'jwt-decode';
import './chat.css';
import ChatComponents from './ChatComponents';
import Header from '../main/components/headerComponents/Header.jsx';
import Footer from '../main/components/footerComponents/Footer';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasAva: false
		}
	}

	componentDidMount() {
		if (localStorage.hasOwnProperty('token')){
			const user = jwtDecode(localStorage.getItem('token'));
			PostData('user/hasAva', {userId: user.userId}).then((res) => {
				if (res === true){
					this.setState({
						hasAva: res
					})
				} else {
					history.push('/cabinet');
				}
			})
			
		}
	}

    render() {
        return(
            <div>
            	{this.state.hasAva && 
            		<ChatComponents login={this.props.login}/>
            	}
            </div>
        );
    }
}

export default Chat;