import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import { Tooltip, Button, Icon } from 'antd'
import Block from '../../profile/components/Block'
import Scammer from '../../profile/components/Scammer'
import OpenProfile from '../../profile/components/OpenProfile'

class MyBlocks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId
		}
	}

	componentWillMount(){
		PostData('user/getMyBlocks', {uId: this.state.userId}).then((res) => {
			this.setState({
				myBlocks: res.myBlocks
			})
		})
	}

	render() {
		const myBlocks = this.state.myBlocks
		return(
			<div>
				<div className="form-group">							
					<div className="col-xs-12">
						<h3>Profiles that I blocked</h3>
					</div>
				</div>									
				<div className="row">
					{myBlocks !== undefined && myBlocks !== null ? 
						myBlocks.map((profile) => (												
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
										<h6 className="card-subtitle mb-2 text-muted">
											{profile.sexPref == 'homo' ? "Homosexual" : profile.sexPref == 'hetero' ? "Heterosexual" : "Bisexual"}, {profile.sex}
										</h6>
										<h6 className="card-subtitle mb-2 text-muted">
											Last visit: {profile.lastSeen}
										</h6>
										<hr />
										<Button.Group size="large" className="my-card-width">
											<OpenProfile target={profile.uId}/>
											<Block who={this.state.userId} target={profile.uId} className="my-card-btn-width"/>
											<Scammer target={profile.uId}/>
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

export default MyBlocks