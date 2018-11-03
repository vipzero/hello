// @flow
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import Home from '../Home'
import Jiko from '../Jiko'
import MakeRank from '../MakeRank'
import Y500million from '../../components/Y500million'
import EroJS from '../EroJS'

const MenuItem = styled(Link)`
	margin-left: 10px;
`

const App = () => (
	<Router>
		<div>
			<div>
				<MenuItem to="/jiko">jiko</MenuItem>
				<MenuItem to="/makerank">makerank</MenuItem>
				<MenuItem to="/5000000000000year">5000000000000year</MenuItem>
				<MenuItem to="/ero.js">ero JS</MenuItem>
			</div>
			<Route exact path="/" component={Home} />
			<Route exact path="/jiko" component={Jiko} />
			<Route exact path="/makerank" component={MakeRank} />
			<Route exact path="/5000000000000year" component={Y500million} />
			<Route exact path="/ero.js" component={EroJS} />
		</div>
	</Router>
)
export default App
