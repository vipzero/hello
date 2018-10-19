// @flow
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import Home from '../../containers/Home'
import Jiko from '../../containers/Jiko'
import MakeRank from '../MakeRank'

const MenuItem = styled(Link)`
	margin-left: 10px;
`

const App = () => (
	<Router>
		<div>
			<div>
				<MenuItem to="/uji">uji</MenuItem>
				<MenuItem to="/jiko">jiko</MenuItem>
				<MenuItem to="/makerank">makerank</MenuItem>
			</div>
			<Route exact path="/" component={Home} />
			<Route exact path="/jiko" component={Jiko} />
			<Route exact path="/makerank" component={MakeRank} />
		</div>
	</Router>
)
export default App
