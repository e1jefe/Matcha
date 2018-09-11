import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import { Rate } from 'antd'
import { Button } from 'antd'
import Like from '../../profile/components/Like'
import Block from '../../profile/components/Block'
import OpenProfile from '../../profile/components/OpenProfile'

class Views extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId,
			whoViewedMe: []
		}
	}

	componentWillMount(){
		PostData('user/getWhoViewMe', {uId: this.state.userId}).then((res) => {
			this.setState({
				whoViewedMe: res.views
			})
		})
	}

	render(){
		const whoViewedMe = this.state.whoViewedMe
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
						<div className="col-xs-10 col-sm-4 col-md-4" key={view.uId}>
							<div className="card card-relatieve">
								<div className="onLineIndecator" style={view.isOnline === true ? {backgroundColor: '#00e64d'} : null}></div>
								<img className="card-img-top" src={view.profilePic !== "" ? view.profilePic : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" } alt="avatar"/>
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
										<OpenProfile target={view.uId}/>
										<Like who={this.state.userId} target={view.uId} className="my-card-btn-width"/>
										<Block who={this.state.userId} target={view.uId} className="my-card-btn-width"/>
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