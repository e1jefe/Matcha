import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import Geocode from "react-geocode"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import GoogleMapReact from 'google-map-react'

import axios from 'axios'

Geocode.setApiKey('AIzaSyCP9L40mEFKlERXq8cHeG_x0EZfsWW9A-s')
Geocode.enableDebug();
// const AnyReactComponent = ({ text }) => <div>{text}</div>


class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uId: props.userId,
			longDen: '',
			latDen: '',
			longAllow: '',
			latAllow: '',
			city: '',
			country: ''
		}
	}

	componentDidMount(){
		if(navigator.geolocation){
	        console.log("in allow coord")

			let self = this
			navigator.geolocation.getCurrentPosition( function(pos) {
				console.log("HERE")
				self.setState({
					longAllow: pos.coords.longitude,
					latAllow: pos.coords.latitude
				})
			})
			axios.get('http://ip-api.com/json')
			  .then(function(response){
			  	self.setState({
					longDen: response.data.lon,
					latDen: response.data.lat,
					city: response.data.city,
					country: response.data.country
				})
			  })
			PostData('user/pushCoord', {uId: self.uId, city: self.city, country: self.country, longAllow: self.longAllow, latAllow: self.latAllow, longDen: self.longDen, latDen: self.latDen}).then ((result) => {
				console.log('in state', self)
			})
		}
	}

	render(){
		console.log('LOCATION', this.state)
		const lat = this.state.latAllow == '' ? this.state.latDen : this.state.latAllow
		const lng = this.state.longAllow == '' ? this.state.longDen : this.state.longAllow

		const MyGoogleMap = withGoogleMap(props => (
			<GoogleMap 
				defaultZoom={11}
    			defaultCenter={{ lat: 50.469017, lng: 30.462191 }}>
					<Marker
      					position={{ lat: parseInt(props.lat), lng: parseInt(props.lng)}}
    				/>
    		</GoogleMap>
    			))
		return(
			<form className="form" id="location2" style={{height: '700px'}}>
				<div className="form-group">
					<div className="col-xs-12">
						<label htmlFor="location">
							<h4>
								Location
							</h4>
						</label>
						<p>{this.state.city}, {this.state.country}</p>
					</div>
				</div>
				
				<div className="form-group" style={{height: `100%`}}>

				<div style={{height: `100%`}}>
					<div className="col-xs-12" style={{height: `100%`}}>

					<MyGoogleMap
						containerElement={
							<div style={{    position: 'absolute',
	                        top: 0,
	                        left: 0,
	                        right: 0,
	                        bottom: 0,
	                        justifyContent: 'flex-end',
	                        alignItems: 'center',}} />
						}
						mapElement={
							<div style={{    position: 'absolute',
	                        top: 0,
	                        left: 0,
	                        right: 0,
	                        bottom: 0,
	                   }} />
						}
						lat={lat}
						lng={lng}

						/>	
				</div>
				</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12">
						<br />
						<button className="btn btn-lg pull-right" type="reset">
							<i className="glyphicon glyphicon-repeat"></i> Reset
						</button>
						<button className="btn btn-lg btn-success pull-right" type="submit">
							<i className="glyphicon glyphicon-ok-sign"></i>
							 Save
						</button>
					</div>
				</div>
			</form>
		)
	}
}



export default Location;