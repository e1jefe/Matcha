import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import { Rate, Tooltip, Button, Icon } from 'antd'
import Like from '../../profile/components/Like'
import Block from '../../profile/components/Block'

class MyBlocks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId
		}
		this.handleProfile = this.handleProfile.bind(this)
	}

	componentWillMount(){
		PostData('user/getAllInfo', {userId: this.state.userId}).then((res) => {
			this.setState({
				myBlocks: res.myBlocks
			})
		})
	}

	handleProfile(e){
		// e.preventDefault()
		console.log("I clicked on profile: ", e.target.name)
		history.push('/profile/' + e.target.name);
	}

	render() {
		const whoLikedMe = this.state.whoLikedMe
		return(
			<div>
				<div className="form-group">							
					<div className="col-xs-12">
						<h3>Profiles that I blocked</h3>
						<h6>Или вывести списком имена</h6>
					</div>
				</div>									
				<div className="row">
					<div className="col-xs-3">
						<div className="card">
							<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar blocked person"/>
							<div className="card-body">
								<h5 className="card-title margin-top">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
					</div> 
					<div className="col-xs-3">
						<div className="card">
							<img className="card-img-top" src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar blocked person"/>
							<div className="card-body">
								<h5 className="card-title margin-top">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							</div>
						</div>
					</div> 
				</div>
			</div>
			)
	}

}

export default MyBlocks