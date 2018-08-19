import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import { PostData } from '../../main/components/PostData'
import { Layout } from 'antd'
import { Carousel } from 'antd'
import { Rate } from 'antd'
import { Button } from 'antd'
import Like from './Like'
import Block from './Block'
import Scammer from './Scammer'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const { Content } = Layout

class ProfileContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			target: ''
		}
	}

	componentWillMount(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			if (user.userLogin !== '')
			{
				PostData('user/getGuestInfo', {uId: user.userId, target: this.props.target.params.id}).then((res) => {
					this.setState({
						curentUserId: user.userId,
						target: this.props.target.params.id,
						tLogin: res.userData.login,
						tFName: res.userData.fname,
						tLName: res.userData.lname,
						tAge: res.userData.age,
						tSex: res.userData.sex,
						tSexPref: res.userData.sexPref,
						tAvatar: res.userData.profilePic,
						tAllPics: res.userPhoto,
						tIsOnline: res.userData.isOnline,
						tLastSeen: res.userData.lastSeen,
						tBio: res.userData.bio,
						tTags: res.userData.tags,
						tStars: res.userData.stars,
						isLikeMe: res.isLike,
						isMatch: res.isMatch
					})
				})
			}
			this.conn = new WebSocket('ws:\//localhost:8090')
			this.conn.onmessage = this.onMessage.bind(this)
		}
	}

	onMessage(event){
		const data = JSON.parse(event.data);
		if (data.event === 'setLike' && data.user_id !== this.state.curentUserId) {
			iziToast.show({
				theme: 'dark',
				icon: 'icon-like',
				image: data.ava,
				imageWidth: 50,
				maxWidth: '500px',
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
		if (data.event === 'match' && data.target_id === this.state.curentUserId) {
			iziToast.show({
				theme: 'dark',
				icon: 'icon-match',
				image: data.ava,
				imageWidth: 50,
				maxWidth: '500px',
				message: data.payload,
				position: 'topRight',
				progressBar: false
			})
		}
	}

	render(){
		const tags = (this.state.tTags !== undefined && this.state.tTags.length !== 0 && this.state.tTags !== "") ? this.state.tTags.split(" ") : this.state.tTags
		// if (picks != undefined){
		// 	console.log("this.state.tAllPics lenth", picks.length)
		// }
		return(
			<Layout>
				<Content>
					<div className="my-carousel">
						<Carousel>
							{this.state.tAllPics !== undefined && this.state.tAllPics.length !== 0 ?
								this.state.tAllPics.map((img, i) => (
								<div key={i}>
									<img src={img} alt="This user"/>
								</div>))
								:
								this.state.tAvatar !== "" ? (<img src={this.state.tAvatar} alt="This user"/>)
								:
								<img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="This user"/>
							}
						</Carousel>
					</div>
					<div className="targetDescription">
						<h2 className="targetDescription-name">{this.state.tFName} {this.state.tLName}, </h2>
						<h2 className="targetDescription-age">{this.state.tAge}</h2>
						<div className="targetDescription-info">
							<p>1992.6 km away</p>
							<p>{this.state.tSexPref === 'homo' ? "Homosexual" : this.state.tSexPref === 'hetero' ? "Heterosexual" : "Bisexual"}, {this.state.tSex}</p>
							<p>Last visit: {this.state.tIsOnline ? "online" : this.state.tLastSeen}</p>
							{this.state.isLikeMe && <p>Added me to favourite</p>}
							{this.state.isMatch && <p>We are connected</p>}
						</div>
						<p className="targetBio">{this.state.tBio}</p>
						<Rate allowHalf disabled value={this.state.tStars} style={{marginBottom: "10px"}}/>
						<div className="targetTags">
							<h2>Tags:</h2>
							<div className="targetTags-holder">
								{tags !== undefined && tags.lenth !== 0 && tags !== "" ? 
									tags.map((tag) => (<p key={tag.toString()} className="targetTags-single">{tag}</p>))
									:
									tags !== "" ? (<p className="targetTags-single">{tags}</p>)
									:
									null
								}
							</div>
						</div>
						<Button.Group size="large" className="my-card-width">
							<Like who={this.state.curentUserId} target={this.props.target.params.id}/>
							<Block target={this.props.target.params.id}/>
							<Scammer target={this.props.target.params.id}/>
						</Button.Group>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default ProfileContent;