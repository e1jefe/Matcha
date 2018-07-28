import React, { Component } from 'react';
// import jwtDecode from 'jwt-decode';
// import { PostData } from '../main/components/PostData';
// import { Router, Route } from 'react-router-dom';
// import history from "../history/history";
import './cabinet.css'

class Cabinet extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: props.login,
			userId: props.userId,
			fullProfile: props.access,
			fName: '',
			lname: '',
			email: '',
			age: '',
			sex: '',
			sexPref: '',
			bio: '',
			fameRate: '',
			tags: '',
			pics: '',
			avatar: ''
		};
	}

	componentWillMount() {
				// console.log(props);
		console.log(this.state);
	// 	PostData('user/getAllInfo', this.state.userId).then ((result) => {
	// 		console.log(result);

	// 		// if (result.error !== '' || result.error !== undefined) {
	// 		// 	this.setState({ errMsg: result.error });
	// 		// 	console.log(result);
	// 		// 	console.log('cirently in state', this.state);
	// 		// } else if (result === true) {
	// 		// 	this.setState({ fullProfile: true });					
	// 		// }
	// 	});
	}

	render() {
		return(
			<div className="container bootstrap snippet">
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
								<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="profile-pic" alt="avatar" />
							</div>
							<h6>
								Upload a different photo...
							</h6>
							<input type="file" className="text-center center-block file-upload" />
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
						<ul className="nav nav-tabs">
							<li className="active"><a data-toggle="tab" href="#info">Personal info</a></li>
							<li><a data-toggle="tab" href="#about">About me</a></li>
							<li><a data-toggle="tab" href="#location">My location</a></li>
							<li><a data-toggle="tab" href="#photo">Photos</a></li>
							<li><a data-toggle="tab" href="#looked">Views</a></li>                
							<li><a data-toggle="tab" href="#likes">Likes</a></li>
							<li><a data-toggle="tab" href="#blocks">Blocked users</a></li>
						</ul>
						<div className="tab-content">

							<div className="tab-pane active" id="info">
								<hr />
								<form className="form" action="##" method="post" id="registrationForm">
									<div className="form-group">
										<div className="col-xs-6">
											<label htmlFor="first_name">
												<h4>
													First name
												</h4>
											</label>
											<input type="text" className="form-control" name="first_name" id="first_name" value="TipaMoeImyaIzBazy" title="enter your first name if any." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6">
											<label htmlFor="last_name">
												<h4>
													Last name
												</h4>
											</label>
											<input type="text" className="form-control" name="last_name" id="last_name" value="TipaFamiliya" title="enter your last name if any." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6">
											<label htmlFor="login">
												<h4>
													Login
												</h4>
											</label>
											<input type="text" className="form-control" name="login" id="login" value="MyPerfectLogin" title="enter your new login" />
										</div>
									</div>
						  			<div className="form-group">
							  			<div className="col-xs-6">
											<label htmlFor="password">
												<h4>
													Password
												</h4>
											</label>
											<input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password." />
										</div>
									</div>
									<div className="form-group">          
										<div className="col-xs-6">
											<label htmlFor="email">
												<h4>
													Email
												</h4>
											</label>
											<input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6">
											<label htmlFor="dob">
												<h4>
													Date of Birth
												</h4>
											</label>
											<input type="date" className="form-control" id="dob" placeholder="Date of Birth" />
										</div> 
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<h4>Choose your sex</h4>
											<label className="radio-inline">
												<input type="radio" name="sex" id="inlineCheckbox1" value="male" />
													Male
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex" id="inlineCheckbox2" value="female" />
													Female
											</label>
										</div> 
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<h4>
												Choose your sexual preferences
											</h4>
											<label className="radio-inline">
												<input type="radio" name="sex2" id="inlineCheckbox2" value="bi" />
													Bisexual
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex2" id="inlineCheckbox2" value="opposite" />
													Heterosexual
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex2" id="inlineCheckbox2" value="homo" />
													Homosexual
											</label>
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<br />								
											<button className="btn btn-lg pull-right" type="reset">
												<i className="glyphicon glyphicon-repeat"></i>
												 Reset
											</button>
											<button className="btn btn-lg btn-success pull-right" type="submit">
												<i className="glyphicon glyphicon-ok-sign"></i>
												 Save
											</button>
										</div>
									</div>
								</form>
							</div>

							<div className="tab-pane" id="about">
								<hr />
									<form className="form" action="##" method="post" id="registrationForm">
										<div className="form-group">
											<div className="col-xs-12">
												<label htmlFor="tags">
													<h4>
														My interests
													</h4>
												</label>
												<input type="text" className="form-control" name="tags" id="tags" placeholder="for e.g. muzic photo" title="enter your interests as separated one space words" />
											</div>
										</div>
										<div className="form-group">                          
											<div className="col-xs-12">
												<label htmlFor="bio">
													<h4>
														Some words about me
													</h4>
												</label>
												<textarea className="form-control" name="bio" id="bio" placeholder="some facts about you or short your lifestory" title="some facts about you or short your lifestory" maxlength="256" rows="5"></textarea>
											</div>
										</div>
										<div className="form-group">
											<div className="col-xs-12">
												<br />
												<button className="btn btn-lg btn-success pull-right" type="submit">
													<i className="glyphicon glyphicon-ok-sign"></i>
													 Save
												</button>
											</div>
										</div>
									</form>
							</div>

							<div className="tab-pane" id="location">
								<hr />
								<form className="form" action="##" method="post" id="location2">
									<div className="form-group">
										<div className="col-xs-12">
											<label htmlFor="location">
												<h4>
													Location
												</h4>
											</label>
											<input type="text" className="form-control" id="location" placeholder="somewhere" title="enter a location" />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<h4>
												Гдето здесь должна быть красивая карта чтобы выбрать пин где я
											</h4>
										</div>  
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<br />
											<button className="btn btn-lg btn-success pull-right" type="submit">
												<i className="glyphicon glyphicon-ok-sign"></i>
												 Save
											</button>
										</div>
					  				</div>
								</form>
							</div>

							<div className="tab-pane" id="photo">
				  				<hr />
								<form className="form" action="##" method="post" id="registrationForm">
									<h4>
										You can upload up to 5 photos
									</h4>
									<div className="row">
										<div className="col-lg-12">
											<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="..." className="img-thumbnail" />
											<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="..." className="img-thumbnail" />
										</div>
									</div>					
									<div className="form-group">
										<label htmlFor="myNewPicture">Add new photo</label>
										<input type="file" className="form-control-file" id="myNewPicture" />
									</div>
								</form>
							</div>

							<div className="tab-pane" id="looked">
								<hr />
									<h3>Users who looked through my profile</h3>
									<div className="row">
										<div className="col-xs-3">
											<div className="card">
												<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
												<div className="card-body">
													<h5 className="card-title">
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
													<h5 className="card-title">
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
							</div>
							<div className="tab-pane" id="likes">
								<hr />
									<h3>Users who liked my profile</h3>
									<div className="row">
										<div className="col-xs-3">
											<div className="card">
												<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
												<div className="card-body">
													<h5 className="card-title">Card title</h5>
													<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" className="btn btn-primary">view</a>
												</div>
											</div>
										</div> 
										<div className="col-xs-3">
											<div className="card">
												<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
												<div className="card-body">
													<h5 className="card-title">Card title</h5>
													<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" className="btn btn-primary">view</a>
												</div>
											</div>
										</div> 
									</div>
							</div> 
							<div className="tab-pane" id="blocks">
								<hr />
									<h3>Profiles that I blocked</h3>
									<h6>Или вывести списком имена</h6>
									<div className="row">
										<div className="col-xs-3">
											<div className="card">
												<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
												<div className="card-body">
													<h5 className="card-title">Card title</h5>
													<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" className="btn btn-primary">view</a>
												</div>
											</div>
										</div> 
										<div className="col-xs-3">
											<div className="card">
												<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" />
												<div className="card-body">
													<h5 className="card-title">Card title</h5>
													<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
													<a href="#" className="btn btn-primary">view</a>
												</div>
											</div>
										</div> 
									</div>
							</div> 
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Cabinet;