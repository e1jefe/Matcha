import React, { Component } from 'react'
import { Tooltip, Button, Radio, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import $ from 'jquery'

// $('.alert').alert()
// $('.alert').alert('close')
// $('.alert1').alert()
// $('.alert1').alert('close')

class Like extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: props.who,
			target: props.target
		}
		this.onClick = this.onClick.bind(this)
	}
	
	onClick(){
		PostData('user/like', {uId: this.state.curentUserId, target: this.state.target}).then((res) => {
			console.log("you liked user ")
			res.check == true ? this.setState({liked: true}) : this.setState({liked: false})
			this.setState({
				msg: res.msg
			})
		})
	}	

	render(){
		return(
			<Tooltip placement="topLeft" title="Like profile">
				<Button type="primary" className="target-btn" onClick={this.onClick}>
					<Icon type="like-o" />
				</Button>
				{this.state.liked && 
					<div className="alert alert-success alert-dismissible fade show" role="alert">
						{this.state.msg}
						<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
				}
				{this.state.liked == false && 
					<div className="alert alert-warning alert-dismissible fade show" role="alert">
						{this.state.msg}
						<button type="button" className="close" data-dismiss="alert1" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
				}
			</Tooltip>
		)
	}
}

export default Like;