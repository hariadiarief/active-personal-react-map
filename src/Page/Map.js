import React, { Component, Fragment } from 'react'
import Typed from 'react-typed'
import Geocode from 'react-geocode'
import LocationPicker from 'react-location-picker'

import { ReactComponent as IconGps } from '../images/banner/gps.svg'

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
			addressinputed: null,
			addressesSuggestion: [],
		}
	}

	componentDidMount() {
		this.locationInitiation()
		this.geoCodeFromAddress()
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

	geoCodeFromAddress(value) {
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API)
		Geocode.setLanguage('id')
		Geocode.setRegion('ID')

		Geocode.fromAddress(value).then(
			(response) => {
				this.setState({ addressesSuggestion: response.results })
			},
			(error) => {
				console.error(error)
			}
		)
	}

	geoCodeFromLatLng() {
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API)
		Geocode.setLanguage('id')
		Geocode.setRegion('ID')

		const { latitude, longitude } = this.state.merchantUpdate.location
		Geocode.fromLatLng(latitude, longitude).then(
			(response) => {
				const address = response.results[0].formatted_address

				this.setState({ address })
			},
			(error) => {
				console.error(error)
			}
		)
	}

	render() {
		const { whichInput, position, address, addressinputed, addressesSuggestion } = this.state
		return (
			<div className='map'>
				<div className='map__banner'>
					<IconGps />
					<Typed strings={['Seach', 'Your Location']} typeSpeed={50} backSpeed={25} loop />
				</div>
				<div className='map__display'>
					<div className='navigations'>
						<a className={`navigation ${whichInput === SEARCH_BY_NAME && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_NAME })}>
							Pilih Berdasarkan Nama
						</a>
						<a className={`navigation ${whichInput === SEARCH_BY_COORDINAT && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_COORDINAT })}>
							Pilih Berdasarkan Koordinat
						</a>
					</div>

					{this.renderWhichSearchingType()}

					<div className='map__display__position'>
						<div className='map__display__position__address'>
							<span>Adress :&nbsp;</span>
							<span>{address}</span>
						</div>
						<div className='map__display__position__coordinate'>
							<div>
								<span>Latitude :&nbsp;</span>
								<span>{position.lat}</span>
							</div>
							<div>
								<span>Longitude :&nbsp;</span>
								<span>{position.lng}</span>
							</div>
						</div>
					</div>

					<div>
						<div>
							<span></span>
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
		const { whichInput, address, addressInputed, position } = this.state
		switch (whichInput) {
			case SEARCH_BY_NAME:
				return (
					<input
						className='input--address'
						value={addressInputed}
						onChange={({ target: { value } }) => this.setState({ addressInputed: value }, this.geoCodeFromAddress(value))}
						type='text'
						placeholder='Input location'
					/>
				)

			case SEARCH_BY_COORDINAT:
				return (
					<div className='input--coordinat'>
						<input type='number' value={position.lat} placeholder='Input Latitude' />
						<input type='number' value={position.lng} placeholder='Input Langitude' />
					</div>
				)
			default:
				break
		}
	}
}

export default Map
