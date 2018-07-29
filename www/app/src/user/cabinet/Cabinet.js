import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { PostData } from '../main/components/PostData';
import history from "../history/history";
import './cabinet.css'
import { Tabs, Tab } from 'react-bootstrap';

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
			avatar: '',
			pass: '',
			whoLikedMe: []
		}
		this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
		this.handleSubmitAbout = this.handleSubmitAbout.bind(this)
		// this.getWhoLikedMe()
	}

	componentWillMount() {
		const token = localStorage.getItem('token')
		if (token !== null)
		{
			let user = jwtDecode(token)
			if (user.userLogin !== '')
				user = user.userId
			PostData('user/getAllInfo', {userId: user}).then ((result) => {
				this.setState({
					fName: result.userData.fname,
					lName: result.userData.lname,
					email: result.userData.email,
					age: result.userData.age,
					sex: result.userData.sex,
					sexPref: result.userData.sexPref,
					bio: result.userData.bio,
					fameRate: result.userData.fameRate,
					tags: result.userData.tags,
					pics: result.userPhoto,
					avatar: result.userData.profilePic
				})
			})
			PostData('user/getWhoLikes', {userId: user}).then ((result) => {
				this.setState({
					whoLikedMe: result
				})
			})			
		}
	}

	handleSubmitInfo(event) {
		event.preventDefault();
		PostData('user/recordInfo', this.state).then ((result) => {
			console.log("I'm handling submit first tab")
		})
	}

	handleSubmitAbout(event) {
		event.preventDefault();
		PostData('user/recordAbout', this.state).then ((result) => {
			console.log("I'm handling submit second tab")
		})
	}

	render() {
		const marginTop = {marginTop: 15 + 'px'}
		const userPics = this.state.pics
		const whoLikedMe = this.state.whoLikedMe
		console.log("in whoLikedMe:   ", whoLikedMe)
		return(
			<div className="container bootstrap snippet" style={marginTop}>
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
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
							<Tab eventKey={1} title="Personal info">
								<form className="form" id="registrationForm1" onSubmit={this.handleSubmitInfo}>
									<div className="form-group">
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="first_name">
												<h4>
													First name
												</h4>
											</label>
											<input type="text" className="form-control" name="first_name" id="first_name" defaultValue={this.state.fName} title="enter your first name if any." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="last_name">
												<h4>
													Last name
												</h4>
											</label>
											<input type="text" className="form-control" name="last_name" id="last_name" defaultValue={this.state.lName} title="enter your last name if any." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="login">
												<h4>
													Login
												</h4>
											</label>
											<input type="text" className="form-control" name="login" id="login" defaultValue={this.state.login} title="enter your new login" />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="password">
												<h4>
													Password
												</h4>
											</label>
											<input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password." />
										</div>
									</div>
									<div className="form-group">          
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="email">
												<h4>
													Email
												</h4>
											</label>
											<input type="email" className="form-control" name="email" id="email" placeholder={this.state.email} title="enter your email." />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-6" style={marginTop}>
											<label htmlFor="dob">
												<h4>
													Date of Birth
												</h4>
											</label>
											<input type="date" className="form-control" id="dob" placeholder="Date of Birth" />
										</div> 
									</div>
									<div className="form-group">
										<div className="col-xs-12" style={marginTop}>
											<h4>Choose your sex</h4>
											<label className="radio-inline">
												<input type="radio" name="sex" id="inlineCheckbox1" defaultValue="male" checked={this.state.sex === "male" ? "true" : null}/>
													Male
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex" id="inlineCheckbox2" defaultValue="female" checked={this.state.sex === "female" ? "true" : null}/>
													Female
											</label>
										</div> 
									</div>
									<div className="form-group">
										<div className="col-xs-12" style={marginTop}>
											<h4>
												Choose your sexual preferences
											</h4>
											<label className="radio-inline">
												<input type="radio" name="sex2"  defaultValue="bi" checked={this.state.sex === "bi" ? "true" : null}/>
													Bisexual
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex2"  defaultValue="hetero" checked={this.state.sex === "hetero" ? "true" : null}/>
													Heterosexual
											</label>
											<label className="radio-inline">
												<input type="radio" name="sex2"  defaultValue="homo" checked={this.state.sex === "homo" ? "true" : null}/>
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
							</Tab>

							<Tab eventKey={2} title="About me">
								<form className="form" id="registrationForm2" onSubmit={this.handleSubmitAbout}>
									<div className="form-group">
										<div className="col-xs-12">
											<label htmlFor="tags">
												<h4>
													My interests:
												</h4>
											</label>
											{this.state.tags !== null && this.state.tags !== '' ? 
												<div className="col-xs-10">
													{this.state.tags}
												</div>
												:
												null
											}
											<input type="text" className="form-control" name="tags" id="tags" placeholder="for e.g. muzic photo" title="enter your interests as separated one space words" />
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-12" style={marginTop}>
											<label htmlFor="bio">
												<h4>
													Some words about me
												</h4>
											</label>
												{(this.state.bio !== '' && this.state.bio !== null) ?
													<div className="col-xs-12" style={marginTop} contentEditable='true'>
														{this.state.bio}
													</div>
													:
													<textarea className="form-control" name="bio" id="bio" placeholder="some facts about you or short your lifestory" title="some facts about you or short your lifestory" maxLength="256" rows="5" style={{resize: 'none'}}></textarea>
												}
										</div>
									</div>
									<div className="form-group">
										<div className="col-xs-12">
											<br />
											<button className="btn btn-lg pull-right" type="reset">
												<i className="glyphicon glyphicon-repeat"></i> Reset
											</button>
											<button className="btn btn-lg btn-success pull-right" type="submit">
												<i className="glyphicon glyphicon-ok-sign"></i> Save
											</button>
										</div>
									</div>
								</form>
							</Tab>

							<Tab eventKey={3} title="My location">
								<form className="form" id="location2">
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
											<button className="btn btn-lg pull-right" type="reset">
												<i className="glyphicon glyphicon-repeat"></i> Reset
											</button>
											<button className="btn btn-lg btn-success pull-right" type="submit">
												<i className="glyphicon glyphicon-ok-sign"></i>
												 Save
											</button>
										</div>
									</div>
								</form>
							</Tab>

							<Tab eventKey={4} title="Photos">
								<form className="form" id="registrationForm3">
									<div className="form-group">								
										<div className="col-xs-12">
											<h4>
												You can upload up to 5 photos
											</h4>
										</div>
									</div>

									<div className="row">
										<div className="col-lg-12">
											{(userPics !== null && userPics !== '') ? 
												userPics.map((pikcha) => (
													<div className="col-lg-3" key={pikcha.toString()}>
														<img src={pikcha} alt="..." className="img-thumbnail" />
													</div>
												))
												:
												null
											}											
										</div>
									</div>					
									<div className="form-group">
										<label htmlFor="myNewPicture">Add new photo</label>
										<input type="file" className="form-control-file" id="myNewPicture" />
									</div>
								</form>
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
														<h5 className="card-title">{profile.firstName} {profile.lastName}</h5>
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
							</Tab>

						</Tabs>
					</div>
				</div>
			</div>
		);
	}

}

export default Cabinet;