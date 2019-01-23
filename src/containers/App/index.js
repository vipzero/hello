// @flow
import { Router, Route, Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import createHistory from 'history/createBrowserHistory'

import Home from '../Home'
import Jiko from '../Jiko'
import MakeRank from '../MakeRank'
import Y500million from '../../components/Y500million'
import EroJS from '../EroJS'
import LaiarGame from '../LaiarGame'

export const history = createHistory()
const MenuItem = styled(Link)`
	margin-left: 10px;
`

const App = () => (
	<Router history={history}>
		<div>
			<div>
				<MenuItem to="/jiko">jiko</MenuItem>
				<MenuItem to="/makerank">makerank</MenuItem>
				<MenuItem to="/5000000000000year">5000000000000year</MenuItem>
				<MenuItem to="/ero.js">ero JS</MenuItem>
				<MenuItem to="/laiargame">Laiar Game</MenuItem>
			</div>
			<Route exact path="/" component={Home} />
			<Route exact path="/jiko" component={Jiko} />
			<Route exact path="/makerank" component={MakeRank} />
			<Route exact path="/5000000000000year" component={Y500million} />
			<Route exact path="/ero.js" component={EroJS} />
			<Route exact path="/laiargame" component={LaiarGame} />
		</div>
	</Router>
)
export default App
