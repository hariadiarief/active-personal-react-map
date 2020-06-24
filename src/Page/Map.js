import React, { Component, Fragment } from 'react'
import Typed from 'react-typed'
import Geocode from 'react-geocode'
import LocationPicker from 'react-location-picker'

import { ReactComponent as IconGps } from '../images/banner/gps.svg'

const SEARCH_BY_ADDRESS = 1
const SEARCH_BY_COORDINAT = 2

class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			whichInput: SEARCH_BY_ADDRESS,

			position: {
				lat: 0,
				lng: 0,
			},
			address: null,

			addressesSuggestion: {
				isShow: false,
				data: [],
			},
			addressInputed: null,
		}
	}

	componentDidMount() {
		this.locationInitiation()
		this.geoCodeFromAddress()
	}

	locationInitiation() {
		window.navigator.geolocation.getCurrentPosition(
			(position) =>
				this.setState(
					{
						position: {
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
					},
					() => this.geoCodeFromCoordinat()
				),
			(err) => this.setState({ errorMessage: err.message })
		)
	}

	handleLocationChange = ({ position, address }) => {
		this.setState({ position, address, addressInputed: address })
	}

	geoCodeFromAddress(value) {
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API)
		Geocode.setLanguage('id')
		Geocode.setRegion('ID')

		Geocode.fromAddress(value).then(
			(response) => {
				this.setState({ addressesSuggestion: { ...this.state.addressesSuggestion, data: response.results } })
			},
			(error) => {
				console.error(error)
			}
		)
	}

	selectAddress = (address) => {
		this.setState({
			address: address.formatted_address,
			position: {
				lat: address.geometry.location.lat,
				lng: address.geometry.location.lng,
			},
			addressesSuggestion: {
				isShow: false,
				data: [],
			},
			addressInputed: address.formatted_address,
		})
	}

	geoCodeFromCoordinat() {
		Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API)
		Geocode.setLanguage('id')
		Geocode.setRegion('ID')

		const { lat, lng } = this.state.position
		Geocode.fromLatLng(lat, lng).then(
			(response) => {
				const address = response.results[0].formatted_address

				this.setState({ address, addressInputed: address })
			},
			(error) => {
				console.error(error)
			}
		)
	}

	render() {
		const { whichInput, position, address, addressInputed, addressesSuggestion } = this.state
		console.log(addressesSuggestion)

		return (
			<div className='search-map'>
				<div className='search-map__banner'>
					<IconGps />
					<Typed strings={['Seach', 'Your Location']} typeSpeed={50} backSpeed={25} loop />
				</div>
				<div className='search-map__display'>
					<div className='navigations'>
						<a className={`navigation ${whichInput === SEARCH_BY_ADDRESS && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_ADDRESS })}>
							Pilih Berdasarkan Nama
						</a>
						<a className={`navigation ${whichInput === SEARCH_BY_COORDINAT && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_COORDINAT })}>
							Pilih Berdasarkan Koordinat
						</a>
					</div>

					{this.renderWhichSearchingType()}

					<div className='search-map__display__map'>
						{!addressesSuggestion.isShow ? null : (
							<div className='search-map__display__map__suggestion'>
								<div className='action-close'>
									<span onClick={()=> this.setState({addressesSuggestion : {isShow : false, data :[]} })}>close [X]</span>
								</div>
								{addressesSuggestion.data.map((address) => (
									<span onClick={() => this.selectAddress(address)}>{address.formatted_address}</span>
								))}
							</div>
						)}
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
		const { whichInput, address, addressInputed, position, addressesSuggestion } = this.state
		switch (whichInput) {
			case SEARCH_BY_ADDRESS:
				return (
					<Fragment>
						<input
							className='input--address'
							value={addressInputed}
							onChange={({ target: { value } }) =>
								this.setState(
									{
										addressInputed: value,
										addressesSuggestion: {
											...addressesSuggestion,
											isShow: true,
										},
									},
									this.geoCodeFromAddress(value)
								)
							}
							type='text'
							placeholder='Input location'
						/>
						<div className='search-map__display__position-coordinate'>
							<div>
								<span>Latitude :&nbsp;</span>
								<span>{position.lat}</span>
							</div>
							<div>
								<span>Longitude :&nbsp;</span>
								<span>{position.lng}</span>
							</div>
						</div>
					</Fragment>
				)

			case SEARCH_BY_COORDINAT:
				return (
					<Fragment>
						<div className='input--coordinat'>
							<input
								type='number'
								value={position.lat}
								onChange={({ target: { value } }) =>
									this.setState(
										{
											position: {
												...position,
												lat: parseFloat(value),
											},
										},
										this.geoCodeFromCoordinat
									)
								}
								placeholder='Input Latitude'
							/>
							<input
								type='number'
								value={position.lng}
								onChange={({ target: { value } }) =>
									this.setState(
										{
											position: {
												...position,
												lng: parseFloat(value),
											},
										},
										this.geoCodeFromCoordinat
									)
								}
								placeholder='Input Langitude'
							/>
						</div>
						<div className='search-map__display__position-address'>
							<span>Adress :&nbsp;</span>
							<span>{address}</span>
						</div>
					</Fragment>
				)
			default:
				break
		}
	}
}

export default Map
