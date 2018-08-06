import React, { Component } from 'react'
import { PostData } from '../../main/components/PostData'
import history from "../../history/history"
import Geocode from "react-geocode"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import GoogleMapReact from 'google-map-react'

import axios from 'axios'

Geocode.setApiKey('AIzaSyBj7XDClRGcxA9xTV3KPIwyijuHODynh4w')
Geocode.enableDebug();
// const AnyReactComponent = ({ text }) => <div>{text}</div>
// const MyGoogleMap = compose(
// 	withProps({
// 		googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
// 		loadingElement: <div style={{ height: `100%` }} />,
// 		containerElement: <div style={{ height: `400px` }} />,
// 		mapElement: <div style={{ height: `100%` }} />,

// 	}),
// 	lifecycle({
// 		componentWillMount(){
// 			const refs = {}
// 			this.setState({
// 				position: null,
// 				onMarkerMount: ref => {
// 					refs.marker = ref;
// 				},
// 				onPositionChanged: () => {
// 					const position = refs.marker.getPosition()
// 					console.log(position.toString())
// 				}
// 			})
// 		},
// 	}),
// 	withScriptjs,
// 	withGoogleMap)((props) => 
// 		<GoogleMap defaultZoom={11}	defaultCenter={{ lat: 50.469017, lng: 30.462191 }}>
// 			{props.isMarkerShown && <Marker
// 					position={{ lat: parseInt(props.lat), lng: parseInt(props.lng)}}
// 					draggable={true} ref={props.onMarkerMount} onPositionChanged={props.onPositionChanged} />}
// 		</GoogleMap>
// 	)


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
			country: '',
			markers: {
				position: {
					lat: 0,
					lng: 0
				},
				key: Date.now(),
			},
			mapCenter: { lat: 50.469017, lng: 30.462191 },
			mapRef: null,
			zoomLevel: 13
		}
	}

	componentDidMount(){
		PostData('user/getCoord', {uId: this.state.uId}).then ((result) => {
			this.setState({
				markers: {
					position: {
						lat: parseFloat(result.latAllow),
						lng: parseFloat(result.lngAllow)
					}
				}
			})
		})
		if(navigator.geolocation){
	        console.log("in allow coord")

			let self = this
			navigator.geolocation.getCurrentPosition( function(pos) {
				PostData('user/pushCoord', {uId: self.state.uId, longAllow: pos.coords.longitude, latAllow: pos.coords.latitude}).then ((result) => {
				})
				self.setState({
					longAllow: pos.coords.longitude,
					latAllow: pos.coords.latitude,
					// markers: {
					// 	position: {
					// 		lat: pos.coords.latitude,
					// 		lng: pos.coords.longitude
					// 	}
					// }
				})
			})
			axios.get('http://ip-api.com/json')
			  .then(function(response){
			  	PostData('user/pushCoord', {uId: self.state.uId, city: response.data.city, country: response.data.country, longDen: response.data.lon, latDen: response.data.lat}).then ((result) => {
				})
			  	self.setState({
					longDen: response.data.lon,
					latDen: response.data.lat,
					city: response.data.city,
					country: response.data.country
				})
			})				 
			
		}
	}

    handleMapClick = this.handleMapClick.bind(this);
    handleMapLoad = this.handleMapLoad.bind(this);
    updateLocation = this.updateLocation.bind(this);

    updateLocation(event){
    	event.preventDefault()
		    console.log("handle submit lat ", this.state.markers.position.lat());
		    console.log("handle submit lng ", this.state.markers.position.lng());
		const lat = this.state.markers.position.lat()
		const lng = this.state.markers.position.lng()
		PostData('user/pushCoord', {uId: this.state.uId, longAllow: lng, latAllow: lat}).then ((result) => {
			console.log("after update coord: ", result)
			// this.setState({
			// 	markers: {
			// 		position: {
			// 			lat: result.latAllow,
			// 			lng: result.lngAllow
			// 		}
			// 	}
			// })
		})
		//пока город апдейтить не буду, до этого записан по айпи, но может быть впн, как и цмышленный выбор на карте себя в другой стране
  //   	Geocode.fromLatLng(lat, lng).then(
		//   response => {
		//     const city = response.results[0].formatted_address.split(', ');

		//     console.log("address: ", city);
		//   },
		//   error => {
		//     console.error(error);
		//   }
		// );

    }

    handleMapClick(event) {
        let that = this;
        let mapRef = this._mapComponent;
        this.setState({
            markers: {
                position: event.latLng,
                key: Date.now()
            },
            mapCenter: event.latLng,
            zoomLevel: mapRef.getZoom()
        });

    }

    handleMapLoad(map) {
        this._mapComponent = map;
    }

	render(){
		const lat = this.state.latAllow == '' ? this.state.latDen : this.state.latAllow
		const lng = this.state.longAllow == '' ? this.state.longDen : this.state.longAllow
		const GoogleMapWrapper = withGoogleMap(props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={props.zoomLevel}
                defaultCenter={props.center}
                onClick={props.onMapClick}
            >
                <Marker {...props.markers} />
            </GoogleMap>
        ))
		return(
			<form className="form" id="location2" style={{height: '700px'}} onSubmit={this.updateLocation}>
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
					<GoogleMapWrapper
                    containerElement={
                        <div style={{ height: `50vh` }} />
                    }
                    mapElement={
                        <div style={{ height: `50vh` }} />
                    }
                    onMapClick={this.handleMapClick}
                    onMapLoad={this.handleMapLoad}
                    markers={this.state.markers}
                    center={this.state.mapCenter}
                    zoomLevel={this.state.zoomLevel}
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