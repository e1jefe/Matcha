import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import './cabinet.css'
import { Tabs, Tab } from 'react-bootstrap';
import $ from 'jquery';
import MainInfo from './components/MainInfo'
import AboutMe from './components/AboutMe'
import Location from './components/Location'
import MyPhoto from './components/MyPhoto'



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
			fullProfile: props.access,
			avatar: '',
			whoLikedMe: []
		}
	}

	render() {
		const whoLikedMe = this.state.whoLikedMe
		return(
			<div className="container bootstrap snippet marginTop">
				<div className="row">
					<div className="col-sm-4">
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
						<ul className="list-group">
							<li className="list-group-item text-muted">Resent events</li>
							<li className="list-group-item text-left"><strong>Anna viewed my profile</strong></li>
							<li className="list-group-item text-left"><strong>Anna liked my profile</strong></li>
							<li className="list-group-item text-left"><strong>Zorro send me a message</strong></li>
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
								<MyPhoto userId={this.state.userId}/>
							</Tab>

							<Tab eventKey={5} title="Viewes">
								<div className="form-group">
									<div className="col-xs-12">
										<h3>Users who looked through my profile</h3>
									</div>
								</div>

								<div className="row">
									<div className="col-xs-3">
										<div className="card">
											<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
											<div className="card-body">
												<h5 className="card-title margin-top">
													Card title
												</h5>
												<p className="card-text">
													Some quick example text to build on the card title and make up the bulk of the card's content.
												</p>
												<a href="#" className="btn btn-primary">
													view
												</a>
											</div>
										</div>
									</div> 
									<div className="col-xs-3">
										<div className="card">
											<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
											<div className="card-body">
												<h5 className="card-title margin-top">
													Card title
												</h5>
												<p className="card-text">
													Some quick example text to build on the card title and make up the bulk of the card's content.
												</p>
												<a href="#" className="btn btn-primary">
													view
												</a>
											</div>
										</div>
									</div> 
								</div>
							</Tab>
							<Tab eventKey={6} title="Likes">
								<div className="form-group">
									<div className="col-xs-12">
										<h3>Users who liked my profile</h3>
									</div>
								</div>
								<div className="row">
									{whoLikedMe !== undefined && whoLikedMe !== null ? 
										whoLikedMe.map((profile) => (												
											<div className="col-xs-3" key={profile.profilePic}>
												<div className="card">
													<img className="card-img-top" src={profile.profilePic} />
													<div className="card-body">
														<h5 className="card-title margin-top">{profile.firstName} {profile.lastName}</h5>
														<p className="card-text">{profile.about}</p>
														<a href="#" className="btn btn-primary">View full profile</a>
													</div>
												</div>
											</div>
										))
										:
										null
									}
								</div>
							</Tab>
							
							<Tab eventKey={7} title="Blocs">
								<div className="form-group">							
									<div className="col-xs-12">
										<h3>Profiles that I blocked</h3>
										<h6>Или вывести списком имена</h6>
									</div>
								</div>									
								<div className="row">
									<div className="col-xs-3">
										<div className="card">
											<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
											<div className="card-body">
												<h5 className="card-title margin-top">Card title</h5>
												<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
												<a href="#" className="btn btn-primary">view</a>
											</div>
										</div>
									</div> 
									<div className="col-xs-3">
										<div className="card">
											<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
											<div className="card-body">
												<h5 className="card-title margin-top">Card title</h5>
												<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
												<a href="#" className="btn btn-primary">view</a>
											</div>
										</div>
									</div> 
								</div>
							</Tab>

						</Tabs>
					</div>
				</div>
			</div>
		);
	}

}

export default Cabinet;