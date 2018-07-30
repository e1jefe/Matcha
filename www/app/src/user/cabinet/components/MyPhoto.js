import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import { Tabs, Tab } from 'react-bootstrap'
import $ from 'jquery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

class MyPhoto extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			userId: props.userId,			
			pics: '',
			picErr: '',
			photoIndex: 0,
      		isOpen: false
		}
	}

	componentWillMount(){
		PostData('user/getAllInfo', {userId: this.state.userId}).then ((result) => {
			this.setState({
				pics: result.userPhoto
			})
		})
	}

	componentDidMount(){
		$('.ril-zoom-in').hide();
	}

	onCHangeFile(e) {
		this.setState({picErr: ''})
		let files = e.target.files
		let reader = new FileReader()
		reader.readAsDataURL(files[0])
		reader.onload=(e) => {
			PostData('user/newPhoto', {file: e.target.result, userId: this.state.userId}).then((result) => {
				if (result === false)
				{
					const errPhoto = "You reached photo limit. Delet something before adding new one."
					this.setState({picErr: errPhoto})
				} else {
					this.setState({
						pics: result.userPhoto
					})
				}
			})
		}
	}

	render() {
		const userPics = this.state.pics
		const photoIndex = this.state.photoIndex
		return(
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
								<div className="col-lg-3" key={pikcha.toString()} onClick={() => this.setState({ isOpen: true })}>
									<img src={pikcha} alt="..." className="img-thumbnail" />
								</div>								
							))
							:
							null
						}											
					</div>
				</div>					

				<div className="form-group margin-top">
				    <input type="file" name="img[]" className="file" onChange={ (e) => this.onCHangeFile(e)}/>
				    <div className="input-group col-xs-12">
				    	<span className="input-group-addon"><i className="glyphicon glyphicon-picture"></i></span>
				    	<input type="text" className="form-control input-lg" disabled placeholder="Upload Image" />
				    	<span className="input-group-btn">
				      	<button className="browse btn btn-success input-lg" type="button"><i className="glyphicon glyphicon-search"></i> Browse</button>
				    	</span>
				    </div>
				</div>
				{this.state.picErr !== null && this.state.picErr !== '' ?
					<div className="alert alert-danger" role="alert">
						{this.state.picErr}
					</div>
					:
					null
				}
				
        		{this.state.isOpen && (<Lightbox
        			mainSrc={this.state.pics[photoIndex]}
        			nextSrc={this.state.pics[(photoIndex + 1) % this.state.pics.length]}
		            prevSrc={this.state.pics[(photoIndex + this.state.pics.length - 1) % this.state.pics.length]}
		            onCloseRequest={() => this.setState({ isOpen: false })}
		            onMovePrevRequest={() =>
		              this.setState({
		                photoIndex: (photoIndex + this.state.pics.length - 1) % this.state.pics.length,
		              })
		            }
		            onMoveNextRequest={() =>
		              this.setState({
		                photoIndex: (photoIndex + 1) % this.state.pics.length,
		              })
		            }/>)}
			</form>
		)
	}

}

export default MyPhoto