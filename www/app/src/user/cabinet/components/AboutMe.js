import React, { Component } from 'react'
import {findDOMNode} from 'react-dom'
import { PostData } from '../../main/components/PostData'

class AboutMe extends Component {
	constructor(props){
		super(props)
		this.state = {
			uId: props.userId,
			tags: '',
			bio: '',
			err: ''
		}
		this.onChangeBio = this.onChangeBio.bind(this);
		this.dellTag = this.dellTag.bind(this);
		this.handleSubmitAbout = this.handleSubmitAbout.bind(this);
	}

	componentWillMount() {
		PostData('user/getAbout', this.state).then ((result) => {
			// console.log("res in Mount ABOUT ", result)
			if (result.tags != null)
			{
				this.setState({
					tags: result.tags.split(" "),
					bio: result.bio
				})
			}
			else
			{
				this.setState({
					tags: result.tags,
					bio: result.bio
				})
			}
		})
	}

	onChangeBio(event) {
		this.setState({bio: event.target.value});
	}

	dellTag(event) {
		let tagToDel = event.target.getAttribute('tagcontent')
		PostData('user/dellTag', {what: tagToDel, uId: this.state.uId}).then ((result) => {
			this.setState({tags: result.tags.split(" ")})
		})
	}

	handleSubmitAbout(event) {
		event.preventDefault();
		if (this.state.bio === null || this.state.bio === '' || this.state.bio === undefined)
			this.setState({bio: ''})
		if (this.state.tags === null || this.state.tags === '' || this.state.tags === undefined)
			this.setState({tags: ''})
		this.setState({err: ''})
		let newTags = findDOMNode(this.refs.tags).value.trim()
		this.refs.tags.value = ' '
		PostData('user/recordAbout', {uId: this.state.uId, bio: this.state.bio, tags: newTags}).then ((result) => {
			console.log("resul from base ", result)
			if (result.end === true) {
				this.setState({
					tags: result.tags.split(" "),
					bio: result.bio,
					err: result.err
				})
			} else {
				this.setState({err: result.err})
			}
		})
	}

	render(){
		let tags = this.state.tags
		return(
			<form className="form" id="registrationForm2" onSubmit={this.handleSubmitAbout}>
				<div className="form-group">
					<div className="col-xs-12">
						<label htmlFor="tags" className="pull-left">
							<h4>
								My interests:
							</h4>
						</label>
						{tags !== null && tags !== '' && tags !== undefined && tags[0] !== '' ? 
							<div className="col-xs-10">
								{tags.map((tag) => (<div key={tag.toString()} className="tag"><span className="tagTxt">{tag}</span><span className="tagDel" tagcontent={tag.toString()} onClick={this.dellTag}> x</span></div>))}
							</div>
							:
							null
						}
						<input type="text" className="form-control" name="tags" ref="tags" id="tags" placeholder="for e.g. muzic photo" title="enter your interests as separated one space words" defaultValue=" " maxLength="256"/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 marginTop" >
						<label htmlFor="bio">
							<h4>
								Some words about me
							</h4>
						</label>
						<textarea className="form-control" name="bio" id="bio" onChange={this.onChangeBio} placeholder="some facts about you or short your lifestory" title="some facts about you or short your lifestory" maxLength="256" rows="5" style={{resize: 'none'}} value={this.state.bio !== "" ? this.state.bio : " "}/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12">
						<br />
						<button className="btn btn-lg pull-right" type="reset">
							<i className="glyphicon glyphicon-repeat"></i> Reset
						</button>
						<button className="btn btn-lg btn-success pull-right" type="submit">
							<i className="glyphicon glyphicon-ok-sign"></i> Save
						</button>
					</div>
				</div>
				{this.state.err !== '' && this.state.err !== undefined ? 
					<div className="form-group">
						<div className="col-xs-12 alert alert-warning">
							{this.state.err}
						</div>
					</div>
					:
					null
				}
			</form>
		)
	}
}

export default AboutMe