import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import Geocode from "react-geocode"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"

Geocode.setApiKey('AIzaSyCP9L40mEFKlERXq8cHeG_x0EZfsWW9A-s')
Geocode.enableDebug();

const Map = withScriptjs(withGoogleMap((props) =>{
	// const markers = props.doctors.map( doctor => <DoctorMarker
 //                    key={doctor.uid}
 //                    doctor={doctor}
 //                    location={{lat: 50.4333, lng: 30.5167}}
 //                  />);
  return (
      <GoogleMap
        defaultZoom={14}
        center={ { lat:  42.3601, lng: -71.0589 } }
        >
        googleMapURL={'https://react-google-maps.googleapis.com/maps/api/js?key=AIzaSyCP9L40mEFKlERXq8cHeG_x0EZfsWW9A-s&v=3.exp'}
        loadingElement={<div style={{ height: `100%` }} />}
		containerElement={<div style={{ height: `600px`, width: `600px` }} />}
		mapElement={<div style={{ height: `100%` }} />}
      </GoogleMap>
    );
  }
))

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uId: props.uId,
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
			let self = this
			navigator.geolocation.getCurrentPosition( function(pos) {
				Geocode.fromLatLng(pos.coords.latitude, pos.coords.longitude).then(
					response => {
				    	const address = response.results[0].address_components[3].long_name + ', ' + response.results[0].address_components[6].long_name;
				    	console.log(address);
				    	self.setState({
				    		city: response.results[0].address_components[3].long_name,
				    		country: response.results[0].address_components[6].long_name
				    	})
				  	},
					error => {
				    	self.setState({
				    		err: error
				    	})
					}
				);
				PostData('user/pushCoord', {uId: self.uId, city: self.city, country: self.country, longitude: pos.coords.longitude, latitude: pos.coords.latitude}).then ((result) => {
					console.log(result)
				})
				self.setState({
					longAllow: pos.coords.longitude,
					latAllow: pos.coords.latitude
				})
			})
		}

	}

	render(){
		return(
			<form className="form" id="location2">
				<div className="form-group">
					<div className="col-xs-12">
						<label htmlFor="location">
							<h4>
								Location
							</h4>
						</label>
						<input type="text" className="form-control" id="location" placeholder="somewhere" title="enter a location" />
						<Map />
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12">
						<h4>
							Гдето здесь должна быть красивая карта чтобы выбрать пин где я
						</h4>
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