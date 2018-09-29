// @flow
import React from 'react'
import styled from 'styled-components'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Home from '../../containers/Home'
import Jiko from '../../containers/Jiko'

const MenuItem = styled(Link)`
	margin-left: 10px;
`

const App = () => (
	<Router>
		<div>
			<div>
				<MenuItem to="/uji">uji</MenuItem>
				<MenuItem to="/jiko">jiko</MenuItem>
			</div>
			<Route exact path="/" component={Home} />
			<Route exact path="/jiko" component={Jiko} />
		</div>
	</Router>
)
export default App
