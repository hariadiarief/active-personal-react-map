import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Typed from 'react-typed'

import { ReactComponent as IconGps } from '../images/banner/gps.svg'
import InputAddress from '../components/InputAddress'
import InputCoordinat from '../components/InputCoordinat'

import LocationPicker from 'react-location-picker'

const SEARCH_BY_NAME = 1
const SEARCH_BY_COORDINAT = 2

class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			whichInput: SEARCH_BY_NAME,
			address: 'Kala Pattar Ascent Trail, Khumjung 56000, Nepal',
			position: {
				lat: 0,
				lng: 0,
			},
		}
	}

	componentDidMount() {
		this.locationInitiation()
	}

	locationInitiation() {
		window.navigator.geolocation.getCurrentPosition(
			(position) =>
				this.setState({
					position: {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					},
				}),
			(err) => this.setState({ errorMessage: err.message })
		)
	}

	handleLocationChange = ({ position, address }) => {
		this.setState({ position, address })
	}

	render() {
		const { whichInput, position, address } = this.state
		return (
			<div className='map'>
				<div className='map__banner'>
					<IconGps />
					<Typed strings={['Seach', 'Your Location']} typeSpeed={50} backSpeed={25} loop />
				</div>
				<div className='map__display'>
					<div className='navigation map__display__navigation'>
						<div className='navigations'>
							<a className={`navigation ${whichInput === SEARCH_BY_NAME && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_NAME })}>
								Pilih Berdasarkan Nama
							</a>
							<a className={`navigation ${whichInput === SEARCH_BY_COORDINAT && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_COORDINAT })}>
								Pilih Berdasarkan Koordinat
							</a>
						</div>
						{this.renderWhichSearchingType()}
						<div>
							<span>Address : {address}</span>
							<span>Latitude: {position.lat}</span>
							<span>Longitude: {position.lng}</span>
						</div>
						<LocationPicker
							containerElement={<div style={{ height: '100%' }} />}
							mapElement={<div style={{ height: '400px' }} />}
							defaultPosition={position}
							zoom={18}
							radius={10}
							onChange={this.handleLocationChange}
						/>
					</div>
				</div>
			</div>
		)
	}

	renderWhichSearchingType() {
		const { whichInput } = this.state
		switch (whichInput) {
			case SEARCH_BY_NAME:
				return <input type='text' placeholder='Input location' />
			case SEARCH_BY_COORDINAT:
				return (
					<div>
						<input type='text' placeholder='Input Latitude' />
						<input type='text' placeholder='Input Langitude' />
					</div>
				)
			default:
				break
		}
	}
}

export default Map
