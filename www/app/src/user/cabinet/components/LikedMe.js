import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import { Rate, Button } from 'antd'
import Like from '../../profile/components/Like'
import Block from '../../profile/components/Block'
import OpenProfile from '../../profile/components/OpenProfile'

class LikedMe extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId
		}
	}

	componentWillMount(){
		PostData('user/getAllInfo', {userId: this.state.userId}).then((res) => {
			this.setState({
				whoLikedMe: res.whoLikesUser
			})
		})
	}

	render() {
		const whoLikedMe = this.state.whoLikedMe
		console.log("who liked me", whoLikedMe)
		return(
			<div>
				<div className="form-group">
					<div className="col-xs-12">
						<h3>Users who liked my profile</h3>
					</div>
				</div>
				<div className="row">
					{whoLikedMe !== undefined && whoLikedMe !== null ? 
						whoLikedMe.map((profile) => (												
							<div className="col-xs-4" key={profile.uId}>
								<div className="card card-relatieve">
									<div className="onLineIndecator" style={profile.isOnline === true ? {backgroundColor: '#00e64d'} : null}></div>
									<img className="card-img-top" src={profile.profilePic !== "" ? profile.profilePic : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" } alt="avatar"/>
									<div className="my-card-body">
										<h5 className="card-title margin-top">
											{profile.fname} {profile.lname}
										</h5>
										<h6 className="card-subtitle mb-2 text-muted">
											Age: {profile.age}
										</h6>
										<Rate allowHalf disabled defaultValue={profile.stars} />
										<hr />
										<Button.Group size="large" className="my-card-width">
											<OpenProfile target={profile.uId}/>
											<Like who={this.state.userId} target={profile.uId} className="my-card-btn-width"/>
											<Block who={this.state.userId} target={profile.uId} className="my-card-btn-width"/>
										</Button.Group>
									</div>
								</div>
							</div>
						))
						:
						null
					}
				</div>
			</div>
			)
	}

}

export default LikedMe