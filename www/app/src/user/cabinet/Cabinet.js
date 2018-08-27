import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { PostData } from '../main/components/PostData';
import jwtDecode from 'jwt-decode';
import './cabinet.css';
import { Tabs, Tab } from 'react-bootstrap';
import { Avatar } from 'antd';
import $ from 'jquery';
import Header from '../main/components/headerComponents/Header';
import Footer from '../main/components/footerComponents/Footer';
import MainInfo from './components/MainInfo';
import AboutMe from './components/AboutMe';
import Location from './components/Location';
import MyPhoto from './components/MyPhoto';
import Views from './components/Views';
import LikedMe from './components/LikedMe';
import MyBlocks from './components/MyBlocks';

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
		const token = localStorage.getItem('token');
		const user = jwtDecode(token);
		this.state = {
			login: user.userLogin,
			userId: user.userId,
			fullProfile: '',
			avatar: '',
			iView: ''
		}
		this.setAvatar = this.setAvatar.bind(this)
	}
	
	componentWillMount(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			if (user.userLogin !== '')
			{
				PostData('user/getAllInfo', {userId: user.userId}).then((res) => {
					this.setState({
						avatar: res.userData.profilePic,
						fullProfile: Boolean(res.userData.isFull),
						iView: res.recentViews
					})
					console.log("recent view ", res.recentViews)
				})
			}
		}
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
		console.log("view cabinet", this.state.iView)
		const views = this.state.iView;
		return(
			<div>
				<Header />
				<div className="container bootstrap snippet marginTop cabinet-height">
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
								{views !== undefined && views.length !== 0 ?
									views.map((person) => 
										<li className="list-group-item text-left" key={person.id}>
											<NavLink to={"/profile/" + person.id}>
												<Avatar shape="square" src={person.ava} />
												<p className="whoIViewName">
													<b>{person.name}'s</b> profile
												</p>
											</NavLink>
										</li>)
								 : null}
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
				<Footer />
			</div>
		);
	}

}

export default Cabinet;