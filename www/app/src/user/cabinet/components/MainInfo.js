import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import { PostData } from '../../main/components/PostData';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class MainInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId,
			login: '',
			fName: '',
			lName: '',
			email: '',
			age: '',
			sexPref: '',
			fameRate: '',
			avatar: '',
			pass: '',
			sex: ''
		}
		this.onChange = this.onChange.bind(this)
		this.handleSexChange = this.handleSexChange.bind(this)
		this.handleSexPrefChange = this.handleSexPrefChange.bind(this)
		this.handleSubmitInfo = this.handleSubmitInfo.bind(this)
	}

	componentDidMount() {
		PostData('user/getAllInfo', {userId: this.state.userId}).then ((result) => {

			this.setState({
				login: result.userData.login,
				fName: result.userData.fname,
				lName: result.userData.lname,
				email: result.userData.email,
				age: result.userData.age,
				sex: result.userData.sex === null ? ' ' : result.userData.sex,
				sexPref: result.userData.sexPref === null ? ' ' : result.userData.sexPref,
				fameRate: result.userData.fameRate
			})
		})
	}

	onChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	handleSexChange(event){
		event.preventDefault();
		this.setState({sex: event.target.value});
	}

	handleSexPrefChange(event){
		event.preventDefault();
    	this.setState({sexPref: event.target.value});
	}

	handleSubmitInfo(event) {
		event.preventDefault();
		let login = findDOMNode(this.refs.login).value.trim()
		let pass = findDOMNode(this.refs.password).value.trim()
		let fname = findDOMNode(this.refs.first_name).value.trim()
		let lname = findDOMNode(this.refs.last_name).value.trim()
		let email = findDOMNode(this.refs.email).value.trim()
		let age = findDOMNode(this.refs.dob).value.trim()
		let userData = {
			uId: this.state.userId,
			login: login,
			pass: pass,
			fname: fname,
			lname: lname,
			email: email,
			age: age,
			sex: this.state.sex,
			sexPref: this.state.sexPref
		}
		PostData('user/recordInfo', userData).then ((result) => {
			this.setState({
				login: result.newData.login,
				fname: result.newData.fname,
				lname: result.newData.lname,
				email: result.newData.email,
				sex: result.newData.sex,
				sexPref: result.newData.sexPref
			}, iziToast.info({
				    title: 'Info',
				    message: 'We updated your info',
				    position: 'center',
				    progressBar: false
				}))
		})
	}

	render() {

		return(
			<form className="form" id="registrationForm1" onSubmit={this.handleSubmitInfo}>
				<div className="form-group">
					<div className="col-xs-6 marginTop">
						<label htmlFor="first_name">
							<h4>
								First name
							</h4>
						</label>
						<input type="text" className="form-control" name="fname"  ref="first_name" onChange={this.onChange} id="first_name" defaultValue={this.state.fName !== undefined ? this.state.fName : " "} title="enter your first name if any." />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-6 marginTop">
						<label htmlFor="last_name">
							<h4>
								Last name
							</h4>
						</label>
						<input type="text" className="form-control" name="lname" ref="last_name" onChange={this.onChange} id="last_name" defaultValue={this.state.lName !== undefined ? this.state.lName: " "} title="enter your last name if any." />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-6 marginTop">
						<label htmlFor="login">
							<h4>
								Login
							</h4>
						</label>
						<input type="text" className="form-control" name="login" ref="login" onChange={this.onChange} id="login" defaultValue={this.state.login !== undefined ? this.state.login : " "} title="enter your new login" />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-6 marginTop">
						<label htmlFor="password">
							<h4>
								Password
							</h4>
						</label>
						<input type="password" className="form-control" name="pass" onChange={this.onChange} ref="password" id="password" placeholder="password" title="enter your password." />
					</div>
				</div>
				<div className="form-group">          
					<div className="col-xs-6 marginTop" >
						<label htmlFor="email">
							<h4>
								Email
							</h4>
						</label>
						<input type="email" className="form-control" name="email" ref="email" onChange={this.onChange} id="email" placeholder={this.state.email !== undefined ? this.state.email : " "} title="enter your email." />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-6 marginTop" >
						<label htmlFor="dob">
							<h4>
								Date of Birth
							</h4>
						</label>
						<input type="date" className="form-control" ref="dob" name="age" onChange={this.onChange} id="dob" placeholder="Date of Birth" />
					</div> 
				</div>
				<div className="form-group">
					<div className="col-xs-12 marginTop" >
						<h4>Choose your sex</h4>
							<select className="custom-select" value={this.state.sex !== "" ? this.state.sex : " "} onChange={this.handleSexChange} id="inputGroupSelect02" name="gender">
								<option value="">...</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
					</div> 
				</div>
				<div className="form-group">
					<div className="col-xs-12 marginTop" >
						<h4>
							Choose your sexual preferences
						</h4>
						<select className="custom-select" value={this.state.sexPref !== undefined ? this.state.sexPref : " "} onChange={this.handleSexPrefChange} name="sexPref">
							<option value="">...</option>
						    <option value="bi" >Bisexual</option>
						    <option value="hetero" >Heterosexual</option>
						    <option value="homo" >Homosexual</option>						    
						</select>
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
		)
	}
}
export default MainInfo;