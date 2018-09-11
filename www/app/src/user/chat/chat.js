import React, { Component } from 'react';
import history from '../history/history';
import { PostData } from '../main/components/PostData';
import jwtDecode from 'jwt-decode';
import './chat.css';
import ChatComponents from './ChatComponents';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasAva: false
		}
	}

	сomponentWillUnmount () {
		console.log("before del from dom chat")
		this._mounted = false
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
					iziToast.info({
						title: 'Info',
						message: 'Set profile picture before chating with somebody',
						position: 'topCenter',
						timeout: 5000,
						progressBar: false
					}, history.push('/cabinet'))
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