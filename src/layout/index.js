import React, { Component, Fragment } from 'react'

class Layout extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<Fragment>
				<header>ini header</header>
				<main className='layout__main'>{this.props.children}</main>
				<footer>ini footer</footer>
			</Fragment>
		)
	}
}

export default Layout
