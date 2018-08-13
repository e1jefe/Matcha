import React, { Component } from 'react'
import { Tooltip, Button, Icon } from 'antd'
import { PostData } from '../../main/components/PostData'
import jwtDecode from 'jwt-decode'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

class Scammer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curentUserId: '',
			target: props.target
		}
		this.onClick = this.onClick.bind(this)
	}
	
	onClick(){
		const token = localStorage.getItem('token');
		if (token !== null)
		{
			const user = jwtDecode(token);
			PostData('user/scammer', {uId: user.userId, target: this.state.target}).then((res) => {
				console.log("res in report ", res)
				iziToast.info({
				    message: res.msg,
				    position: 'topRight',
				    progressBar: false
				})
			})
		}
	}

	componentDidMount(){
	}

	render(){
		return(
			<Tooltip placement="topLeft" title="Report scammer">
				<Button type="primary" className="target-btn" onClick={this.onClick}>
					<Icon type="user-delete" />
				</Button>
			</Tooltip>
		)
	}
}

export default Scammer;