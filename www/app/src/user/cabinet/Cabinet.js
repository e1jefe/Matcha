import React, { Component } from 'react';
import { PostData } from '../main/components/PostData';
import './cabinet.css'
import { Tabs, Tab } from 'react-bootstrap';
import $ from 'jquery';
import MainInfo from './components/MainInfo'
import AboutMe from './components/AboutMe'
import Location from './components/Location'
import MyPhoto from './components/MyPhoto'
import Views from './components/Views'
import LikedMe from './components/LikedMe'
import MyBlocks from './components/MyBlocks'

	$(document).on('click', '.browse', function(){
		var file = $(this).parent().parent().parent().find('.file');
		file.trigger('click');
	});
	$(document).on('change', '.file', function(event){
		$(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
	});

class Cabinet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: props.login,
			userId: props.userId,
			fullProfile: '',
			avatar: ''
		}
		this.setAvatar = this.setAvatar.bind(this)
	}
	
	componentWillMount(){
		PostData('user/getAllInfo', {userId: this.state.userId}).then((res) => {
			this.setState({
				avatar: res.userData.profilePic,
				fullProfile: Boolean(res.userData.isFull)
			})
		})
	}

	setAvatar(event){
		event.preventDefault()
		let pic = event.target.getAttribute('target')
		PostData('user/setAvatar', {ava: pic, userId: this.state.userId}).then((result) => {
			this.setState({
				avatar: result.src
			})
		})
	}

	render() {
		return(
			<div className="container bootstrap snippet marginTop">
				<div className="row">
					<div className="col-sm-3 text-center">
						<h1>{this.state.login}</h1>
					</div>
					<div className="col-sm-8">
						{this.state.fullProfile === false ? 
						<h2 className="pull-right text-danger">
							Please fill your profile as much as possible to allow us match you with the most appropriate users
						</h2>
						: null}
					</div>
				</div>

				<div className="row">
					<div className="col-sm-3">
						<div className="text-center">
							<div className="image-cropper">
								<img src={this.state.avatar === '' || this.state.avatar === null ? "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" : this.state.avatar} className="profile-pic" alt="avatar" />
							</div>
						</div>
						<br />
						<ul className="list-group my-height">
							<li className="list-group-item text-muted">Resently I view:</li>
							<li className="list-group-item text-left"><strong>Anna's </strong></li>
							<li className="list-group-item text-left"><strong>Anna </strong></li>
							<li className="list-group-item text-left"><strong>Zorro </strong></li>
						</ul>
					</div>
					<div className="col-sm-9">
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
							<Tab eventKey={1} title="Personal info">
								<MainInfo userId={this.state.userId}/>
							</Tab>

							<Tab eventKey={2} title="About me">
								<AboutMe userId={this.state.userId}/>
							</Tab>

							<Tab eventKey={3} title="My location">
								<Location userId={this.state.userId}/>
							</Tab>

							<Tab eventKey={4} title="Photos">
								<MyPhoto userId={this.state.userId} setAvatar={this.setAvatar}/>
							</Tab>

							<Tab eventKey={5} title="Views">
								<Views userId={this.state.userId} />
							</Tab>
							<Tab eventKey={6} title="Likes">
								<LikedMe userId={this.state.userId} />
							</Tab>
							
							<Tab eventKey={7} title="Blocs">
								<MyBlocks userId={this.state.userId} />
							</Tab>

						</Tabs>
					</div>
				</div>
			</div>
		);
	}

}

export default Cabinet;