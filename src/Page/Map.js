import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import Typed from 'react-typed'

import { ReactComponent as IconGps } from '../images/banner/gps.svg'
import InputAddress from '../components/InputAddress'
import InputCoordinat from '../components/InputCoordinat'

const SEARCH_BY_NAME = 1
const SEARCH_BY_COORDINAT = 2

class Map extends Component {
	constructor(props) {
		super(props)
		this.state = {
			whichInput: SEARCH_BY_NAME,
		}
	}
	render() {
		return (
			<div className='map'>
				<div className='map__banner'>
					<IconGps />
					<Typed strings={['Seach', 'Your Location']} typeSpeed={50} backSpeed={25} loop />
				</div>
				<div className='map__display'>
					<div className='navigation map__display__navigation'>
						<div className='navigation map__display__navigation'>
							<div className='navigations'>
								<a className={`navigation ${whichInput === SEARCH_BY_NAME && 'navigation--active'}`} onClick={() => this.setState({ whichInput: SEARCH_BY_NAME })}>
									Pilih Berdasarkan Nama
								</a>
								<a
									className={`navigation ${whichInput === SEARCH_BY_COORDINAT && 'navigation--active'}`}
									onClick={() => this.setState({ whichInput: SEARCH_BY_COORDINAT })}>
									Pilih Berdasarkan Koordinat
								</a>
							</div>
						</div>
						{/* <div className='navigations'>
							<NavLink className='navigation' activeClassName='navigation--active' exact to={`/`}>
								Pilih Berdasarkan Nama
							</NavLink>
							<NavLink className='navigation' activeClassName='navigation--active' exact to={`/`}>
								Pilih Berdasarkan Koordinat
							</NavLink>
						</div>

						<Switch>
							<Route path={`/merchant/doofit/update/:id/user`} exact component={InputAddress} />
							<Route path='/merchant/doofit/update/:id/busines' exact component={InputCoordinat} />
							<Route path='/merchant/doofit/update/:id/gallery' exact component={Gallery} />
						</Switch> */}
					</div>
				</div>
			</div>
		)
	}
}

export default Map
