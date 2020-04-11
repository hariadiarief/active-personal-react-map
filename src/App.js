import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Layout from './layout'
import Map from './Page/Map'

function App() {
	return (
		<Router>
			<Switch>
				<Layout>
					<Route path='/' exact component={Map} />
				</Layout>
			</Switch>
		</Router>
	)
}

export default App
