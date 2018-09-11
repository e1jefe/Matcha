import React, { Component } from 'react';
import { PostData } from '../../main/components/PostData';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { Switch } from 'antd';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
			zoomLevel: 13,
			showMarker: true
		}
	}

	componentDidMount(){
		PostData('user/getCoord', {uId: this.state.uId}).then ((result) => {
			this.setState({
				markers: {
					position: {
						lat: parseFloat(result.latStart),
						lng: parseFloat(result.lngStart)
					}
				},
				showMarker: result.show
			})
		})	
	}

	handleMapClick = this.handleMapClick.bind(this);
	handleMapLoad = this.handleMapLoad.bind(this);
	updateLocation = this.updateLocation.bind(this);
	allowLocation = this.allowLocation.bind(this);

	updateLocation(event){
		event.preventDefault()
		if(this.state.showMarker){
			let lat;
			let lng;
			if (this.state.markers.position.lat instanceof Function) {
				lat = this.state.markers.position.lat();
				lng = this.state.markers.position.lng();
			} else {
				lat = this.state.markers.position.lat;
				lng = this.state.markers.position.lng;
			}
			
			PostData('user/pushCoord', {uId: this.state.uId, longAllow: lng, latAllow: lat, showMe: 1}).then ((result) => {
				iziToast.info({
					title: 'Location',
					message: 'We updated your location!',
					position: 'center',
					progressBar: false
				});
			})
		}
		else
			PostData('user/pushCoord', {uId: this.state.uId, showMe: 0}).then ((result) => {
				iziToast.info({
					title: 'Location',
					message: 'We would not show your location anymore',
					position: 'center',
					progressBar: false
				});

			})
	}

	handleMapClick(event) {
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

	allowLocation(checked){
		if (checked === false)
			this.setState({showMarker: false});
		else
			this.setState({showMarker: true});
	}

	render(){
		const show = this.state.showMarker
		const GoogleMapWrapper = withGoogleMap(props => (
			<GoogleMap
				ref={props.onMapLoad}
				defaultZoom={props.zoomLevel}
				defaultCenter={props.center}
				onClick={props.onMapClick}
			>
				{props.showMarker && <Marker {...props.markers} />}
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
					</div>
				</div>
				
				<div className="form-group" style={{height: `100%`}}>
					<div style={{height: `100%`}}>
						<div className="col-xs-12" style={{height: `100%`}}>
							<GoogleMapWrapper
								containerElement={
									<div style={{ height: `55vh` }} />
								}
								mapElement={
									<div style={{ height: `55vh` }} />
								}
								onMapClick={this.handleMapClick}
								onMapLoad={this.handleMapLoad}
								markers={this.state.markers}
								center={this.state.mapCenter}
								zoomLevel={this.state.zoomLevel}
								showMarker={this.state.showMarker}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12">
						<h4>
							Allow to collect my location
						</h4>
						<Switch checked={show !== undefined && show !== '' ? this.state.showMarker : false} onChange={this.allowLocation} />
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