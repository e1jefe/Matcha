import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
import history from "../../history/history"
import { PostData } from '../../main/components/PostData'
import { Rate } from 'antd'
import { Tooltip, Button, Radio, Icon } from 'antd'

class Views extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId,
			whoViewedMe: []
		}
		this.handleProfile = this.handleProfile.bind(this)
	}

	componentWillMount(){
		PostData('user/getWhoViewMe', {uId: this.state.userId}).then((res) => {
			this.setState({
				whoViewedMe: res.views
			})
		})
	}

	handleProfile(e){
		// e.preventDefault()
		console.log("I clicked on profile: ", e.target.name)
		history.push('/home/profile');
	}

	render(){
		const whoViewedMe = this.state.whoViewedMe
		console.log("who view me ", this.state.whoViewedMe)
		const green = {
			backgroundColor: "#00ff00!important"
		}
		return(
			<div>
				<div className="form-group">
					<div className="col-xs-12">
						<h3>Users who looked through my profile</h3>
					</div>
				</div>
				<div className="row">
					{whoViewedMe.length > 0 ? 
						whoViewedMe.map((view) => (
						<div className="col-xs-4" key={view.uId}>
							<div className="card card-relatieve">
								<div className="onLineIndecator" style={view.isOnline == 1 ? {backgroundColor: '#00e64d'} : null}></div>
								<img className="card-img-top" src={view.profilePic != "" ? view.profilePic : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" } />
								<div className="my-card-body">
									<h5 className="card-title margin-top">
										{view.fname} {view.lname}
									</h5>
									<h6 className="card-subtitle mb-2 text-muted">
										Age: {view.age}
									</h6>
									<Rate allowHalf disabled defaultValue={view.stars} />
									<hr />
									<Button.Group size="large" className="my-card-width">
											<Tooltip placement="topLeft" title="Review profile">
												<Button name={view.uId} type="primary" className="my-card-btn-width" onClick={this.handleProfile}>
													<Icon type="info-circle-o" />
												</Button>
											</Tooltip>
										<Tooltip placement="topLeft" title="Like profile">
											<Button type="primary" className="my-card-btn-width">
												<Icon type="like-o" />
											</Button>
										</Tooltip>
										<Tooltip placement="topLeft" title="Never show me">
											<Button type="primary" className="my-card-btn-width">
												<Icon type="close-circle-o" />
											</Button>
										</Tooltip>
										<Tooltip placement="topLeft" title="Report scammer">
											<Button type="primary" className="my-card-btn-width">
												<Icon type="user-delete" />
											</Button>
										</Tooltip>
									</Button.Group>
								</div>
							</div>
						</div>
						)) 
						: null
					}
				</div>
			</div>
		)
	}
}

export default Views;